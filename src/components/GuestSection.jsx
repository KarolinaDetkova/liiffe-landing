'use client'

import React, { useEffect, useRef } from 'react';

/**
 * GuestIntelligenceSection — Liiffe "¿Conoces realmente a tu huésped?" section.
 *
 * Self-contained: ships its own scoped CSS (injected once) and pulls the Geist +
 * Material Symbols Rounded webfonts from Google Fonts. Drop it anywhere in your app:
 *
 *   import GuestIntelligenceSection from './GuestIntelligenceSection';
 *   <GuestIntelligenceSection imageSrc={guestPhoto} />
 *
 * Props:
 *   imageSrc     URL for the central guest photo. Omit to show a placeholder.
 *   imageAlt     alt text for the photo (default "Huésped").
 *   placeholder  caption shown in the empty image slot.
 *   className    extra class(es) appended to the <section>.
 *   id           id for the <section> (default "gi"); purely cosmetic.
 *
 * Fonts: if your app already self-hosts Geist / a Material Symbols set, you can
 * delete the two @import lines at the top of CSS below and rely on your own.
 */

const PALETTE = ['#FF008C', '#06BFFF', '#5C74FF', '#862BF4', '#1E78E6', '#00E7FF'];

const SOURCES = [
  { icon: 'bed',            label: 'PMS',               color: 'var(--gi-navy)' },
  { icon: 'calendar_month', label: 'Motor de reservas', color: 'var(--gi-magenta)' },
  { icon: 'language',       label: 'Web',               color: 'var(--gi-cyan)' },
  { icon: 'shopping_bag',   label: 'OTA',               color: 'var(--gi-magenta)' },
  { icon: 'thumb_up',       label: 'Redes sociales',    color: 'var(--gi-navy)' },
  { icon: 'person',         label: 'CRM',               color: 'var(--gi-magenta)' },
  { icon: 'assignment',     label: 'Encuestas',         color: 'var(--gi-navy)' },
];

const QUESTIONS = [
  '¿Qué le motiva a reservar?',
  '¿Viaja por ocio o negocio?',
  '¿Qué servicios consume?',
  '¿Qué oferta le interesa?',
  '¿Qué probabilidad tiene de volver?',
  '¿Cuál es su valor futuro?',
];

const NODES = [
  { cls: 'gustos',        icon: 'favorite',     color: 'var(--gi-magenta)', label: 'Gustos' },
  { cls: 'preferencias',  icon: 'apartment',    color: 'var(--gi-blue)',    label: 'Preferencias' },
  { cls: 'experiencias',  icon: 'room_service', color: 'var(--gi-magenta)', label: 'Experiencias' },
  { cls: 'comportamiento',icon: 'bar_chart',    color: 'var(--gi-blue)',    label: 'Comportamiento' },
  { cls: 'motivo',        icon: 'work',         color: 'var(--gi-magenta)', label: (<>Motivo<br />del viaje</>) },
  { cls: 'intereses',     icon: 'star',         color: 'var(--gi-blue)',    label: 'Intereses' },
];

/* ───────────────────────── styles (scoped under .gi) ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0&display=swap');

.gi {
  /* design tokens (subset of the Liiffe design system) */
  --brand-white:#F6F6F9; --navy:#1F2C49; --magenta:#FF008C; --cyan:#06BFFF;
  --ink:#0E1626; --ink-3:#6B7387; --surface:#FFFFFF; --line:#E2E4EC;
  --font-sans:'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, monospace;
  --w-regular:400; --w-medium:500; --w-semibold:600; --w-bold:700;
  --r-md:14px; --r-lg:20px; --r-pill:999px;
  --shadow-sm:0 1px 2px rgba(14,22,38,.06),0 1px 1px rgba(14,22,38,.04);
  --shadow-md:0 4px 14px rgba(14,22,38,.08),0 2px 4px rgba(14,22,38,.04);
  /* section accents */
  --gi-navy:var(--navy); --gi-magenta:var(--magenta); --gi-cyan:var(--cyan); --gi-blue:#1E78E6;

  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #0E1626;
  color: var(--ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  padding: clamp(20px, 4vh, 48px) clamp(16px, 4vw, 56px);
  overflow: hidden;
}
.gi *, .gi *::before, .gi *::after { box-sizing: border-box; }
.gi__inner { flex: 1; max-width: 1320px; margin-inline: auto; }

