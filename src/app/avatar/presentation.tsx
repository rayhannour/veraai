"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface StatData {
  type: 'donut' | 'bar' | 'pulse';
  value?: number;
  values?: number[];
  label: string;
  color: string;
  max?: number;
  unit?: string;
}

export interface SubPoint {
  label: string;
  value?: string;
  icon?: string;
  color?: string;
}

interface Point {
  id: string;
  label: string;
  detail: string;
  script: string;
  stats?: StatData;
  icon: string;
  accentColor: string;
  subPoints?: SubPoint[];
}

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  introScript: string;
  points: Point[];
  gradient: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

export const PRESENTATION_SLIDES: Slide[] = [
  {
    id: "intro",
    title: "استغلال الأوامر",
    subtitle: "الأداء الوظيفي في التقييم",
    chapter: "المرحلة // 01",
    gradient: "from-[#00e5ff]/10 via-transparent to-[#ff00ff]/5",
    introScript: "أهلاً ومرحباً. يتمحور العرض اليوم حول أسس التقييم الوظيفي الحديث، وكيف نستغل النصوص المنظمة لعمل كافة الميادين داخل المنظومة السجنية والإصلاحية.",
    points: [
      {
        id: "p1",
        label: "الأوامر الإدارية (أمثلة)",
        detail: "توظيف الدليل الأمني والمذكرات التوجيهية في هيكلة تقييم الأعوان.",
        script: "نبدأ باستغلال الأوامر الإدارية، مثل 'دليل الإجراءات الأمنية'، وتوظيفها كموجه أساسي ومعيار حقيقي لضبط أداء العمل اليومي.",
        icon: "pi-book",
        accentColor: "#00e5ff",
        stats: { type: 'donut', value: 95, label: "امتثال", color: "#00e5ff", unit: "%" },
        subPoints: [
          { label: "دليل الإجراءات الأمني", icon: "pi-shield", color: "#00e5ff" },
          { label: "مذكرات نقل المساجين", icon: "pi-sort-alt", color: "#00e5ff" },
          { label: "بروتوكول التدخل السريع", icon: "pi-bolt", color: "#00e5ff" }
        ]
      },
      {
        id: "p2",
        label: "البطاقات الميدانية",
        detail: "تفعيل الرقابة المستمرة (مثال: بطاقة تفقّد الأجنحة أو الإعاشة).",
        script: "ننتقل إلى البطاقات المنظمة للعمل، كبطاقات تفقد الأجنحة السجنية، وتحويلها من شكل دوري تقليدي إلى أداة تفعيل رقابي دقيق.",
        icon: "pi-id-card",
        accentColor: "#ff00ff",
        stats: { type: 'bar', values: [40, 60, 85, 95], label: "انضباط", color: "#ff00ff" },
        subPoints: [
          { label: "بطاقة تفقد الأجنحة", icon: "pi-list", color: "#ff00ff" },
          { label: "بطاقات مراقبة الإعاشة", icon: "pi-eye", color: "#ff00ff" },
          { label: "إجراءات التفتيش اليومي", icon: "pi-check-square", color: "#ff00ff" }
        ]
      },
      {
        id: "p3",
        label: "شمولية ميادين التدخل",
        detail: "النفسي، الاجتماعي، الصحي، الجزائي، التكويني، وصندوق شكاوي المساجين.",
        script: "يتم العمل على تغطية كافة الميادين: الجانب النفسي والاجتماعي والصحي والجزائي والتنشيطي والتكويني والرعائي، وحتى متابعة صندوق شكاوي المساجين.",
        icon: "pi-sitemap",
        accentColor: "#00ffaa",
        stats: { type: 'pulse', value: 99.7, label: "استقرار", color: "#00ffaa", unit: "%" },
        subPoints: [
          { label: "الجانب الصحي و الرعائي", icon: "pi-heart", color: "#00ffaa" },
          { label: "الجانب النفسي و الاجتماعي", icon: "pi-users", color: "#00ffaa" },
          { label: "صندوق شكاوي المساجين", icon: "pi-envelope", color: "#00ffaa" }
        ]
      }
    ]
  },
  {
    id: "tech",
    title: "مخطط Canvas",
    subtitle: "أسئلة كمؤشرات أداء",
    chapter: "المرحلة // 02",
    gradient: "from-[#00ffaa]/10 via-transparent to-[#00e5ff]/5",
    introScript: "المرحلة الحاسمة تتمثل في تفكيك هذه الإجراءات وتحويلها إلى نموذج Canvas متكامل. هذا المخطط يعتمد على قوة صياغة واستغلال السؤال التقييمي.",
    points: [
      {
        id: "p4",
        label: "أسئلة تقييمية ثنائية",
        detail: "أسئلة تعمل كمؤشرات دقيقة، حيث تكون إجابتها محصورة بـ (نعم) أم (لا).",
        script: "نستنبط من النصوص التنظيمية أسئلة مباشرة تعمل كمؤشرات؛ فكل سؤال يستوجب إجابة حصرية إما بـ 'نعم' أم 'لا'.",
        icon: "pi-question-circle",
        accentColor: "#00ffaa",
        stats: { type: 'donut', value: 100, label: "تغطية", color: "#00ffaa", unit: "%" },
        subPoints: [
          { label: "هل تم احتترام التوقيت؟", value: "نعم/لا", icon: "pi-clock", color: "#00ffaa" },
          { label: "هل تم تحيين السجلات؟", value: "نعم/لا", icon: "pi-file", color: "#00ffaa" }
        ]
      },
      {
        id: "p5",
        label: "درجة القياس والمؤوية",
        detail: "ترجمة الإجابات (نعم/لا) آلياً إلى درجة قياس بنسبة مئوية.",
        script: "تلك الإجابات لا تبقى مجرد كلمات، بل يتم تحويلها آلياً إلى درجة قياس رقمية بنسبة مئوية دقيقة لتحديد مدى الامتثال.",
        icon: "pi-chart-line",
        accentColor: "#00e5ff",
        stats: { type: 'pulse', value: 1.2, label: "فرز_ث", color: "#00e5ff", unit: "s" },
        subPoints: [
          { label: "حساب نسبة الإمتثال", value: "% الإيجابيات", icon: "pi-percentage", color: "#00e5ff" },
          { label: "كشف مناطق الضعف", value: "آلي", icon: "pi-search-minus", color: "#00e5ff" }
        ]
      },
      {
        id: "p6",
        label: "لوحة Canvas البصرية",
        detail: "توفير خريطة تقييمية ترصد مكامن القوة والخلل بلمحة واحدة.",
        script: "نجسّد كل هذه المعطيات في مخطط Canvas لتمكين القيادة من رصد التزام الوحدة عبر لوحة قياس وتقييم بصرية آنية وموضوعية.",
        icon: "pi-desktop",
        accentColor: "#ffcc00",
        stats: { type: 'bar', values: [90, 95, 98, 99], label: "موثوقية", color: "#ffcc00" },
        subPoints: [
          { label: "عرض المعطيات الحية", icon: "pi-desktop", color: "#ffcc00" },
          { label: "لوحات قياس مترابطة", icon: "pi-th-large", color: "#ffcc00" }
        ]
      }
    ]
  },
  {
    id: "impact",
    title: "المنهجية العلمية",
    subtitle: "SWOT & Eisenhower",
    chapter: "المرحلة // 03",
    gradient: "from-[#ff3366]/10 via-transparent to-[#ff00ff]/5",
    introScript: "نقرن عملية الرصد والمتابعة بأدوات علمية حديثة عالمياً للتحليل: تحديداً طريقة SWOT ومصفوفة آيزنهاور لتشخيص الحالة واتخاذ الإجراءات.",
    points: [
      {
        id: "p7",
        label: "تحليل SWOT الميداني",
        detail: "تشخيص علمي للوحدات الميدانية عبر أربعة محاور أساسية للمعالجة الوظيفية.",
        script: "بواسطة تحليل SWOT، نستخرج نقاط القوة ككفاءة الموظفين، والضعف كنقص الإمكانيات اللوجستية، مع دراسة تأثير التهديدات كالاكتظاظ واستغلال الفرص.",
        icon: "pi-table",
        accentColor: "#00e5ff",
        stats: { type: 'bar', values: [30, 45, 75, 90], label: "دقة_SWOT", color: "#00e5ff" },
        subPoints: [
          { label: "القوة", value: "موظفون ذوو كفاءة", icon: "pi-angle-double-up", color: "#00ffaa" },
          { label: "الضعف", value: "نقص الإمكانيات", icon: "pi-angle-double-down", color: "#ff3366" },
          { label: "الفرص", value: "الرقمنة المتاحة", icon: "pi-globe", color: "#00e5ff" },
          { label: "التهديدات", value: "ضغط والاكتظاظ", icon: "pi-shield", color: "#f59e0b" }
        ]
      },
      {
        id: "p8",
        label: "مصفوفات آيزنهاور",
        detail: "مثال: الاستجابة للخلل الأمني (هام وعاجل) مقابل صيانة ثانوية.",
        script: "هنا نُطبّق مصفوفة آيزنهاور لترتيب التدخلات. الخلل الأمني يُصنف ضمن العاجل والهام، بينما تُصنف برامج التدريب كمهام هامة غير عاجلة.",
        icon: "pi-th-large",
        accentColor: "#ff00ff",
        stats: { type: 'pulse', value: 85, label: "نجاعة", color: "#ff00ff", unit: "%" },
        subPoints: [
          { label: "عاجل وهام", value: "التدخل الفوري", icon: "pi-bolt", color: "#ff00ff" },
          { label: "هام وغير عاجل", value: "تخطيط استراتيجي", icon: "pi-calendar", color: "#ff00ff" }
        ]
      },
      {
        id: "p9",
        label: "ترشيد وتوجيه القيادة",
        detail: "تحويل التقييم من عقابي روتيني إلى بناء تكتيكي فعّال.",
        script: "تساعد هذه المنهجية المؤسسة على تحويل فلسفة التقييم من أداة جزائية بسيطة إلى منهج بناء يوجه ويرشد عملية اتخاذ القرار الاستراتيجي.",
        icon: "pi-arrow-up-right",
        accentColor: "#ff3366",
        stats: { type: 'donut', value: 420, label: "تَحَسُّن", color: "#ff3366", max: 500, unit: "%" },
        subPoints: [
          { label: "تكتيك العمليات", value: "دعم القرارات", icon: "pi-compass", color: "#ff3366" },
          { label: "الرسكلة", value: "التحسين المتواصل", icon: "pi-sync", color: "#ff3366" }
        ]
      }
    ]
  },
  {
    id: "sesp",
    title: "مسار التقييم الكامل",
    subtitle: "رصد الإخلالات واستخراج التقرير",
    chapter: "المرحلة // 04",
    gradient: "from-[#f59e0b]/10 via-transparent to-[#ff3366]/5",
    introScript: "وأخيرا، لنتتبع الدورة الكاملة لعملية التقييم. ينقسم إنجاز التقييم إلى أربع خطوات تراكمية تضمن الموضوعية والمتابعة الفعلية.",
    points: [
      {
        id: "s1",
        label: "رصد الهفوات الميدانية",
        detail: "التوثيق اليومي للنواقص (مثال: غياب شروط السلامة الصحية).",
        script: "الخطوة الأولى تتمثل في رصد النواقص وتوثيق الإخلالات في بيئة العمل، مثل تسجيل مخالفات تتعلق بشروط السلامة أو ضعف الترتيب الداخلي.",
        icon: "pi-exclamation-triangle",
        accentColor: "#f59e0b",
        stats: { type: 'pulse', value: 28, label: "وقت_الرصد", color: "#f59e0b", unit: "s" },
        subPoints: [
          { label: "نقص النظافة", icon: "pi-exclamation-circle", color: "#f59e0b" },
          { label: "خروقات الجانب الأمني", icon: "pi-exclamation-circle", color: "#f59e0b" }
        ]
      },
      {
        id: "s2",
        label: "صياغة التوصيات الإدارية",
        detail: "التنبيه التوجيهي أو كتابة مذكرات تصحيحية فورية للمصلحة.",
        script: "تليها صياغة توصيات محددة، من خلال توجيه تنبيهات أو صياغة مذكرات تدعو لإصلاح فوري واقتراح حلول عملية لتلافي التكرار.",
        icon: "pi-file-edit",
        accentColor: "#00e5ff",
        stats: { type: 'donut', value: 98, label: "مطابقة", color: "#00e5ff", unit: "%" },
        subPoints: [
          { label: "مذكرات تصحيحية", icon: "pi-pencil", color: "#00e5ff" },
          { label: "توجيهات مباشرة", icon: "pi-megaphone", color: "#00e5ff" }
        ]
      },
      {
        id: "s3",
        label: "قياس الاستجابة والمتابعة",
        detail: "تتبّع تطبيق الإصلاحات الموصى بها في الزيارات اللاحقة للغرف.",
        script: "لا نتوقف عند التوجيه بل نتّبع مدى استجابة الوحدات. يقوم جهاز المتابعة بقياس التنفيذ في الزيارات الموالية لضمان مصداقية الإصلاح.",
        icon: "pi-sync",
        accentColor: "#a855f7",
        stats: { type: 'bar', values: [20, 45, 78, 95], label: "متابعة", color: "#a855f7" },
        subPoints: [
          { label: "الزيارة الموالية", icon: "pi-step-forward", color: "#a855f7" },
          { label: "رصد الاستجابة", icon: "pi-chart-line", color: "#a855f7" }
        ]
      },
      {
        id: "s4",
        label: "تحصيل و إصدار التقييم",
        detail: "استخراج معدّل أداء إجمالي يعكس كفاءة ومردودية الوحدة المعنية.",
        script: "المرحلة النهائية هي التحصيل: إصدار معدل نهائي للأداء العام. هذا التحصيل الإجمالي يوفر مادة حاسمة تقيم نجاعة و مردودية الوحدة ككل.",
        icon: "pi-verified",
        accentColor: "#00ffaa",
        stats: { type: 'donut', value: 100, label: "اكتمال", color: "#00ffaa", unit: "%" },
        subPoints: [
          { label: "رقم المردودية", value: "92%", icon: "pi-star-fill", color: "#00ffaa" },
          { label: "التقييم العام", value: "آلي", icon: "pi-file-check", color: "#00ffaa" }
        ]
      }
    ]
  }
];

