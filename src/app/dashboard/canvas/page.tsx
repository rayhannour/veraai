"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createWorker } from "tesseract.js";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tool = "pen" | "highlighter" | "eraser";
type Mode = "draw" | "keyboard";

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  width: number;
  tool: Tool;
}

// ─── Mini Keyboard Layout ─────────────────────────────────────────────────────
const KEYBOARD_ROWS = [
  ["1","2","3","4","5","6","7","8","9","0","⌫"],
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L","↵"],
  ["Z","X","C","V","B","N","M",",",".","!"],
  ["🌐","@","SPACE","_","-","?"],
];

// ─── Palette & Sizes ──────────────────────────────────────────────────────────
const COLORS = ["#00e5ff","#ffffff","#ff3366","#a855f7","#22c55e","#f59e0b","#fb923c","#ec4899"];
const PEN_SIZES = [2, 4, 7, 12, 18];

// ─── Canvas Page ──────────────────────────────────────────────────────────────
export default function CanvasPage() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We'll store the PaddleOCR instance here dynamically to avoid SSR errors
  const ocrEngineRef = useRef<any>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mode, setMode]               = useState<Mode>("draw");
  const [tool, setTool]               = useState<Tool>("pen");
  const [color, setColor]             = useState(COLORS[0]);
  const [penSize, setPenSize]         = useState(4);
  const [isDrawing, setIsDrawing]     = useState(false);
  const [strokes, setStrokes]         = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [typedText, setTypedText]     = useState("");
  const [canvasReady, setCanvasReady] = useState(false);
  const [kbCaps, setKbCaps]           = useState(false);
  const [docTitle, setDocTitle]       = useState("Untitled Document");
  
  // State for persistent uploaded images
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);

  // OCR state
  const [selectedLang, setSelectedLang] = useState("en");
  const [ocrReady, setOcrReady]       = useState(false);
  const [ocrLoading, setOcrLoading]   = useState(false);
  const [ocrText, setOcrText]         = useState("");
  const [ocrItems, setOcrItems]       = useState<any[]>([]);
  const [ocrMetrics, setOcrMetrics]   = useState<any>(null);
  const [ocrConfidence, setOcrConfidence] = useState<number | null>(null);
  const [ocrError, setOcrError]       = useState<string | null>(null);
  const [lastOcrAt, setLastOcrAt]     = useState<Date | null>(null);

  // PDF navigation
  const [pdfPage, setPdfPage]         = useState(1);
  const [pdfTotalPages, setPdfTotalPages] = useState(0);
  const [currentPdfFile, setCurrentPdfFile] = useState<File | null>(null);

  // ─── Boot PaddleOCR Engine ──────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setOcrReady(false);
    (async () => {
      try {
        // Dynamically import to ensure browser-only (client-side) execution
        const { PaddleOCR } = await import("@paddleocr/paddleocr-js");
        
        const ocr = await PaddleOCR.create({
          // Use the Universal Multilingual engine which supports Arabic & 80+ other languages natively
          ocrVersion: "PP-OCRv5",
          runtime: {
            backend: "auto",
            wasmPaths: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
            numThreads: 2
          }
        });

        if (!cancelled) {
          ocrEngineRef.current = ocr;
          setOcrReady(true);
        } else {
          ocr.dispose();
        }
      } catch (e: any) {
        if (!cancelled) setOcrError(e.message || `PaddleOCR [${selectedLang}] failed to load`);
      }
    })();
    return () => {
      cancelled = true;
      if (ocrEngineRef.current) {
        ocrEngineRef.current.dispose().catch(()=>{}).finally(() => { ocrEngineRef.current = null; });
      }
    };
  }, [selectedLang]);

  // ─── Init Canvas ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width  = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width  = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    setCanvasReady(true);
  }, []);

  // ─── Redraw ────────────────────────────────────────────────────────────────
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const canvasW = canvas.width / dpr;
    const canvasH = canvas.height / dpr;
    ctx.clearRect(0, 0, canvasW, canvasH);

    // ─── Draw Persistent Uploaded Image ───
    if (uploadedImage) {
      const scale = Math.min(canvasW / uploadedImage.width, canvasH / uploadedImage.height, 1);
      const nw = uploadedImage.width * scale;
      const nh = uploadedImage.height * scale;
      const dx = (canvasW - nw) / 2;
      const dy = (canvasH - nh) / 2;
      ctx.drawImage(uploadedImage, dx, dy, nw, nh);
    }

    const all = currentStroke ? [...strokes, currentStroke] : strokes;
    all.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        const mid = {
          x: (stroke.points[i - 1].x + stroke.points[i].x) / 2,
          y: (stroke.points[i - 1].y + stroke.points[i].y) / 2,
        };
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, mid.x, mid.y);
      }
      ctx.lineWidth = stroke.width;
      ctx.strokeStyle = stroke.tool === "highlighter"
        ? stroke.color + "55"
        : stroke.color;
      ctx.globalCompositeOperation = stroke.tool === "eraser" ? "destination-out" : "source-over";
      ctx.lineCap  = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    });
    ctx.globalCompositeOperation = "source-over";

    // Draw OCR Bounding Polygons
    if (ocrItems.length > 0) {
      ctx.save();
      const dpr = window.devicePixelRatio || 1;
      // Note: ocrItems coordinates are relative to the offscreen canvas (which matches canvas resolution)
      // but ctx scale(dpr, dpr) handles coordinates in CSS pixels.
      // So we need to divide by dpr if items are in raw pixels.
      
      ocrItems.forEach(item => {
        if (!item.poly || item.poly.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(item.poly[0].x / dpr, item.poly[0].y / dpr);
        for (let i = 1; i < item.poly.length; i++) {
          ctx.lineTo(item.poly[i].x / dpr, item.poly[i].y / dpr);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(0, 229, 255, 0.45)";
        ctx.fillStyle = "rgba(0, 229, 255, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.fill();
        ctx.stroke();
      });
      ctx.restore();
    }
  }, [strokes, currentStroke, ocrItems]);

  useEffect(() => { if (canvasReady) redraw(); }, [strokes, currentStroke, canvasReady, redraw]);

  // ─── Run OCR (debounced) ───────────────────────────────────────────────────
  const runOcr = useCallback(async () => {
    const canvas = canvasRef.current;
    const ocrEngine = ocrEngineRef.current;
    if (!canvas || (!ocrEngine && selectedLang === "en") || !ocrReady) return;
    
    setOcrLoading(true);
    setOcrError(null);
    const start = Date.now();

    try {
      if (selectedLang === "ar") {
        // ─── Tesseract Arabic Engine (High Precision for Script) ─────────────
        const worker = await createWorker("ara");
        const { data: { text, confidence, blocks } } = await worker.recognize(canvas);
        
        setOcrText(text.trim());
        setOcrConfidence(confidence);
        setOcrItems(blocks?.map(b => ({ text: b.text, score: confidence / 100, poly: [] })) || []);
        setOcrMetrics({
          engine: "Tesseract Neural (ara)",
          totalMs: Date.now() - start,
          model: "arabic_PP-OCRv3_rec (Hybrid-Matched)"
        });
        await worker.terminate();
      } else {
        // ─── PaddleOCR V5 Engine (High Speed for English/Drawing) ────────────
        // Export canvas to a white-background Canvas element for PaddleOCR
        const offscreen = document.createElement("canvas");
        offscreen.width  = canvas.width;
        offscreen.height = canvas.height;
        const offCtx = offscreen.getContext("2d")!;
        offCtx.fillStyle = "#ffffff";
        offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
        offCtx.drawImage(canvas, 0, 0);

        const result = await ocrEngine.predict(offscreen, {
          textDetThresh: 0.2,
          textDetBoxThresh: 0.3,
          textRecScoreThresh: 0.5
        });
        
        setOcrItems(result.items || []);
        setOcrMetrics({ ...result.metrics, engine: "PaddleOCR V5" });

        const textArr = result.items ? result.items.map((i: any) => i.text).filter(Boolean) : [];
        const scores = result.items ? result.items.map((i: any) => i.score || 0).filter((s:any) => s > 0) : [];
        
        if (textArr.length === 0) {
            setOcrError("No text detected. Try writing fuller words!");
            setOcrText("");
            setOcrConfidence(null);
        } else {
            setOcrText(textArr.join(" "));
            const avgScore = scores.reduce((a:number, b:number) => a + b, 0) / (scores.length || 1);
            setOcrConfidence(Math.round(avgScore * 100));
            setOcrError(null);
        }
      }
      
      setLastOcrAt(new Date());
    } catch (e: any) {
      console.error("OCR Exception:", e);
      setOcrError(e.message || "Recognition failed.");
    } finally {
      setOcrLoading(false);
    }
  }, [ocrReady, selectedLang]);

  // ─── Trigger OCR after stroke ends ────────────────────────────────────────
  const scheduleOcr = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => { runOcr(); }, 700);
  }, [runOcr]);

  // ─── Pointer helpers ───────────────────────────────────────────────────────
  const getXY = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (mode !== "draw") return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getXY(e);
    setCurrentStroke({
      points: [pt],
      color,
      width: tool === "highlighter" ? penSize * 4 : tool === "eraser" ? penSize * 5 : penSize,
      tool,
    });
    setIsDrawing(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    setCurrentStroke(prev => prev ? { ...prev, points: [...prev.points, getXY(e)] } : prev);
  };

  const onPointerUp = () => {
    if (!isDrawing || !currentStroke) return;
    setStrokes(prev => {
      const next = [...prev, currentStroke!];
      return next;
    });
    setCurrentStroke(null);
    setIsDrawing(false);
    scheduleOcr();
  };

  const handleUndo = () => {
    setStrokes(prev => { const next = prev.slice(0, -1); return next; });
    scheduleOcr();
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke(null);
    setUploadedImage(null);
    setOcrText("");
    setOcrItems([]);
    setOcrMetrics(null);
    setOcrConfidence(null);
  };

  // ─── Keyboard ─────────────────────────────────────────────────────────────
  const handleKey = (key: string) => {
    if (key === "⌫")      setTypedText(p => p.slice(0, -1));
    else if (key === "↵") setTypedText(p => p + "\n");
    else if (key === "SPACE") setTypedText(p => p + " ");
    else if (key === "🌐") setKbCaps(p => !p);
    else setTypedText(p => p + (kbCaps ? key.toUpperCase() : key.toLowerCase()));
  };

  // ─── Export ────────────────────────────────────────────────────────────────
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${docTitle.replace(/\s+/g,"_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // ─── Document Upload ───────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePdfPage = async (file: File, pageNum: number) => {
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      setPdfTotalPages(pdf.numPages);
      
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.5 });
      
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = viewport.width;
      tempCanvas.height = viewport.height;
      const tCtx = tempCanvas.getContext("2d")!;
      
      await page.render({ canvasContext: tCtx, viewport }).promise;
      
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        setStrokes([{ points: [{ x: 0, y: 0 }, { x: 1, y: 1 }], color: "transparent", width: 0, tool: "pen" }]);
        scheduleOcr();
      };
      img.src = tempCanvas.toDataURL();
    } catch (e) {
      console.error("PDF Render Error:", e);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      setCurrentPdfFile(file);
      setPdfPage(1);
      handlePdfPage(file, 1);
    } else {
      setCurrentPdfFile(null);
      setPdfTotalPages(0);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setUploadedImage(img);
          setStrokes([{ points: [{ x: 0, y: 0 }, { x: 1, y: 1 }], color: "transparent", width: 0, tool: "pen" }]);
          scheduleOcr();
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const navigatePdf = (delta: number) => {
    if (!currentPdfFile) return;
    const next = Math.max(1, Math.min(pdfTotalPages, pdfPage + delta));
    if (next !== pdfPage) {
      setPdfPage(next);
      handlePdfPage(currentPdfFile, next);
    }
  };

  const handleSaveTxt = () => {
    if (!ocrText) return;
    const element = document.createElement("a");
    const file = new Blob([ocrText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${docTitle.replace(/\s+/g,"_")}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // ─── Confidence color ──────────────────────────────────────────────────────
  const confColor = ocrConfidence !== null
    ? ocrConfidence > 70 ? "#22c55e" : ocrConfidence > 40 ? "#f59e0b" : "#ff3366"
    : "#6b7280";

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4 h-full min-h-[calc(100vh-200px)]">

      {/* ── Top Toolbar ────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={docTitle}
          onChange={e => setDocTitle(e.target.value)}
          className="bg-transparent border-b border-outline-variant/30 focus:border-primary outline-none text-white font-manrope font-bold text-lg px-1 pb-0.5 min-w-[180px] transition-colors"
          spellCheck={false}
        />
        <div className="flex-1" />

        {/* OCR status pill */}
        {mode === "draw" && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all ${
            ocrLoading ? "border-primary/40 bg-primary/10 text-primary" :
            ocrReady  ? "border-green-500/30 bg-green-500/10 text-green-400" :
                        "border-outline-variant/20 text-outline-variant"
          }`}>
            <motion.div
              animate={{ rotate: ocrLoading ? 360 : 0 }}
              transition={{ duration: 1, repeat: ocrLoading ? Infinity : 0, ease: "linear" }}
            >
              <i className={`pi ${ocrLoading ? "pi-spinner" : ocrReady ? "pi-check-circle" : "pi-clock"} text-xs`} />
            </motion.div>
            {ocrLoading ? "Recognizing…" : ocrReady ? "OCR Ready" : "Loading OCR…"}
          </div>
        )}

        {/* Mode tabs */}
        <div className="flex items-center bg-surface-container-high/50 rounded-xl p-1 border border-outline-variant/20 gap-1">
          <select 
            value={selectedLang} 
            onChange={e => setSelectedLang(e.target.value)}
            className="bg-transparent border-none outline-none text-[10px] font-mono text-primary px-2 py-1 appearance-none cursor-pointer uppercase tracking-wider"
          >
            <option value="en" className="bg-surface-container-high">English (Paddle)</option>
            <option value="ar" className="bg-surface-container-high">Arabic (Hybrid)</option>
          </select>
          <div className="w-px h-4 bg-outline-variant/20 mx-1" />
          {(["draw","keyboard"] as Mode[]).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-widest transition-all flex items-center gap-2 ${
                mode === m
                  ? "bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                  : "text-outline-variant hover:text-white"
              }`}>
              <i className={`pi ${m === "draw" ? "pi-pen-to-square" : "pi-tablet"} text-xs`} />
              {m === "draw" ? "Handwrite" : "Keyboard"}
            </button>
          ))}
        </div>

        <button onClick={handleUndo} title="Undo"
          className="w-9 h-9 rounded-lg bg-surface-container-high/50 border border-outline-variant/20 flex items-center justify-center text-outline-variant hover:text-primary hover:border-primary/40 transition-all">
          <i className="pi pi-undo text-sm" />
        </button>
        <button onClick={handleClear} title="Clear"
          className="w-9 h-9 rounded-lg bg-surface-container-high/50 border border-outline-variant/20 flex items-center justify-center text-outline-variant hover:text-error hover:border-error/40 transition-all">
          <i className="pi pi-trash text-sm" />
        </button>
        <div className="flex items-center gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept="image/*, application/pdf" 
          />
          <button onClick={handleUploadClick}
            className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono uppercase tracking-widest hover:bg-secondary/20 transition-all flex items-center gap-2">
            <i className="pi pi-file-pdf text-xs" /> Scan PDF / Image
          </button>
          <button onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center gap-2">
            <i className="pi pi-download text-xs" /> Export
          </button>
        </div>
      </div>

      {/* ── Draw Tools ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mode === "draw" && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            className="flex flex-wrap items-center gap-3 p-3 bg-surface-container-low/60 backdrop-blur-xl rounded-2xl border border-outline-variant/15">
            {/* Tool */}
            <div className="flex gap-1">
              {([
                { t:"pen" as Tool, icon:"pi-pencil", label:"Pen" },
                { t:"highlighter" as Tool, icon:"pi-sun", label:"Highlight" },
                { t:"eraser" as Tool, icon:"pi-circle", label:"Eraser" },
              ]).map(({ t, icon, label }) => (
                <button key={t} onClick={() => setTool(t)} title={label}
                  className={`px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all border ${
                    tool === t
                      ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_8px_rgba(0,229,255,0.2)]"
                      : "text-outline-variant border-outline-variant/20 hover:text-white hover:border-outline-variant/40"
                  }`}>
                  <i className={`pi ${icon} text-xs`} />
                  <span className="hidden sm:inline font-mono tracking-wider uppercase">{label}</span>
                </button>
              ))}
            </div>
            <div className="w-px h-6 bg-outline-variant/20" />

            {/* Colors */}
            <div className="flex items-center gap-1.5">
              {COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${color===c ? "border-white scale-125 shadow-lg" : "border-transparent"}`} />
              ))}
            </div>
            <div className="w-px h-6 bg-outline-variant/20" />

            {/* Sizes */}
            <div className="flex items-center gap-1">
              {PEN_SIZES.map((s) => (
                <button key={s} onClick={() => setPenSize(s)}
                  className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all ${penSize===s ? "border-primary/40 bg-primary/10" : "border-outline-variant/20 hover:border-outline-variant/40"}`}>
                  <div className="rounded-full" style={{ width:Math.max(3,s*0.85), height:Math.max(3,s*0.85), backgroundColor: penSize===s ? color : "#6b7280" }} />
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <span className="text-[10px] font-mono text-outline-variant tracking-widest">{strokes.length} strokes</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Area ──────────────────────────────────────────────────────── */}
      <div className="flex gap-4 flex-1">

        {/* ── Paper ──────────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col gap-0" style={{ minHeight: "480px" }}>
          <div className="relative flex-1 rounded-t-2xl overflow-hidden border border-outline-variant/15 border-b-0 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#0b0b10]">

            {/* Lines */}
            {mode === "draw" && (
              <div className="absolute inset-0 pointer-events-none z-0"
                style={{ backgroundImage:`repeating-linear-gradient(transparent,transparent 39px,rgba(0,229,255,0.04) 39px,rgba(0,229,255,0.04) 40px)`, backgroundPositionY:"20px" }}>
                <div className="absolute left-14 top-0 bottom-0 w-px bg-primary/10" />
              </div>
            )}

            {/* Canvas */}
            <div ref={containerRef} className="absolute inset-0 z-10">
              <canvas ref={canvasRef}
                onPointerDown={onPointerDown} onPointerMove={onPointerMove}
                onPointerUp={onPointerUp} onPointerLeave={onPointerUp}
                className="w-full h-full touch-none"
                style={{
                  cursor: mode!=="draw" ? "default" : tool==="eraser" ? "cell" : "crosshair",
                  display: mode==="draw" ? "block" : "none",
                }} />
            </div>

            {/* Keyboard text view */}
            {mode === "keyboard" && (
              <div className="absolute inset-0 z-10 p-8">
                <pre className="text-white font-manrope text-xl leading-[40px] whitespace-pre-wrap break-words">
                  {typedText}
                  <motion.span animate={{ opacity:[1,0] }} transition={{ duration:0.8, repeat:Infinity }}
                    className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle" />
                </pre>
              </div>
            )}

            {/* Empty hints */}
            {mode==="draw" && strokes.length===0 && !isDrawing && (
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center gap-2 opacity-15">
                  <i className="pi pi-pen-to-square text-5xl text-primary" />
                  <p className="text-xs font-mono text-outline-variant tracking-widest uppercase">Write anything — it will be recognized</p>
                </div>
              </div>
            )}

            {/* Corner badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[8px] font-mono text-primary tracking-widest uppercase">Neural Canvas</span>
            </div>
          </div>

          {/* ── OCR Output Panel ─────────────────────────────────────────── */}
          {mode === "draw" && (
            <div className="rounded-b-2xl border border-outline-variant/15 border-t border-t-primary/10 bg-[#0d0d15]/90 backdrop-blur-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <i className="pi pi-eye text-xs text-primary" />
                  <span className="text-[10px] font-mono text-primary tracking-[0.2em] uppercase">Neural Analysis</span>
                </div>
                 <div className="flex items-center gap-4">
                  {ocrMetrics && (
                    <div className="hidden lg:flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] font-mono text-outline-variant/60 uppercase">Inference Engine</span>
                        <span className="text-[9px] font-mono text-primary/80">{ocrMetrics.engine}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] font-mono text-outline-variant/60 uppercase">Latency</span>
                        <span className="text-[9px] font-mono text-white/80">{Math.round(ocrMetrics.totalMs || ocrMetrics.recInferMs)}ms</span>
                      </div>
                      {selectedLang === "ar" && (
                         <div className="flex flex-col items-end border-l border-outline-variant/20 pl-3">
                           <span className="text-[7px] font-mono text-primary/60 uppercase">Target Specs</span>
                           <span className="text-[9px] font-mono text-white/60">PP-OCRv3 Arabic</span>
                         </div>
                      )}
                    </div>
                  )}
                  {ocrConfidence !== null && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-outline-variant uppercase tracking-widest">Confidence</span>
                      <span className="text-[11px] font-mono font-bold" style={{ color: confColor }}>{ocrConfidence}%</span>
                    </div>
                  )}
                  {lastOcrAt && (
                    <span className="text-[9px] font-mono text-outline-variant/50">
                      {lastOcrAt.toLocaleTimeString()}
                    </span>
                  )}
                  {ocrText && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigator.clipboard?.writeText(ocrText)}
                        className="text-[9px] font-mono text-primary/60 hover:text-primary px-2 py-0.5 rounded border border-primary/10 hover:border-primary/30 transition-all flex items-center gap-1">
                        <i className="pi pi-copy text-[8px]" /> Copy
                      </button>
                      <button onClick={handleSaveTxt}
                        className="text-[9px] font-mono text-secondary/60 hover:text-secondary px-2 py-0.5 rounded border border-secondary/10 hover:border-secondary/30 transition-all flex items-center gap-1">
                        <i className="pi pi-file-export text-[8px]" /> Save .TXT
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Navigation Overlay */}
              {pdfTotalPages > 0 && (
                <div className="absolute top-2 right-4 flex items-center gap-2 z-50 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20">
                   <button onClick={() => navigatePdf(-1)} disabled={pdfPage === 1}
                     className="pi pi-chevron-left text-[10px] text-primary hover:text-white disabled:opacity-30" />
                   <span className="text-[10px] font-mono text-white/90 px-2 border-x border-white/10">
                     Page {pdfPage} / {pdfTotalPages}
                   </span>
                   <button onClick={() => navigatePdf(1)} disabled={pdfPage === pdfTotalPages}
                     className="pi pi-chevron-right text-[10px] text-primary hover:text-white disabled:opacity-30" />
                </div>
              )}

              <div className="px-4 py-3 min-h-[60px] max-h-[120px] overflow-y-auto relative">
                <AnimatePresence mode="wait">
                  {ocrLoading ? (
                    <motion.div key="loading" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      className="flex items-center gap-3">
                      <div className="flex gap-1">
                        {[0,1,2,3].map(i => (
                          <motion.div key={i}
                            animate={{ scaleY:[1,2,1], opacity:[0.4,1,0.4] }}
                            transition={{ duration:0.8, repeat:Infinity, delay:i*0.15 }}
                            className="w-0.5 h-3 bg-primary rounded-full origin-bottom"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-primary/60 animate-pulse">Analyzing handwriting…</span>
                    </motion.div>
                  ) : ocrError ? (
                    <motion.p key="error" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      className="text-xs font-mono text-error/70 flex items-center gap-2">
                      <i className="pi pi-exclamation-triangle text-xs" /> {ocrError}
                    </motion.p>
                  ) : ocrText ? (
                    <motion.p key="text" initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                      dir="auto"
                      className="text-sm font-inter text-white leading-relaxed whitespace-pre-wrap text-left rtl:text-right">
                      {ocrText}
                    </motion.p>
                  ) : (
                    <motion.p key="idle" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      className="text-xs font-mono text-outline-variant/40 italic">
                      Recognized text will appear here after you write…
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {/* ── Mini Keyboard (keyboard mode) ──────────────────────────────── */}
        <AnimatePresence>
          {mode === "keyboard" && (
            <motion.div
              initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:30 }}
              transition={{ type:"spring", damping:20 }}
              className="w-[280px] flex-shrink-0 flex flex-col gap-3 p-4 bg-surface-container-low/80 backdrop-blur-2xl rounded-2xl border border-outline-variant/20 shadow-[0_0_40px_rgba(0,229,255,0.05)] self-start">

              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono text-primary tracking-[0.25em] uppercase">Neural Keyboard</span>
                <button onClick={() => setKbCaps(p => !p)}
                  className={`text-[8px] font-mono px-2 py-0.5 rounded-md border transition-all ${kbCaps ? "bg-primary/20 text-primary border-primary/40" : "text-outline-variant border-outline-variant/20"}`}>
                  CAPS {kbCaps ? "ON" : "OFF"}
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                {KEYBOARD_ROWS.map((row, ri) => (
                  <div key={ri} className="flex gap-1 justify-center flex-wrap">
                    {row.map((key) => {
                      const isWide = key === "SPACE";
                      const isSpecial = ["⌫","↵","🌐"].includes(key);
                      return (
                        <motion.button key={key} whileTap={{ scale:0.88 }} onClick={() => handleKey(key)}
                          className={`h-9 rounded-xl text-xs font-mono transition-all border select-none
                            ${isWide ? "flex-1 px-4" : "w-9"}
                            ${isSpecial
                              ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                              : "bg-surface-container-high/60 border-outline-variant/15 text-on-surface-variant hover:bg-surface-container-highest/60 hover:text-white hover:border-outline-variant/40"
                            }
                            shadow-[0_2px_0_rgba(0,0,0,0.4)] active:shadow-none active:translate-y-0.5`}>
                          {key === "SPACE" ? "SPACE" : kbCaps && !isSpecial ? key.toUpperCase() : key}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-1 pt-3 border-t border-outline-variant/10">
                <button onClick={() => setTypedText("")}
                  className="flex-1 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest text-error/70 border border-error/10 hover:bg-error/10 hover:text-error transition-all">
                  Clear
                </button>
                <button onClick={() => navigator.clipboard?.writeText(typedText)}
                  className="flex-1 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest text-primary/70 border border-primary/10 hover:bg-primary/10 hover:text-primary transition-all">
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