.gi .material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
  user-select: none;
}

/* Header */
.gi__head { text-align: center; margin-bottom: clamp(20px, 3vh, 36px); }
.gi__title {
  margin: 0 0 12px;
  font-weight: var(--w-bold);
  font-size: clamp(22px, 3.6vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--brand-white);
  text-wrap: balance;
}
.gi__title b { color: var(--gi-blue); font-weight: inherit; }
.gi__sub1 { margin: 0; font-size: clamp(14px, 1.5vw, 18px); font-weight: var(--w-regular); color: var(--brand-white); }
.gi__sub2 { margin: 3px 0 0; font-size: clamp(14px, 1.5vw, 18px); font-weight: var(--w-bold); color: var(--gi-magenta); text-wrap: balance; }

/* 3-column grid */
.gi__grid { position: relative; display: grid; grid-template-columns: 1fr; justify-items: center; gap: clamp(36px, 5vw, 56px); }
.gi__center { grid-row: 1; }
.gi__flow { display: none; position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
.gi__col, .gi__center { position: relative; z-index: 1; width: 100%; }

/* Column headings */
.gi__colhead { text-align: center; margin-bottom: 18px; }
.gi__colhead h3 { margin: 0; font-size: clamp(16px, 1.5vw, 20px); font-weight: var(--w-bold); letter-spacing: 0.01em; text-transform: uppercase; color: var(--brand-white); }
.gi__colhead p { margin: 2px 0 0; font-size: clamp(13px, 1.2vw, 15px); font-weight: var(--w-bold); letter-spacing: 0.02em; text-transform: uppercase; color: var(--gi-magenta); }

/* Source & question cards */
.gi__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; max-width: 320px; width: 100%; margin-inline: auto; }
.src, .q {
  position: relative; display: flex; align-items: center; gap: 14px;
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-md);
  padding: 8px 16px 8px 8px;
  box-shadow: 0 6px 20px rgba(14,22,38,0.10), 0 2px 6px rgba(14,22,38,0.05);
  transition: box-shadow .25s ease, transform .25s cubic-bezier(.22,.61,.36,1);
}
.q { padding: 9px 16px; }
.src:hover, .q:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(14,22,38,0.15), 0 4px 10px rgba(14,22,38,0.07); }

/* connector plug — colored dot where the line meets the card (desktop only) */
.src__plug, .q__plug {
  position: absolute; top: 50%; width: 6px; height: 6px; border-radius: 50%;
  transform: translateY(-50%);
  background: var(--plug, var(--gi-magenta));
  box-shadow: 0 0 0 2px var(--brand-white), 0 0 7px 1px var(--plug, var(--gi-magenta));
  display: none; z-index: 2;
}
.src__plug { right: -3px; }
.q__plug { left: -3px; }
@media (min-width: 1024px) { .src__plug, .q__plug { display: block; } }