const OUTRO_SLIDE = {
  title: "نهاية العرض",
  subtitle: "إرساء التقييم المستدام",
  script: "شكراً لاهتمامكم. أتمنى أن يكون هذا العرض قد أوضح بدقة مسار عمل التقييم وأهدافه الاستراتيجية. أنا في انتظار تعليماتكم التالية.",
  content: "جلسة التقييم قيد الانتظار. شكراً لاهتمامكم."
};

// ─── MINI-CHARTS ─────────────────────────────────────────────────────────────

const DonutChart = ({ value, color, max = 100, unit = "%" }: { value: number; color: string; max?: number; unit?: string }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / (max || 100), 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="transparent" />
        <motion.circle
          cx="50" cy="50" r={radius}
          stroke={color} strokeWidth="8" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: "circOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-black text-white leading-none"
          style={{ textShadow: `0 0 12px ${color}` }}
        >
          {value}{unit}
        </motion.span>
      </div>
    </div>
  );
};

const BarChart = ({ values, color }: { values: number[]; color: string }) => (
  <div className="flex items-end gap-1 h-16">
    {values.map((v, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
        <div className="w-full flex-1 relative overflow-hidden rounded-t-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${v}%` }}
            transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 rounded-t-sm"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}88` }}
          />
        </div>
        <span className="text-[8px] font-mono opacity-30 text-white">{v}</span>
      </div>
    ))}
  </div>
);

