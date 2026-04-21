"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Fix for default Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom glowing divIcon for prisons with optional laser target
const createCustomIcon = (color: string, isLaserTarget: boolean = false) => {
  return L.divIcon({
    className: `custom-leaflet-icon ${isLaserTarget ? 'laser-target' : ''}`,
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 10px ${color}, 0 0 20px ${color}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const locations = [
  { id: 'bizerte', name: 'بنزرت', pos: [37.2744, 9.8739] as [number, number], activeSteps: [0, 2] },
  { id: 'tunis', name: 'تونس الإقليمي', pos: [36.8065, 10.1815] as [number, number], activeSteps: [0, 1, 2] },
  { id: 'sousse', name: 'سوسة المسعدين', pos: [35.8256, 10.6369] as [number, number], activeSteps: [0, 1, 2] },
  { id: 'monastir', name: 'المنستير', pos: [35.7833, 10.8333] as [number, number], activeSteps: [0, 2] },
  { id: 'kairouan', name: 'القيروان', pos: [35.6781, 10.0963] as [number, number], activeSteps: [0, 2] },
  { id: 'sfax', name: 'صفاقس', pos: [34.7406, 10.7603] as [number, number], activeSteps: [0, 1, 2] },
  { id: 'gafsa', name: 'قفصة', pos: [34.425, 8.7842] as [number, number], activeSteps: [0, 2] },
  { id: 'gabes', name: 'قابس', pos: [33.8815, 10.0982] as [number, number], activeSteps: [0, 2] },
  { id: 'zarzis', name: 'جرجيس', pos: [33.504, 11.1122] as [number, number], activeSteps: [0, 2] },
];

const MapEffect = ({ step }: { step: number }) => {
  const map = useMap();
  useEffect(() => {
    if (step === 2) {
      // Zoom into Tunis (Central Direction) intelligently during the data flow step
      map.flyTo([36.0, 10.1815], 7, { animate: true, duration: 2.5 });
    } else if (step === 1) {
      map.flyTo([35.5, 9.5], 6.5, { animate: true, duration: 2 });
    } else {
      map.flyTo([34.8, 9.5], 6, { animate: true, duration: 2 });
    }
  }, [step, map]);
  return null;
};

export default function DynamicTunisiaMap({ currentPointIndex }: { currentPointIndex: number }) {
  const step = Math.max(0, currentPointIndex);
  const tunisPos = locations.find(l => l.id === 'tunis')!.pos;

  return (
    <div className="w-full relative mt-4 h-[400px] rounded-2xl overflow-hidden border border-white/10" style={{ zIndex: 10 }}>
      {/* Absolute Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] flex flex-col gap-2">
        {step === 1 && (
           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="backdrop-blur-md bg-black/60 border border-[#00e5ff]/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
              <span className="text-[10px] text-[#00e5ff] font-mono tracking-widest">الأقطاب الرئيسية</span>
           </motion.div>
        )}
        {step === 2 && (
           <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="backdrop-blur-md bg-black/60 border border-[#ffcc00]/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <i className="pi pi-sitemap text-[#ffcc00] text-xs" />
              <span className="text-[10px] text-[#ffcc00] font-mono tracking-widest">التدفق اللامركزي للبيانات</span>
           </motion.div>
        )}
      </div>

      <MapContainer 
        center={[34.8, 9.5]} 
        zoom={6} 
        zoomControl={false} 
        attributionControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        className="w-full h-full bg-black z-0 relative"
        style={{ background: '#0a0a0a' }}
      >
        <MapEffect step={step} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map(loc => {
          const isActive = loc.activeSteps.includes(step);
          const opacity = (step === 1 && !isActive) ? 0.3 : 1;
          const color = (step === 1 && isActive) ? '#00e5ff' : step >= 2 ? '#ffcc00' : '#00ffaa';
          
          // Make central point the target during step 2
          const isTarget = (step === 2 && loc.id === 'tunis');
          
          return (
            <Marker key={loc.id} position={loc.pos} icon={createCustomIcon(color, isTarget)} opacity={opacity}>
              <Popup className="custom-popup" closeButton={false} autoPan={false}>
                <div className="font-mono text-xs font-bold text-center text-white p-1" dir="rtl">{loc.name}</div>
              </Popup>
            </Marker>
          );
        })}

        {step >= 2 && locations.map(loc => {
           if (loc.id === 'tunis') return null;
           return <Polyline key={`line-${loc.id}`} positions={[tunisPos, loc.pos]} color="#ffcc00" weight={1.5} opacity={0.6} dashArray="4 4" />;
        })}
      </MapContainer>

      {/* Embedded CSS for custom Leaflet dark popups */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper { background: rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 8px;}
        .leaflet-popup-tip { background: rgba(0,0,0,0.8); border-top: 1px solid rgba(255,255,255,0.2); border-left: 1px solid rgba(255,255,255,0.2); }
        .custom-popup { padding: 0 !important; margin: 0 !important; }
        .leaflet-popup-content { margin: 8px 10px; }
      `}} />
    </div>
  );
}