.src__ic { flex: 0 0 auto; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 10px; background: var(--c, var(--gi-navy)); color: #fff; }
.src__ic .material-symbols-rounded { font-size: 20px; }
.src__lbl { font-size: clamp(14px, 1.3vw, 16px); font-weight: var(--w-medium); color: var(--gi-navy); }
.q__dot { flex: 0 0 auto; width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; background: var(--gi-magenta); color: #fff; font-weight: var(--w-bold); font-size: 18px; line-height: 1; }
.q__lbl { font-size: clamp(14px, 1.3vw, 16px); font-weight: var(--w-medium); color: var(--gi-navy); }

/* Center orbit */
.gi__center { display: grid; place-items: center; padding: 32px 12px; }
.orbit { --ic: clamp(44px, 12%, 58px); position: relative; width: min(420px, 84vw); aspect-ratio: 1 / 1; }
.orbit__path, .orbit__glow, .orbit__ring, .orbit__img { position: absolute; inset: 0; margin: auto; border-radius: 50%; }
.orbit__path { width: 92%; height: 92%; border: 1.5px dashed rgba(125, 136, 159, 0.61); }
.orbit__glow { width: 74%; height: 74%; background: radial-gradient(circle, rgba(121, 134, 207, 0.67), rgba(255,0,140,0.12) 55%, transparent 72%); filter: blur(6px); opacity: .85; transition: opacity .5s ease, transform .5s ease; }
.orbit__ring {
  width: 60%; height: 60%;
  background: conic-gradient(from 215deg, #FF008C 0%, #862BF4 26%, #5C74FF 46%, #06BFFF 66%, #00E7FF 80%, #FF008C 100%);
  -webkit-mask: radial-gradient(circle closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));
          mask: radial-gradient(circle closest-side, transparent calc(100% - 4px), #000 calc(100% - 3px));
  transition: filter .5s ease, opacity .5s ease;
}
.orbit__img { width: 57%; height: 57%; overflow: hidden; box-shadow: 0 10px 34px rgba(14,22,38,0.18); cursor: pointer; }
.orbit__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.orbit__img-ph {
  width: 100%; height: 100%; display: grid; place-items: center; text-align: center; padding: 0 18px;
  background: repeating-linear-gradient(45deg, #ECEEF5 0 9px, #F6F6F9 9px 18px);
  color: var(--ink-3); font-family: var(--font-mono); font-size: 11px; letter-spacing: .04em; text-transform: uppercase;
}
.orbit:hover .orbit__ring { filter: blur(9px) saturate(1.4); }
.orbit:hover .orbit__glow { opacity: 1; transform: scale(1.14); }

/* orbit nodes */
.node { position: absolute; transform: translate(-50%, -50%); width: 0; height: 0; }
.node__ic {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
  width: var(--ic); height: var(--ic); display: grid; place-items: center; border-radius: 50%;
  background: var(--c); color: #fff;
  box-shadow: 0 0 0 5px var(--brand-white), 0 6px 16px rgba(14,22,38,0.20);
}
.node__ic .material-symbols-rounded { font-size: calc(var(--ic) * 0.5); }
.node__q { position: absolute; top: 50%; transform: translateY(-50%); font-weight: var(--w-bold); font-size: clamp(15px, 1.8vw, 20px); color: var(--c); line-height: 1; }
.node__lbl { position: absolute; font-size: clamp(11px, 1.15vw, 13px); font-weight: var(--w-bold); letter-spacing: 0.07em; text-transform: uppercase; color: var(--gi-navy); white-space: nowrap; line-height: 1.15; text-align: center; }
.node--gustos { left: 50%; top: 4%; }
.node--preferencias { left: 90%; top: 27%; }
.node--experiencias { left: 90%; top: 73%; }
.node--comportamiento { left: 50%; top: 96%; }
.node--motivo { left: 10%; top: 73%; }
.node--intereses { left: 10%; top: 27%; }
.node--gustos .node__lbl { bottom: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-50%); }
.node--preferencias .node__lbl { bottom: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-28%); }
.node--intereses .node__lbl { bottom: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-72%); }
.node--comportamiento .node__lbl { top: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-50%); }
.node--experiencias .node__lbl { top: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-28%); }
.node--motivo .node__lbl { top: calc(var(--ic) / 2 + 10px); left: 50%; transform: translateX(-72%); }
.node--gustos .node__q,
.node--preferencias .node__q,
.node--experiencias .node__q,
.node--comportamiento .node__q { left: calc(var(--ic) / 2 + 8px); }
.node--intereses .node__q,
.node--motivo .node__q { right: calc(var(--ic) / 2 + 8px); }

/* Bottom banner */
.gi__banner { display: flex; align-items: center; gap: 12px; max-width: 540px; margin: clamp(18px, 2.6vh, 32px) auto 0; padding: 12px 20px; background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--shadow-sm); }
.gi__bang { flex: 0 0 auto; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%; border: 2px solid var(--gi-magenta); color: var(--gi-magenta); font-weight: var(--w-bold); font-size: 18px; line-height: 1; }
.gi__banner p { margin: 0; font-size: clamp(13px, 1.35vw, 16px); line-height: 1.3; }
.gi__banner b { color: var(--gi-navy); font-weight: var(--w-bold); display: block; }
.gi__banner .mag { color: var(--gi-magenta); font-weight: var(--w-bold); }

