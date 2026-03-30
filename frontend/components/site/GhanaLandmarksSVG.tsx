'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function GhanaLandmarksSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px 0px' });

  useEffect(() => {
    if (!isInView || !svgRef.current) return;
    const elements = svgRef.current.querySelectorAll<SVGGeometryElement>('path,line,polyline,polygon,circle,rect');
    elements.forEach((el, i) => {
      let length = 1000;
      try {
        if (typeof (el as SVGGeometryElement).getTotalLength === 'function') {
          length = (el as SVGGeometryElement).getTotalLength();
        } else if (el.tagName === 'rect') {
          const w = parseFloat(el.getAttribute('width') || '0');
          const h = parseFloat(el.getAttribute('height') || '0');
          length = 2 * (w + h);
        }
      } catch { length = 600; }
      (el as SVGElement).style.strokeDasharray = `${length}`;
      (el as SVGElement).style.strokeDashoffset = `${length}`;
      (el as SVGElement).style.transition = `stroke-dashoffset ${1.8 + i * 0.06}s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          (el as SVGElement).style.strokeDashoffset = '0';
        });
      });
    });
  }, [isInView]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden opacity-30 pointer-events-none select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 1400 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        fill="none"
        stroke="#CC0000"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── Ground horizon line ── */}
        <line x1="0" y1="192" x2="1400" y2="192" />

        {/* ══════════════════════════════════════
            CAPE COAST / ELMINA CASTLE (far left)
            ══════════════════════════════════════ */}
        {/* Main fort base */}
        <rect x="25" y="140" width="215" height="52" />
        {/* Battlements on main wall */}
        <rect x="25" y="128" width="16" height="12" />
        <rect x="49" y="128" width="16" height="12" />
        <rect x="73" y="128" width="16" height="12" />
        <rect x="97" y="128" width="16" height="12" />
        <rect x="121" y="128" width="16" height="12" />
        <rect x="145" y="128" width="16" height="12" />
        <rect x="169" y="128" width="16" height="12" />
        <rect x="193" y="128" width="16" height="12" />
        <rect x="217" y="128" width="16" height="12" />
        {/* Central tower */}
        <rect x="95" y="80" width="60" height="60" />
        {/* Tower battlements */}
        <rect x="95" y="68" width="12" height="12" />
        <rect x="115" y="68" width="12" height="12" />
        <rect x="135" y="68" width="12" height="12" />
        <rect x="155" y="68" width="8" height="12" />
        {/* Tower window */}
        <rect x="115" y="95" width="20" height="25" />
        {/* Castle entrance arch */}
        <path d="M 108,192 L 108,162 Q 125,148 142,162 L 142,192" />
        {/* Flagpole on tower */}
        <line x1="125" y1="68" x2="125" y2="38" />
        <path d="M 125,38 L 155,46 L 125,54 Z" />
        {/* Left bastion */}
        <rect x="25" y="110" width="30" height="30" />
        {/* Right bastion */}
        <rect x="205" y="110" width="30" height="30" />

        {/* ══════════════════════════════════════
            INDEPENDENCE ARCH (Black Star Gate)
            ══════════════════════════════════════ */}
        {/* Left pillar */}
        <rect x="330" y="108" width="42" height="84" />
        {/* Right pillar */}
        <rect x="468" y="108" width="42" height="84" />
        {/* Arch curve (cubic bezier for perfect arch) */}
        <path d="M 372,108 C 372,62 468,62 468,108" />
        {/* Pillar decorative bands */}
        <line x1="330" y1="130" x2="372" y2="130" />
        <line x1="330" y1="150" x2="372" y2="150" />
        <line x1="330" y1="170" x2="372" y2="170" />
        <line x1="468" y1="130" x2="510" y2="130" />
        <line x1="468" y1="150" x2="510" y2="150" />
        <line x1="468" y1="170" x2="510" y2="170" />
        {/* Keystone at arch top */}
        <line x1="421" y1="64" x2="421" y2="42" />
        {/* Black Star (5-pointed star) */}
        <polygon points="421,32 423.4,39.3 431.1,39.3 424.8,43.8 427.2,51.1 421,46.6 414.8,51.1 417.2,43.8 410.9,39.3 418.6,39.3" />

        {/* ══════════════════════════════════════
            NATIONAL THEATRE OF GHANA
            ══════════════════════════════════════ */}
        {/* Base building */}
        <rect x="570" y="155" width="270" height="37" />
        {/* Three signature peaked roofs */}
        <polyline points="580,155 615,92 650,155" />
        <polyline points="645,155 685,72 725,155" />
        <polyline points="720,155 760,92 800,155" />
        {/* Base detail lines */}
        <line x1="570" y1="168" x2="840" y2="168" />
        <line x1="570" y1="178" x2="840" y2="178" />
        {/* Entrance columns */}
        <line x1="645" y1="192" x2="645" y2="155" />
        <line x1="665" y1="192" x2="665" y2="155" />
        <line x1="685" y1="192" x2="685" y2="155" />
        <line x1="705" y1="192" x2="705" y2="155" />
        <line x1="725" y1="192" x2="725" y2="155" />
        <line x1="745" y1="192" x2="745" y2="155" />
        <line x1="765" y1="192" x2="765" y2="155" />
        {/* Peak roof lines */}
        <line x1="615" y1="92" x2="615" y2="72" />
        <line x1="685" y1="72" x2="685" y2="50" />
        <line x1="760" y1="92" x2="760" y2="72" />

        {/* ══════════════════════════════════════
            MODERN ACCRA SKYSCRAPERS
            ══════════════════════════════════════ */}
        {/* Building A — tallest glass tower */}
        <rect x="900" y="38" width="62" height="154" />
        <line x1="915" y1="38" x2="915" y2="192" />
        <line x1="930" y1="38" x2="930" y2="192" />
        <line x1="945" y1="38" x2="945" y2="192" />
        <line x1="900" y1="65" x2="962" y2="65" />
        <line x1="900" y1="90" x2="962" y2="90" />
        <line x1="900" y1="115" x2="962" y2="115" />
        <line x1="900" y1="140" x2="962" y2="140" />
        <line x1="900" y1="165" x2="962" y2="165" />
        {/* Antenna */}
        <line x1="931" y1="38" x2="931" y2="18" />

        {/* Building B */}
        <rect x="978" y="65" width="52" height="127" />
        <line x1="992" y1="65" x2="992" y2="192" />
        <line x1="1006" y1="65" x2="1006" y2="192" />
        <line x1="978" y1="90" x2="1030" y2="90" />
        <line x1="978" y1="118" x2="1030" y2="118" />
        <line x1="978" y1="146" x2="1030" y2="146" />
        <line x1="978" y1="170" x2="1030" y2="170" />

        {/* Building C — slender tower */}
        <rect x="1046" y="50" width="44" height="142" />
        <line x1="1059" y1="50" x2="1059" y2="192" />
        <line x1="1046" y1="78" x2="1090" y2="78" />
        <line x1="1046" y1="106" x2="1090" y2="106" />
        <line x1="1046" y1="134" x2="1090" y2="134" />
        <line x1="1046" y1="162" x2="1090" y2="162" />
        <line x1="1068" y1="50" x2="1068" y2="30" />

        {/* Building D */}
        <rect x="1108" y="88" width="48" height="104" />
        <line x1="1121" y1="88" x2="1121" y2="192" />
        <line x1="1108" y1="112" x2="1156" y2="112" />
        <line x1="1108" y1="138" x2="1156" y2="138" />
        <line x1="1108" y1="165" x2="1156" y2="165" />

        {/* Building E — wide slab */}
        <rect x="1172" y="70" width="70" height="122" />
        <line x1="1194" y1="70" x2="1194" y2="192" />
        <line x1="1216" y1="70" x2="1216" y2="192" />
        <line x1="1238" y1="70" x2="1238" y2="192" />
        <line x1="1172" y1="95" x2="1242" y2="95" />
        <line x1="1172" y1="122" x2="1242" y2="122" />
        <line x1="1172" y1="149" x2="1242" y2="149" />
        <line x1="1172" y1="172" x2="1242" y2="172" />

        {/* Building F — tapered top */}
        <rect x="1260" y="58" width="55" height="134" />
        <rect x="1267" y="44" width="42" height="14" />
        <rect x="1274" y="36" width="28" height="8" />
        <line x1="1272" y1="58" x2="1272" y2="192" />
        <line x1="1285" y1="58" x2="1285" y2="192" />
        <line x1="1298" y1="58" x2="1298" y2="192" />
        <line x1="1260" y1="85" x2="1315" y2="85" />
        <line x1="1260" y1="112" x2="1315" y2="112" />
        <line x1="1260" y1="140" x2="1315" y2="140" />
        <line x1="1260" y1="168" x2="1315" y2="168" />

        {/* Building G — far right  */}
        <rect x="1332" y="82" width="46" height="110" />
        <line x1="1345" y1="82" x2="1345" y2="192" />
        <line x1="1332" y1="105" x2="1378" y2="105" />
        <line x1="1332" y1="130" x2="1378" y2="130" />
        <line x1="1332" y1="158" x2="1378" y2="158" />
      </svg>
    </div>
  );
}