const PulseMetric = ({ value, color, unit = "" }: { value: number; color: string; unit?: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-24 h-24 flex items-center justify-center">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full border"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.6, 0] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}22`, boxShadow: `0 0 20px ${color}88`, border: `2px solid ${color}` }}
        animate={{ boxShadow: [`0 0 20px ${color}44`, `0 0 40px ${color}88`, `0 0 20px ${color}44`] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs font-black"
          style={{ color }}
        >
          {value}{unit}
        </motion.span>
      </motion.div>
    </div>
  </div>
);

// ─── PROGRESS TIMELINE ────────────────────────────────────────────────────────

const ProgressTimeline = ({
  slides, currentSlide, currentPoint, isOutro
}: {
  slides: Slide[];
  currentSlide: number;
  currentPoint: number;
  isOutro: boolean;
}) => {
  const total = slides.reduce((a, s) => a + s.points.length, 0) + slides.length;
  let done = 0;
  for (let s = 0; s < currentSlide; s++) done += 1 + slides[s].points.length;
  done += 1 + Math.max(0, currentPoint + 1);
  const pct = isOutro ? 100 : Math.round((done / total) * 100);

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 hidden lg:flex">
      <div className="h-48 w-0.5 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full"
          style={{ boxShadow: '0 0 10px #00e5ff' }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[8px] font-mono text-white/30 rotate-90 tracking-widest">{pct}%</span>
      <div className="flex flex-col items-center gap-3">
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            className="w-2 h-2 rounded-full border"
            animate={{
              borderColor: i < currentSlide ? '#00e5ff' : i === currentSlide ? '#fff' : 'rgba(255,255,255,0.1)',
              backgroundColor: i < currentSlide ? '#00e5ff' : i === currentSlide ? 'rgba(255,255,255,0.3)' : 'transparent',
              scale: i === currentSlide ? 1.5 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
        <motion.div
          className="w-2 h-2 rounded-full border"
          animate={{
            borderColor: isOutro ? '#00e5ff' : 'rgba(255,255,255,0.1)',
            backgroundColor: isOutro ? '#00e5ff' : 'transparent',
          }}
        />
      </div>
    </div>
  );
};

// ─── STAT HUD CARD ────────────────────────────────────────────────────────────

const StatHudCard = ({ point }: { point: Point }) => {
  const { stats } = point;
  if (!stats) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border p-6"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(30px)',
        borderColor: `${stats.color}44`,
        boxShadow: `0 0 60px ${stats.color}22, inset 0 0 30px ${stats.color}08`,
        minWidth: 240,
      }}
    >
      {/* Glow corner */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20" style={{ background: `radial-gradient(circle, ${stats.color}, transparent 70%)` }} />

      <div className="flex items-center justify-between mb-5">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Telemetry_v1</span>
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: stats.color, boxShadow: `0 0 8px ${stats.color}` }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <div className="flex items-center gap-5">
        {stats.type === 'donut' && <DonutChart value={stats.value ?? 0} color={stats.color} max={stats.max} unit={stats.unit} />}
        {stats.type === 'bar' && (
          <div className="w-32">
            <BarChart values={stats.values ?? []} color={stats.color} />
          </div>
        )}
        {stats.type === 'pulse' && <PulseMetric value={stats.value ?? 0} color={stats.color} unit={stats.unit} />}

        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/25 uppercase tracking-widest">Neural_Metric</span>
          <span className="text-lg font-black uppercase tracking-tight" style={{ color: stats.color, textShadow: `0 0 15px ${stats.color}88` }}>
            {stats.label}
          </span>
          <div className="h-px w-10 mt-1" style={{ background: `linear-gradient(to right, ${stats.color}, transparent)` }} />
          <span className="text-[9px] font-mono text-white/30 mt-1">{point.label}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── POINT CARD ───────────────────────────────────────────────────────────────

const PointCard = ({ point, isCurrent, idx }: { point: Point; isCurrent: boolean; idx: number }) => (
  <motion.div
    layout
    key={point.id}
    initial={{ opacity: 0, y: 60, scale: 0.85 }}
    animate={{
      opacity: isCurrent ? 1 : Math.max(0, 0.35 - idx * 0.12),
      y: 0,
      scale: isCurrent ? 1 : 0.94 - idx * 0.03,
      filter: isCurrent ? 'blur(0px)' : `blur(${idx * 3}px)`,
      zIndex: isCurrent ? 10 : 10 - idx,
    }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className={`relative w-full rounded-[2.5rem] overflow-hidden portrait:max-lg:rounded-3xl ${!isCurrent ? 'portrait:max-lg:hidden' : ''}`}
    style={{
      background: isCurrent
        ? `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))`
        : 'transparent',
      border: isCurrent ? `1px solid ${point.accentColor}44` : '1px solid rgba(255,255,255,0.04)',
      boxShadow: isCurrent ? `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${point.accentColor}22` : 'none',
    }}
  >
    {/* Shimmer sweep */}
    {isCurrent && (
      <motion.div
        className="absolute inset-y-0 w-1/2 skew-x-[-15deg] z-0 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${point.accentColor}12, transparent)` }}
        initial={{ x: '-80%' }}
        animate={{ x: '280%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
      />
    )}

    <div className="relative z-10 flex items-center gap-6 p-6 lg:p-8 portrait:max-lg:gap-4 portrait:max-lg:p-4">
      {/* Icon */}
      <motion.div
        className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center portrait:max-lg:w-12 portrait:max-lg:h-12 portrait:max-lg:rounded-xl"

        animate={{
          background: isCurrent ? `${point.accentColor}22` : 'rgba(255,255,255,0.03)',
          borderColor: isCurrent ? `${point.accentColor}88` : 'rgba(255,255,255,0.06)',
          boxShadow: isCurrent ? `0 0 30px ${point.accentColor}44` : 'none',
        }}
        style={{ border: '1px solid' }}
      >
        <i className={`pi ${point.icon} text-xl`} style={{ color: isCurrent ? point.accentColor : 'rgba(255,255,255,0.15)' }} />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {isCurrent && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] font-mono uppercase tracking-[0.5em] block mb-1"
              style={{ color: point.accentColor }}
            >
              ACTIVE_TELEMETRY
            </motion.span>
          )}
        </AnimatePresence>
        <h4
          className="text-xl lg:text-3xl font-black tracking-tight leading-tight portrait:max-lg:text-lg"
          style={{
            color: isCurrent ? '#fff' : 'rgba(255,255,255,0.15)',
            textShadow: isCurrent ? `0 0 30px ${point.accentColor}44` : 'none',
          }}
        >
          {point.label}
        </h4>
        {isCurrent && (
          <motion.div
            initial={{ opacity: 0, y: 15, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
            className="mt-4 rounded-2xl border p-4 relative overflow-hidden group portrait:max-lg:mt-3 portrait:max-lg:p-3"
            style={{
              background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))`,
              borderColor: `${point.accentColor}33`,
              boxShadow: `inset 0 0 20px ${point.accentColor}11`,
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Soft decorative background glow inside the explanation card */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-30 pointer-events-none transition-opacity duration-700 group-hover:opacity-50"
              style={{ background: point.accentColor }}
            />
            
            <div className="flex items-start gap-3 relative z-10 w-full">
              <div 
                className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: point.accentColor, boxShadow: `0 0 8px ${point.accentColor}` }} 
              />
              <div className="flex-1">
                <p className="text-sm font-inter text-white/80 leading-relaxed portrait:max-lg:text-[10px] portrait:max-lg:leading-relaxed">
                  {point.detail}
                </p>

                {/* SubPoints Grid Display - Very Impressive and Staggered */}
                {point.subPoints && point.subPoints.length > 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
                    }}
                    className={`mt-4 grid gap-3 ${point.subPoints.length === 4 ? 'grid-cols-2 portrait:max-lg:grid-cols-1' : 'grid-cols-1'}`}
                  >
                    {point.subPoints.map((sp, spIdx) => (
                      <motion.div
                        key={spIdx}
                        variants={{
                          hidden: { opacity: 0, y: 15, scale: 0.95 },
                          visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15 } }
                        }}
                        className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.07)] transition-colors rounded-xl p-3 border border-white/5 relative overflow-hidden group"
                        style={{ borderBottom: `1px solid ${sp.color || point.accentColor}33` }}
                      >
                        <div className="absolute inset-y-0 left-0 w-0.5" style={{ backgroundColor: sp.color || point.accentColor }} />
                        <div 
                          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border"
                          style={{ 
                            backgroundColor: `${sp.color || point.accentColor}15`,
                            borderColor: `${sp.color || point.accentColor}33` 
                          }}
                        >
                          <i className={`pi ${sp.icon || 'pi-check'} text-xs`} style={{ color: sp.color || point.accentColor }}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-mono font-bold block truncate" style={{ color: '#fff' }}>
                            {sp.label}
                          </span>
                          {sp.value && (
                            <span className="text-[9px] font-mono uppercase tracking-widest block opacity-60" style={{ color: sp.color || point.accentColor }}>
                              {sp.value}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Live badge */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: `${point.accentColor}15`, border: `1px solid ${point.accentColor}44` }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: point.accentColor }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono font-black uppercase tracking-widest" style={{ color: point.accentColor }}>
            LIVE
          </span>
        </motion.div>
      )}
    </div>
  </motion.div>
);

// ─── SLIDE HEADER ─────────────────────────────────────────────────────────────

const SlideHeader = ({ slide, slideIndex }: { slide: Slide; slideIndex: number }) => {
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-10 lg:mb-14"
    >
      <motion.span
        initial={{ opacity: 0, letterSpacing: '0.05em' }}
        animate={{ opacity: 1, letterSpacing: '0.2em' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[10px] font-mono font-black uppercase text-primary block mb-4 portrait:max-lg:mb-2"
      >
        {slide.chapter}
      </motion.span>
      <h2 className="text-2xl lg:text-4xl font-sans font-black tracking-tight leading-none mb-3 py-1 whitespace-nowrap overflow-hidden portrait:max-lg:whitespace-normal portrait:max-lg:text-xl portrait:max-lg:mb-2">
        <motion.span
          className="inline-block text-white"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.title}
        </motion.span>
      </h2>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7 }}
        className="text-sm lg:text-base font-mono uppercase tracking-[0.1em] text-secondary portrait:max-lg:tracking-[0.1em] portrait:max-lg:text-xs"
      >
        {slide.subtitle}
      </motion.h3>
    </motion.div>
  );
};

// ─── BACKGROUND GRID ─────────────────────────────────────────────────────────

const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Perspective grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,229,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    />
    {/* Scanlines */}
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.5) 2px, rgba(0,229,255,0.5) 3px)',
      }}
    />
    {/* Gradient blobs */}
    <motion.div
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
      style={{ background: 'radial-gradient(circle, #00e5ff, transparent 70%)' }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-8"
      style={{ background: 'radial-gradient(circle, #ff00ff, transparent 70%)' }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.12, 0.08] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
);

// ─── OUTRO SCREEN ─────────────────────────────────────────────────────────────

const OutroScreen = () => (
  <motion.div
    key="outro"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex-1 flex items-center justify-center"
  >
    <div className="text-center flex flex-col items-center">
      {/* Expanding rings */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-10">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/30"
            initial={{ width: 56, height: 56, opacity: 0 }}
            animate={{ width: 56 + i * 28, height: 56 + i * 28, opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
          animate={{ boxShadow: ['0 0 20px #00e5ff44', '0 0 60px #00e5ff88', '0 0 20px #00e5ff44'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="pi pi-check text-2xl text-primary" />
        </motion.div>
      </div>

      <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 py-2 whitespace-nowrap">
        {OUTRO_SLIDE.title}
      </h2>
      <p className="text-base font-mono text-white/40 uppercase tracking-[0.5em] mb-8">
        {OUTRO_SLIDE.subtitle}
      </p>
      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Standby // Awaiting Instructions</span>
      </div>
    </div>
  </motion.div>
);

// ─── CONTROL BAR ─────────────────────────────────────────────────────────────

const ControlBar = ({
  isAutoplaying, isOutroActive, onBack, onToggle, onAdvance
}: {
  isAutoplaying: boolean;
  isOutroActive: boolean;
  onBack: () => void;
  onToggle: () => void;
  onAdvance: () => void;
}) => (
  <div className="shrink-0 h-28 flex items-center justify-center relative z-40 portrait:max-lg:h-20 portrait:max-lg:pb-2">
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10 portrait:max-lg:scale-90 portrait:max-lg:px-4 portrait:max-lg:py-2 portrait:max-lg:gap-2"

      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(40px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <motion.button
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/30 hover:text-white transition-colors"
      >
        <i className="pi pi-chevron-left text-sm" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        className="h-14 px-10 rounded-full font-mono font-black uppercase tracking-[0.35em] text-[11px] flex items-center gap-3 border transition-all"
        style={isAutoplaying
          ? { background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.2)' }
          : { background: 'rgba(0,229,255,0.12)', borderColor: 'rgba(0,229,255,0.5)', color: '#00e5ff', boxShadow: '0 0 30px rgba(0,229,255,0.2)' }
        }
      >
        <motion.i
          className={`pi ${isAutoplaying ? 'pi-power-off' : 'pi-play'}`}
          animate={isAutoplaying ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isAutoplaying ? Infinity : 0, repeatDelay: 2 }}
        />
        <span>{isAutoplaying ? 'Kill_Protocol' : (isOutroActive ? 'Restart' : 'Initiate')}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAdvance}
        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/30 hover:text-white transition-colors"
      >
        <i className="pi pi-chevron-right text-sm" />
      </motion.button>
    </motion.div>
  </div>
);

// ─── SPEECH TICKER ──────────────────────────────────────────────────────────

const SpeechTicker = ({ text, active }: { text: string; active: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    setDisplayed('');
    setWordIdx(0);
  }, [text]);

  useEffect(() => {
    if (!active || wordIdx >= words.length) return;
    const t = setTimeout(() => {
      setDisplayed(prev => (prev ? prev + ' ' : '') + words[wordIdx]);
      setWordIdx(i => i + 1);
    }, 95);
    return () => clearTimeout(t);
  }, [active, wordIdx, words]);

  return (
    <AnimatePresence>
      {active && text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden mx-4 mb-2 rounded-2xl border border-white/10 flex items-stretch"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 0 0 1px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Animated scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.04), transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
          />

          {/* Left badge */}
          <div className="shrink-0 flex items-center gap-2.5 px-4 border-r border-white/10"
            style={{ background: 'rgba(0,229,255,0.07)' }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: '0 0 6px #00e5ff' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">VERA LIVE</span>
          </div>

          {/* Scrolling text */}
          <div className="flex-1 overflow-hidden py-2.5 px-5 relative portrait:max-lg:flex portrait:max-lg:items-center portrait:max-lg:h-10 portrait:max-lg:py-0">
            <p className="text-[11px] font-mono text-white/70 leading-relaxed tracking-widest portrait:max-lg:whitespace-nowrap portrait:max-lg:overflow-hidden portrait:max-lg:text-ellipsis portrait:max-lg:w-full portrait:max-lg:leading-none">

              {displayed}
              {wordIdx < words.length && (
                <motion.span
                  className="inline-block w-1 h-3 ml-1 align-middle bg-primary rounded-sm"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
          </div>

          {/* Right chapter tag */}
          <div className="shrink-0 flex items-center px-4 border-l border-white/10">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">Neural_Speech</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── TORCH LINE SEPARATOR ────────────────────────────────────────────────

const TorchLine = ({ color = '#00e5ff', delay = 0 }: { color?: string; delay?: number }) => (
  <div className="relative w-full h-px my-0 overflow-hidden">
    {/* Base track */}
    <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.06)' }} />
    {/* Torch light sweep */}
    <motion.div
      className="absolute top-0 h-full rounded-full"
      style={{
        width: '25%',
        background: `linear-gradient(90deg, transparent, ${color}88, ${color}, ${color}88, transparent)`,
        boxShadow: `0 0 15px 4px ${color}66, 0 0 40px 8px ${color}22`,
        filter: 'blur(1px)',
      }}
      animate={{ x: ['-30%', '500%'] }}
      transition={{
        duration: 2.8,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 1.5,
        delay,
      }}
    />
    {/* Faint permanent glow at center */}
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(ellipse 60% 100% at 50% 50%, ${color}18, transparent)` }}
    />
  </div>
);

// ─── SLIDE WAITING ART (shown before any point is revealed) ────────────────────

const SLIDE_IMAGES: Record<string, string> = {
  intro:  '/slide_commands.png',
  tech:   '/slide_canvas.png',
  impact: '/slide_swot.png',
  sesp:   '/slide_evaluation.png',
};

const SlideWaitingArt = ({ slide }: { slide: Slide }) => {
  const imgSrc = SLIDE_IMAGES[slide.id];
  const accent = slide.points[0]?.accentColor ?? '#00e5ff';

  return (
    <motion.div
      key={`waiting-${slide.id}`}
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -10 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full relative rounded-3xl overflow-hidden flex flex-col items-center justify-center my-4 portrait:max-lg:my-2"
      style={{
        minHeight: '280px',
        background: 'rgba(0,0,0,0.4)',
        border: `1px solid ${accent}22`,
        boxShadow: `0 0 80px ${accent}18, inset 0 0 60px rgba(0,0,0,0.6)`,
      }}
    >
      {/* Background image with strong overlay */}
      {imgSrc && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${imgSrc})`,
            transform: 'scale(1.04)',
          }}
        />
      )}

      {/* Gradient overlay from bottom + sides */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 100%)`,
        }}
      />

      {/* Accent vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)` }}
      />

      {/* Sweeping shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(120deg, transparent 30%, ${accent}12 50%, transparent 70%)` }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Corner accent marks */}
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none opacity-60`}
          style={{
            borderTop: i < 2 ? `2px solid ${accent}` : 'none',
            borderBottom: i >= 2 ? `2px solid ${accent}` : 'none',
            borderLeft: i % 2 === 0 ? `2px solid ${accent}` : 'none',
            borderRight: i % 2 === 1 ? `2px solid ${accent}` : 'none',
          }}
        />
      ))}

      {/* Centre overlay text */}
      <div className="relative z-10 text-center px-8 flex flex-col items-center gap-4">
        {/* Pulsing wait icon */}
        <motion.div
          className="w-14 h-14 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: `${accent}66`, background: `${accent}15`, backdropFilter: 'blur(20px)' }}
          animate={{ boxShadow: [`0 0 15px ${accent}44`, `0 0 50px ${accent}88`, `0 0 15px ${accent}44`] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accent }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        <div>
          <h3 className="text-white font-black text-xl lg:text-2xl tracking-tight leading-tight mb-1 portrait:max-lg:text-lg">
            {slide.title}
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-[0.35em] mt-2" style={{ color: `${accent}cc` }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Waiting label */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: `${accent}15`, border: `1px solid ${accent}33` }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span className="text-[9px] font-mono uppercase tracking-widest" style={{ color: accent }}>
            في انتظار التفعيل
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── PROCESS GRAPH ───────────────────────────────────────────────────────────

const SESP_STEPS = [
  { label: "رصد", icon: "pi-search", color: "#f59e0b" },
  { label: "توصيات", icon: "pi-file-edit", color: "#00e5ff" },
  { label: "متابعة", icon: "pi-sync", color: "#a855f7" },
  { label: "تحصيل", icon: "pi-check-circle", color: "#00ffaa" },
];

const ProcessGraph = ({ revealedCount }: { revealedCount: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full mt-4 mb-2 portrait:max-lg:overflow-x-auto portrait:max-lg:pb-2 fitness-scrollbar portrait:max-lg:mt-2"
  >
    <div className="flex items-center justify-between px-2 relative portrait:max-lg:min-w-[280px]">
      {SESP_STEPS.map((step, i) => {
        const active = i < revealedCount;
        const isCurrent = i === revealedCount - 1;
        return (
          <React.Fragment key={i}>
            {/* Node */}
            <div className="flex flex-col items-center gap-2 z-10">
              <motion.div
                animate={{
                  background: active ? `${step.color}22` : 'rgba(255,255,255,0.03)',
                  borderColor: active ? step.color : 'rgba(255,255,255,0.08)',
                  boxShadow: isCurrent ? `0 0 25px ${step.color}66` : active ? `0 0 10px ${step.color}33` : 'none',
                  scale: isCurrent ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              >
                <i className={`pi ${step.icon} text-base`} style={{ color: active ? step.color : 'rgba(255,255,255,0.15)' }} />
              </motion.div>
              <motion.span
                animate={{ opacity: active ? 1 : 0.2, color: active ? step.color : '#fff' }}
                className="text-[8px] font-mono uppercase tracking-widest whitespace-nowrap"
              >
                {step.label}
              </motion.span>
              {/* Step number badge */}
              <motion.div
                animate={{
                  opacity: active ? 1 : 0.15,
                  backgroundColor: active ? step.color : 'transparent',
                }}
                className="w-4 h-4 rounded-full flex items-center justify-center"
              >
                <span className="text-[7px] font-black" style={{ color: active ? '#000' : 'rgba(255,255,255,0.3)' }}>{i + 1}</span>
              </motion.div>
            </div>

            {/* Connector line between nodes */}
            {i < SESP_STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  animate={{ width: i < revealedCount - 1 ? '100%' : '0%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ background: `linear-gradient(to right, ${step.color}, ${SESP_STEPS[i + 1].color})`, boxShadow: `0 0 8px ${step.color}` }}
                />
                {/* Animated pulse along active connector */}
                {i < revealedCount - 1 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}` }}
                    animate={{ left: ['0%', '100%'], opacity: [0.8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>

    {/* Completion banner */}
    {revealedCount >= SESP_STEPS.length && (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center justify-center gap-3 px-6 py-3 rounded-2xl border border-[#00ffaa]/30 bg-[#00ffaa]/05"
      >
        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00ffaa]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#00ffaa]">Pipeline_Complete // Avg. 1m 52s</span>
      </motion.div>
    )}
  </motion.div>
);

// ─── ORBITAL CANVAS DIAGRAM (SLIDE 2) ─────────────────────────────────────────

const OrbitalCanvasDiagram = ({ slide, currentPointIndex }: { slide: any; currentPointIndex: number }) => {
  const points = slide.points;
  const radius = 130; 

  const activePoint = currentPointIndex > -1 ? points[currentPointIndex] : null;

  return (
    <div className="w-full relative flex flex-col items-center justify-start mt-2">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center portrait:max-lg:w-[240px] portrait:max-lg:h-[240px] z-10">
        
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {points.map((pt: any, i: number) => {
            const angle = (i * (360 / points.length)) - 90;
            const rad = (angle * Math.PI) / 180;
            const currentRadius = 130; 
            
            const startX = 150; 
            const startY = 150;
            
            const endX = startX + Math.cos(rad) * currentRadius;
            const endY = startY + Math.sin(rad) * currentRadius;

            const isRevealed = i <= currentPointIndex;
            const isActive = i === currentPointIndex;

            return (
              <motion.line 
                key={i}
                x1={startX} y1={startY} 
                x2={endX} y2={endY}
                stroke={isRevealed ? pt.accentColor : "rgba(255,255,255,0.1)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4,4"}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isRevealed ? (isActive ? 1 : 0.4) : 0.1,
                }}
                transition={{ duration: 0.8 }}
                className="portrait:max-lg:hidden"
              />
            )
          })}
        </svg>

        {/* Central Core */}
        <motion.div 
          animate={{ 
            boxShadow: [`0 0 20px rgba(0, 255, 170, 0.2)`, `0 0 60px rgba(0, 255, 170, 0.5)`, `0 0 20px rgba(0, 255, 170, 0.2)`] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 w-24 h-24 rounded-full border border-white/20 flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))', backdropFilter: 'blur(30px)' }}
        >
          <div className="absolute inset-0 rounded-full border border-[#00ffaa] opacity-30 animate-ping" style={{ animationDuration: '3s' }} />
          <i className="pi pi-share-alt text-2xl text-[#00ffaa] mb-1" />
          <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">Canvas</span>
        </motion.div>

        {/* Orbiting Cards */}
        {points.map((pt: any, i: number) => {
            const angle = (i * (360 / points.length)) - 90;
            const rad = (angle * Math.PI) / 180;
            
            const isActive = i === currentPointIndex;
            const isRevealed = i <= currentPointIndex;
            
            const tx = Math.cos(rad) * radius;
            const ty = Math.sin(rad) * radius;

            return (
              <motion.div
                key={pt.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isRevealed ? 1 : 0.2, 
                  scale: isRevealed ? (isActive ? 1.15 : 0.85) : 0.6,
                  x: tx,
                  y: ty,
                  rotate: isActive ? [-1, 1, -1] : 0
                }}
                transition={{ duration: 0.6, rotate: { repeat: Infinity, duration: 2, ease: "linear" } }}
                className="absolute w-24 h-24 flex items-center justify-center z-30"
              >
                  <div className="flex flex-col items-center justify-center">
                    <motion.div
                      animate={{
                        borderColor: isActive ? pt.accentColor : 'rgba(255,255,255,0.1)',
                        boxShadow: isActive ? `0 0 30px ${pt.accentColor}66` : 'none',
                        background: isActive ? `${pt.accentColor}22` : 'rgba(255,255,255,0.02)'
                      }}
                      className="w-14 h-14 rounded-2xl border flex items-center justify-center backdrop-blur-md mb-2 relative overflow-hidden"
                    >
                      <i className={`pi ${pt.icon} text-xl relative z-10`} style={{ color: isActive ? '#fff' : pt.accentColor }} />
                    </motion.div>
                    
                    <h4 className="text-[9px] font-bold text-center line-clamp-2 px-1 whitespace-nowrap" style={{ color: isActive ? pt.accentColor : 'rgba(255,255,255,0.4)', textShadow: isActive ? `0 0 10px ${pt.accentColor}` : 'none' }}>
                      {pt.label}
                    </h4>
                  </div>
              </motion.div>
            )
        })}
      </div>

      {/* Detail Card Overlay below graph */}
      <div className="w-full max-w-lg mt-8 z-40">
        <AnimatePresence mode="wait">
          {activePoint && (
            <motion.div
              key={activePoint.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', damping: 20 }}
              className="rounded-2xl border p-4 bg-black/50 backdrop-blur-2xl relative overflow-hidden group shadow-2xl portrait:max-lg:p-3"
              style={{
                borderColor: `${activePoint.accentColor}44`,
                boxShadow: `0 20px 40px rgba(0,0,0,0.5), inset 0 0 30px ${activePoint.accentColor}15`
              }}
            >
              <div 
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-40 pointer-events-none"
                style={{ background: activePoint.accentColor }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: `${activePoint.accentColor}44`, backgroundColor: `${activePoint.accentColor}22` }}>
                    <i className={`pi ${activePoint.icon} text-sm`} style={{ color: activePoint.accentColor }} />
                  </div>
                  <h3 className="text-base font-bold text-white shrink-0">{activePoint.label}</h3>
                  <div className="flex-1 h-px bg-white/10 mx-2 hidden sm:block"></div>
                </div>

                <p className="text-sm text-white/80 leading-relaxed font-inter portrait:max-lg:text-xs">
                  {activePoint.detail}
                </p>

                {activePoint.subPoints && activePoint.subPoints.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-4 portrait:max-lg:grid-cols-1">
                    {activePoint.subPoints.map((sp: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center border shrink-0" style={{ borderColor: `${sp.color || activePoint.accentColor}33`, background: `${sp.color || activePoint.accentColor}11` }}>
                          <i className={`pi ${sp.icon || 'pi-check'} text-[10px]`} style={{ color: sp.color || activePoint.accentColor }} />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-[10px] text-white font-mono font-bold truncate">{sp.label}</span>
                          {sp.value && <span className="text-[8px] uppercase tracking-widest text-white/50">{sp.value}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface PresentationProps {
  onRepeatScript: (script: string) => void;
  onInitiate?: () => void;
}

export interface PresentationHandle {
  handleAvatarFinished: () => void;
}

const Presentation = React.forwardRef<PresentationHandle, PresentationProps>(({ onRepeatScript, onInitiate }, ref) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(-1);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [isOutroActive, setIsOutroActive] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  // Intercept script to capture for ticker
  const handleRepeatScript = (script: string) => {
    setSpeakingText(script);
    onRepeatScript(script);
  };

  React.useImperativeHandle(ref, () => ({
    handleAvatarFinished: () => {
      if (isAutoplaying) handleAdvance();
    }
  }));

  const handleAdvance = () => {
    if (isOutroActive) { setIsAutoplaying(false); return; }
    const slide = PRESENTATION_SLIDES[currentSlideIndex];
    if (currentPointIndex < slide.points.length - 1) {
      setCurrentPointIndex(p => p + 1);
    } else if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex(s => s + 1);
      setCurrentPointIndex(-1);
    } else {
      setIsOutroActive(true);
    }
  };

  const handleBack = () => {
    if (isOutroActive) {
      setIsOutroActive(false);
      setCurrentSlideIndex(PRESENTATION_SLIDES.length - 1);
      setCurrentPointIndex(PRESENTATION_SLIDES[PRESENTATION_SLIDES.length - 1].points.length - 1);
      return;
    }
    if (currentPointIndex > -1) {
      setCurrentPointIndex(p => p - 1);
    } else if (currentSlideIndex > 0) {
      const prev = currentSlideIndex - 1;
      setCurrentSlideIndex(prev);
      setCurrentPointIndex(PRESENTATION_SLIDES[prev].points.length - 1);
    }
  };

  const handleToggle = () => {
    if (isOutroActive) {
      setIsOutroActive(false);
      setCurrentSlideIndex(0);
      setCurrentPointIndex(-1);
    }
    // Trigger avatar session start on first Initiate click
    if (!isAutoplaying) {
      onInitiate?.();
    }
    setIsAutoplaying(v => !v);
  };

  useEffect(() => {
    if (!isAutoplaying) return;
    const script = isOutroActive
      ? OUTRO_SLIDE.script
      : currentPointIndex === -1
        ? PRESENTATION_SLIDES[currentSlideIndex].introScript
        : PRESENTATION_SLIDES[currentSlideIndex].points[currentPointIndex].script;
    const t = setTimeout(() => handleRepeatScript(script), 500);
    return () => clearTimeout(t);
  }, [currentSlideIndex, currentPointIndex, isAutoplaying, isOutroActive, onRepeatScript]);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const activePoint = currentPointIndex > -1 ? currentSlide.points[currentPointIndex] : null;
  const revealedPoints = isOutroActive
    ? []
    : currentSlide.points.filter((_, i) => currentPointIndex >= i);
  const sortedPoints = [...revealedPoints].reverse();

  return (
    <div className="flex-1 w-full h-full flex flex-col relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <BackgroundGrid />

      {/* Slide gradient wash */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${currentSlide.gradient} opacity-60`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Progress timeline (left edge) */}
      <ProgressTimeline
        slides={PRESENTATION_SLIDES}
        currentSlide={currentSlideIndex}
        currentPoint={currentPointIndex}
        isOutro={isOutroActive}
      />

      {/* ─── BOOK CHAPTER NAV BANNER ─── */}
      <div
        className="absolute top-0 left-0 right-0 z-50 flex items-stretch gap-0 overflow-x-auto justify-center portrait:max-lg:justify-start"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 100%)',
          backdropFilter: 'blur(40px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
        }}
      >
        {PRESENTATION_SLIDES.map((sl, si) => {
          const isSlideActive = si === currentSlideIndex && !isOutroActive;
          const isPast = si < currentSlideIndex;
          // Pick a primary accent from first point
          const accent = sl.points[0]?.accentColor ?? '#00e5ff';

          return (
            <motion.div
              key={sl.id}
              animate={{
                borderBottomColor: isSlideActive ? accent : 'transparent',
                background: isSlideActive
                  ? `linear-gradient(180deg, ${accent}12 0%, transparent 100%)`
                  : isPast
                  ? 'rgba(255,255,255,0.02)'
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              className="relative shrink-0 flex flex-col justify-between border-b-2 px-4 py-2.5 min-w-[130px] lg:min-w-[160px] portrait:max-lg:min-w-[110px] portrait:max-lg:px-3 portrait:max-lg:py-2 cursor-default"
              style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Active slide shimmer sweep */}
              {isSlideActive && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}08, transparent)` }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                />
              )}

              {/* Chapter number + chapter label row */}
              <div className="flex items-center gap-2 mb-2">
                {/* Spine / chapter number badge */}
                <motion.div
                  animate={{
                    backgroundColor: isSlideActive ? accent : isPast ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                    color: isSlideActive ? '#000' : isPast ? '#fff' : 'rgba(255,255,255,0.4)',
                    boxShadow: isSlideActive ? `0 0 12px ${accent}88` : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black font-mono"
                >
                  {String(si + 1).padStart(2, '0')}
                </motion.div>

                {/* Chapter label */}
                <motion.span
                  animate={{
                    color: isSlideActive ? '#fff' : isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] font-mono uppercase tracking-widest leading-tight line-clamp-1 portrait:max-lg:text-[8px]"
                >
                  {sl.title}
                </motion.span>
              </div>

              {/* Points list — stacked mini rows */}
              <div className="flex flex-col gap-1">
                {sl.points.map((pt, pi) => {
                  const isDotActive = isSlideActive && pi === currentPointIndex;
                  const isDotPast = isPast || (isSlideActive && pi < currentPointIndex);
                  return (
                    <div key={pt.id} className="flex items-center gap-1.5">
                      <motion.div
                        animate={{
                          backgroundColor: isDotActive
                            ? pt.accentColor
                            : isDotPast
                            ? 'rgba(255,255,255,0.3)'
                            : 'rgba(255,255,255,0.07)',
                          boxShadow: isDotActive ? `0 0 8px ${pt.accentColor}` : 'none',
                          scale: isDotActive ? 1.3 : 1,
                        }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 w-1.5 h-1.5 rounded-full"
                      />
                      <motion.span
                        animate={{
                          color: isDotActive
                            ? pt.accentColor
                            : isDotPast
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(255,255,255,0.15)',
                          fontWeight: isDotActive ? 700 : 400,
                        }}
                        transition={{ duration: 0.25 }}
                        className="text-[8px] font-mono leading-tight truncate portrait:max-lg:text-[7px]"
                      >
                        {pt.label}
                      </motion.span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Outro chapter card */}
        <motion.div
          animate={{
            borderBottomColor: isOutroActive ? '#00ffaa' : 'transparent',
            background: isOutroActive ? 'rgba(0, 255, 170, 0.06)' : 'transparent',
          }}
          transition={{ duration: 0.4 }}
          className="relative shrink-0 flex flex-col justify-center items-center border-b-2 px-4 py-2.5 min-w-[80px]"
        >
          <motion.div
            animate={{ color: isOutroActive ? '#00ffaa' : 'rgba(255,255,255,0.12)' }}
            className="text-[9px] font-mono uppercase tracking-widest"
          >
            ✦
          </motion.div>
          <motion.div
            animate={{ color: isOutroActive ? '#00ffaa' : 'rgba(255,255,255,0.12)' }}
            className="text-[8px] font-mono uppercase tracking-widest mt-1"
          >
            نهاية
          </motion.div>
        </motion.div>
      </div>

      {/* Stat HUD — fixed bottom-right, centered at bottom on mobile */}
      <div className="absolute bottom-52 right-6 lg:right-10 z-50 pointer-events-none portrait:max-lg:bottom-36 portrait:max-lg:left-1/2 portrait:max-lg:-translate-x-1/2 portrait:max-lg:right-auto portrait:max-lg:scale-90">
        <AnimatePresence>
          {activePoint && activePoint.stats && (
            <StatHudCard key={activePoint.id} point={activePoint} />
          )}
        </AnimatePresence>
      </div>

      {/* Main content — Header | TorchLine | Content | TorchLine | Footer */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 lg:px-20 pt-36 lg:pt-40 relative z-20 overflow-hidden portrait:max-lg:overflow-y-auto portrait:max-lg:pt-28 portrait:max-lg:px-4 portrait:max-lg:pb-4 fitness-scrollbar">
        <div className="w-full max-w-3xl flex flex-col items-stretch flex-1">

          {/* ── HEADER ZONE ── */}
          <AnimatePresence mode="wait">
            {!isOutroActive ? (
              <SlideHeader key={currentSlide.id} slide={currentSlide} slideIndex={currentSlideIndex} />
            ) : (
              <OutroScreen key="outro" />
            )}
          </AnimatePresence>

          {/* ── TORCH LINE 1 (under header) ── */}
          {!isOutroActive && (
            <TorchLine
              color={activePoint?.accentColor ?? currentSlide.points[0]?.accentColor ?? '#00e5ff'}
              delay={0}
            />
          )}

          {/* ── CONTENT ZONE ── */}
          {!isOutroActive && (
            <div className={`flex flex-col gap-4 py-4 ${currentSlide.id === 'tech' ? 'items-center justify-center' : ''}`}>
              {/* Process Graph (only for SESP slide) */}
              {currentSlide.id === 'sesp' && (
                <ProcessGraph revealedCount={currentPointIndex + 1} />
              )}

              {/* Points or Orbital — or Waiting Art if no point revealed yet */}
              <div className={`flex flex-col gap-4 ${currentSlide.id === 'tech' ? 'items-center w-full' : ''}`}>
                <AnimatePresence mode="wait">
                  {currentPointIndex === -1 ? (
                    <SlideWaitingArt key={`wait-${currentSlide.id}`} slide={currentSlide} />
                  ) : currentSlide.id === 'tech' ? (
                    <OrbitalCanvasDiagram key="orbital" slide={currentSlide} currentPointIndex={currentPointIndex} />
                  ) : (
                    <motion.div key="points" className="flex flex-col gap-4">
                      <AnimatePresence mode="popLayout">
                        {sortedPoints.map((point, idx) => (
                          <PointCard
                            key={`${currentSlideIndex}-${point.id}`}
                            point={point}
                            isCurrent={idx === 0}
                            idx={idx}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* ── TORCH LINE 2 (above footer) ── */}
          {!isOutroActive && (
            <TorchLine
              color={activePoint?.accentColor ?? currentSlide.points[0]?.accentColor ?? '#00e5ff'}
              delay={1.4}
            />
          )}

          {/* ── FOOTER ZONE ── */}
          {!isOutroActive && (
            <motion.div
              key={`footer-${currentSlide.id}-${currentPointIndex}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-between py-3 portrait:max-lg:py-2"
            >
              {/* Left: slide info */}
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-mono uppercase tracking-[0.4em] text-white/20">
                  {currentSlide.chapter}
                </span>
              </div>

              {/* Center: point progress dots */}
              <div className="flex items-center gap-2">
                {currentSlide.points.map((pt, pi) => (
                  <motion.div
                    key={pt.id}
                    animate={{
                      backgroundColor:
                        pi === currentPointIndex
                          ? pt.accentColor
                          : pi < currentPointIndex
                          ? 'rgba(255,255,255,0.3)'
                          : 'rgba(255,255,255,0.1)',
                      scale: pi === currentPointIndex ? 1.5 : 1,
                      boxShadow: pi === currentPointIndex ? `0 0 8px ${pt.accentColor}` : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-1.5 h-1.5 rounded-full"
                  />
                ))}
              </div>

              {/* Right: point label */}
              <AnimatePresence mode="wait">
                {activePoint && (
                  <motion.span
                    key={activePoint.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[8px] font-mono uppercase tracking-widest"
                    style={{ color: activePoint.accentColor }}
                  >
                    {activePoint.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </div>

      {/* Controls Container */}
      <div className="shrink-0 flex flex-col z-40 relative">
        {/* Speech ticker — above control bar */}
        <SpeechTicker text={speakingText} active={isAutoplaying} />

        {/* Control bar */}
        <ControlBar
          isAutoplaying={isAutoplaying}
          isOutroActive={isOutroActive}
          onBack={handleBack}
          onToggle={handleToggle}
          onAdvance={handleAdvance}
        />
      </div>
    </div>
  );
});

Presentation.displayName = "Presentation";
export default Presentation;