/* Scroll reveal */
.gi--anim .reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1); }
.gi--anim .reveal.in { opacity: 1; transform: none; }
.gi__list .reveal:nth-child(1) { transition-delay: .04s; }
.gi__list .reveal:nth-child(2) { transition-delay: .09s; }
.gi__list .reveal:nth-child(3) { transition-delay: .14s; }
.gi__list .reveal:nth-child(4) { transition-delay: .19s; }
.gi__list .reveal:nth-child(5) { transition-delay: .24s; }
.gi__list .reveal:nth-child(6) { transition-delay: .29s; }
.gi__list .reveal:nth-child(7) { transition-delay: .34s; }

/* Ambient motion */
@keyframes gi-ring-spin { to { transform: rotate(360deg); } }
@keyframes gi-path-spin { to { transform: rotate(-360deg); } }
@keyframes gi-bob { 0%, 100% { transform: translate(-50%, -50%); } 50% { transform: translate(-50%, calc(-50% - 4px)); } }
@keyframes gi-qpulse { 0%, 100% { opacity: .4; } 50% { opacity: 1; } }
@keyframes gi-plug { 0%, 100% { box-shadow: 0 0 0 2px var(--brand-white), 0 0 5px 0 var(--plug); } 50% { box-shadow: 0 0 0 2px var(--brand-white), 0 0 11px 1px var(--plug); } }
@media (prefers-reduced-motion: no-preference) {
  .orbit__ring { animation: gi-ring-spin 24s linear infinite; }
  .orbit__path { animation: gi-path-spin 90s linear infinite; }
  .node__ic { animation: gi-bob 5s ease-in-out infinite; }
  .node__q { animation: gi-qpulse 2.8s ease-in-out infinite; }
  .src__plug, .q__plug { animation: gi-plug 2.6s ease-in-out infinite; }
  .node--preferencias .node__ic { animation-delay: -.9s; }
  .node--experiencias .node__ic { animation-delay: -1.8s; }
  .node--comportamiento .node__ic { animation-delay: -2.6s; }
  .node--motivo .node__ic { animation-delay: -3.4s; }
  .node--intereses .node__ic { animation-delay: -4.2s; }
  .node--preferencias .node__q { animation-delay: -.5s; }
  .node--experiencias .node__q { animation-delay: -1.0s; }
  .node--comportamiento .node__q { animation-delay: -1.5s; }
  .node--motivo .node__q { animation-delay: -2.0s; }
  .node--intereses .node__q { animation-delay: -2.5s; }
}

/* Responsive */
@media (min-width: 640px) {
  .gi__grid { grid-template-columns: 1fr 1fr; align-items: start; column-gap: clamp(24px, 5vw, 48px); }
  .gi__center { grid-column: 1 / -1; grid-row: 1; }
  .gi__col--left { grid-column: 1; grid-row: 2; }
  .gi__col--right { grid-column: 2; grid-row: 2; }
}
@media (max-width: 639px) {
  .gi__col--left  { order: 1; }
  .gi__center     { order: 2; }
  .gi__col--right { order: 3; }
  .gi__grid       { display: flex; flex-direction: column; align-items: center; }
}
@media (min-width: 1024px) {
  .gi__grid { grid-template-columns: minmax(240px, 1fr) auto minmax(240px, 1fr); align-items: center; column-gap: clamp(28px, 4vw, 64px); }
  .gi__center { grid-column: 2; grid-row: 1; }
  .gi__col--left { grid-column: 1; grid-row: 1; }
  .gi__col--right { grid-column: 3; grid-row: 1; }
  .gi__flow { display: block; }
  .orbit { width: clamp(300px, 24vw, 380px); }
  .gi__title { white-space: nowrap; }
  .gi__col--left .gi__list { max-width: 300px; margin-left: 0; margin-right: auto; }
  .gi__col--right .gi__list { max-width: 300px; margin-left: auto; margin-right: 0; }
}
@media (prefers-reduced-motion: reduce) { .gi--anim .reveal { opacity: 1; transform: none; transition: none; } }
@media print { .gi--anim .reveal { opacity: 1 !important; transform: none !important; } }
@media (max-width: 700px) {
  .orbit { width: min(360px, 78vw); }
  .node__lbl { font-size: 10px; letter-spacing: .04em; }
  .node__q { font-size: 15px; }
}
@media (max-width: 420px) {
  .gi__center { padding: 24px 2px; }
  .gi__banner { flex-direction: row; align-items: flex-start; padding: 18px 20px; }
}
`;

let stylesInjected = false;
function useGiStyles() {
  useEffect(() => {
    if (stylesInjected || document.getElementById('gi-styles')) { stylesInjected = true; return; }
    stylesInjected = true;
    const el = document.createElement('style');
    el.id = 'gi-styles';
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

export default function GuestSection({
  imageSrc,
  imageAlt = 'Huésped',
  placeholder = 'Imagen del huésped',
  className = '',
  id = 'huesped',
}) {
  useGiStyles();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const canvasRef = useRef(null);

  /* canvas particles + connectors, hover, scroll reveal — all imperative */
  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const canvas = canvasRef.current;
    if (!section || !grid || !canvas) return undefined;
    const orbit = section.querySelector('.orbit__ring');
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const timers = [];
    const addT = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };

    let W = 0, H = 0, dpr = 1, geom = null;
    let leftParts = [], rightParts = [];
    let running = false, rafId = null, cancelled = false, didBoot = false;
    let hover = null;

    const LEFT_COLS = [[31,44,73],[31,44,73],[30,120,230],[6,191,255],[255,0,140]];
    const RIGHT_COLS = [[255,0,140],[255,0,140],[30,120,230],[31,44,73]];
    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];
    const hexA = (hex, a) => {
      const n = parseInt(hex.slice(1), 16);
      return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a.toFixed(3) + ')';
    };

    function rectIn(el) {
      const g = grid.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - g.left, y: r.top - g.top, w: r.width, h: r.height,
               cx: r.left - g.left + r.width / 2, cy: r.top - g.top + r.height / 2,
               left: r.left - g.left, right: r.right - g.left };
    }

    function measure() {
      const g = grid.getBoundingClientRect();
      W = g.width; H = g.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const o = rectIn(orbit);
      const r = o.w / 2;
      const srcCards = [...section.querySelectorAll('.gi__col--left .src')].map(rectIn);
      const qCards = [...section.querySelectorAll('.gi__col--right .q')].map(rectIn);
      const srcPlugEls = [...section.querySelectorAll('.gi__col--left .src__plug')];
      const qPlugEls = [...section.querySelectorAll('.gi__col--right .q__plug')];

      geom = {
        o: { cx: o.cx, cy: o.cy, r },
        leftFocal: { x: o.cx - r * 1.05, y: o.cy },
        rightFocal: { x: o.cx + r * 1.05, y: o.cy },
        srcAnchors: srcPlugEls.map((p, i) => { const c = rectIn(p); return { x: c.cx, y: c.cy, color: PALETTE[i % PALETTE.length] }; }),
        qAnchors: qPlugEls.map((p, i) => { const c = rectIn(p); return { x: c.cx, y: c.cy, color: PALETTE[(i + 3) % PALETTE.length] }; }),
        srcPlugEls, qPlugEls,
        leftStart: Math.max(8, Math.min(...srcCards.map((c) => c.right), o.cx)),
        rightEnd: Math.min(W - 8, Math.max(...qCards.map((c) => c.left), o.cx)),
      };
    }

    function setupHover() {
      section.querySelectorAll('.gi__col--left .src').forEach((el, i) => {
        el.addEventListener('pointerenter', () => { hover = { s: 'L', i }; }, sig);
        el.addEventListener('pointerleave', () => { if (hover && hover.s === 'L' && hover.i === i) hover = null; }, sig);
      });
      section.querySelectorAll('.gi__col--right .q').forEach((el, i) => {
        el.addEventListener('pointerenter', () => { hover = { s: 'R', i }; }, sig);
        el.addEventListener('pointerleave', () => { if (hover && hover.s === 'R' && hover.i === i) hover = null; }, sig);
      });
    }
    function liveAnchor(s, i, fallback) {
      const el = s === 'L' ? geom.srcPlugEls[i] : geom.qPlugEls[i];
      if (!el) return fallback;
      const c = rectIn(el);
      return { x: c.cx, y: c.cy };
    }

    function drawConnectors() {
      const t = performance.now() / 1000;
      geom.srcAnchors.forEach((a, i) => {
        const on = !!(hover && hover.s === 'L' && hover.i === i);
        curve(on ? liveAnchor('L', i, a) : a, geom.leftFocal, a.color, t + i * 0.7, on);
      });
      geom.qAnchors.forEach((a, i) => {
        const on = !!(hover && hover.s === 'R' && hover.i === i);
        curve(geom.rightFocal, on ? liveAnchor('R', i, a) : a, a.color, t + i * 0.7, on);
      });
    }
    function curve(a, b, color, ph, on) {
      const mx = (a.x + b.x) / 2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.bezierCurveTo(mx, a.y, mx, b.y, b.x, b.y);
      if (on) {
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = hexA(color, 0.85);
        ctx.shadowColor = hexA(color, 0.55);
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = 'rgba(31,44,73,' + (0.12 + 0.04 * Math.sin(ph)).toFixed(3) + ')';
        ctx.stroke();
      }
    }

    function reset(p, side) {
      const f = side === 'L' ? geom.leftFocal : geom.rightFocal;
      let x0;
      if (side === 'L') x0 = rand(geom.leftStart + 6, f.x - 8);
      else x0 = rand(f.x + 8, geom.rightEnd - 6);
      const span = side === 'L' ? (f.x - geom.leftStart) : (geom.rightEnd - f.x);
      const prog = side === 'L' ? (x0 - geom.leftStart) / span : (geom.rightEnd - x0) / span;
      const spread = (1 - prog) * geom.o.r * 0.8 + 5;
      const y0 = f.y + rand(-1, 1) * spread;
      p.sx = x0; p.sy = y0; p.fx = f.x; p.fy = f.y;
      p.total = Math.hypot(f.x - x0, f.y - y0) || 1;
      p.t = 0;
      p.speed = rand(0.0024, 0.0072);
      p.size = rand(1, 3.2);
    }
    function step(p, side) {
      p.t += p.speed;
      if (p.t >= 1) { reset(p, side); return; }
      const x = p.sx + (p.fx - p.sx) * p.t;
      const y = p.sy + (p.fy - p.sy) * p.t;
      const a = Math.sin(p.t * Math.PI) * 0.55;
      const c = p.col;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')';
      ctx.fill();
    }
    function initParticles() {
      const n = Math.round(Math.min(120, Math.max(60, W / 9)));
      leftParts = Array.from({ length: n }, () => { const p = { col: pick(LEFT_COLS) }; reset(p, 'L'); p.t = Math.random(); return p; });
      rightParts = Array.from({ length: n }, () => { const p = { col: pick(RIGHT_COLS) }; reset(p, 'R'); p.t = Math.random(); return p; });
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      drawConnectors();
      for (const p of leftParts) step(p, 'L');
      for (const p of rightParts) step(p, 'R');
      if (running) rafId = requestAnimationFrame(frame);
    }
    function drawStatic() {
      ctx.clearRect(0, 0, W, H);
      drawConnectors();
      const draw = (parts, side) => parts.forEach((p) => {
        p.t = Math.random();
        const x = p.sx + (p.fx - p.sx) * p.t;
        const y = p.sy + (p.fy - p.sy) * p.t;
        const a = Math.sin(p.t * Math.PI) * 0.5;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + a.toFixed(3) + ')';
        ctx.fill();
      });
      draw(leftParts, 'L'); draw(rightParts, 'R');
    }

    function start() {
      if (running || !geom || cancelled) return;
      if (reduce) { drawStatic(); return; }
      running = true; frame();
    }
    function stop() { running = false; if (rafId) cancelAnimationFrame(rafId); }
    function setup() {
      if (getComputedStyle(canvas).display === 'none') { stop(); return; }
      measure(); initParticles();
      if (reduce) drawStatic();
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (getComputedStyle(canvas).display === 'none') return;
        if (e.isIntersecting) start(); else stop();
      });
    }, { threshold: 0.05 });

    const revIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    const revealEls = [...section.querySelectorAll('.reveal')];
    if (!reduce && document.visibilityState === 'visible') {
      section.classList.add('gi--anim');
      revealEls.forEach((el) => revIO.observe(el));
      addT(() => revealEls.forEach((el) => el.classList.add('in')), 1600);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') revealEls.forEach((el) => el.classList.add('in'));
    }, sig);

    let rt;
    function onResize() {
      clearTimeout(rt);
      rt = setTimeout(() => { setup(); if (!running) start(); }, 150);
      timers.push(rt);
    }
    window.addEventListener('resize', onResize, sig);

    let mt;
    function reMeasure() { if (getComputedStyle(canvas).display === 'none') return; measure(); }
    function scheduleReMeasure() { clearTimeout(mt); mt = setTimeout(reMeasure, 120); timers.push(mt); }

    function boot() {
      if (didBoot || cancelled) return;
      didBoot = true;
      setupHover();
      setup();
      io.observe(grid);
      start();
      addT(reMeasure, 700);
      addT(reMeasure, 2000);
      grid.addEventListener('transitionend', scheduleReMeasure, sig);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => boot());
      addT(() => { if (!geom) boot(); }, 600);
    } else {
      boot();
    }

    return () => {
      cancelled = true;
      ac.abort();
      io.disconnect();
      revIO.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      running = false;
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`gi ${className}`.trim()} data-screen-label="Guest Intelligence">
      <div className="gi__inner">

        <div className="gi__head">
          <h2 className="gi__title reveal">¿Conoces realmente a tu <b>huésped</b>?</h2>
          <p className="gi__sub1 reveal">El problema no es la falta de datos.</p>
          <p className="gi__sub2 reveal">El problema es no convertirlos en conocimiento.</p>
        </div>

        <div className="gi__grid" ref={gridRef}>
          <canvas className="gi__flow" aria-hidden="true" ref={canvasRef}></canvas>

          {/* LEFT: data sources */}
          <div className="gi__col gi__col--left">
            <div className="gi__colhead reveal">
              <h3>Tienes datos.</h3>
              <p>De muchas fuentes.</p>
            </div>
            <ul className="gi__list">
              {SOURCES.map((s, i) => (
                <li className="src reveal" style={{ '--c': s.color }} key={s.label}>
                  <span className="src__ic"><span className="material-symbols-rounded">{s.icon}</span></span>
                  <span className="src__lbl">{s.label}</span>
                  <span className="src__plug" style={{ '--plug': PALETTE[i % PALETTE.length] }} />
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: orbit */}
          <div className="gi__center reveal">
            <div className="orbit">
              <div className="orbit__path"></div>
              <div className="orbit__glow"></div>
              <div className="orbit__ring"></div>
              <div className="orbit__img">
                {imageSrc
                  ? <img src={imageSrc} alt={imageAlt} />
                  : <div className="orbit__img-ph"><span>{placeholder}</span></div>}
              </div>
              {NODES.map((n) => (
                <div className={`node node--${n.cls}`} style={{ '--c': n.color }} key={n.cls}>
                  <span className="node__ic"><span className="material-symbols-rounded">{n.icon}</span></span>
                  <span className="node__q">?</span>
                  <span className="node__lbl">{n.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: questions */}
          <div className="gi__col gi__col--right">
            <div className="gi__colhead reveal">
              <h3>Pero no sabes</h3>
              <p>Responder esto.</p>
            </div>
            <ul className="gi__list">
              {QUESTIONS.map((qt, i) => (
                <li className="q reveal" key={qt}>
                  <span className="q__dot">?</span>
                  <span className="q__lbl">{qt}</span>
                  <span className="q__plug" style={{ '--plug': PALETTE[(i + 3) % PALETTE.length] }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gi__banner reveal">
          <span className="gi__bang">!</span>
          <p><b>Los hoteles tienen datos de sus huéspedes.</b><span className="mag">Muy pocos los conocen realmente.</span></p>
        </div>

      </div>
    </section>
  );
}