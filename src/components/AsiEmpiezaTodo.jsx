'use client';

import React, { useEffect, useRef } from 'react';
import {
  Smartphone, TrendingUp, Wifi, BatteryFull, Search, ChevronDown, ChevronRight,
  Heart, MapPin, Calendar, Compass, Map, Ticket, User, Utensils, Dumbbell,
  Flower2, SquareParking, Star, Briefcase, SlidersHorizontal, ConciergeBell,
  BarChart3, LayoutDashboard, Users, MessagesSquare, PieChart, ThumbsUp,
  FileText, Settings, ArrowUp, Bus, UserRoundCheck,
} from 'lucide-react';

/**
 * BrandExperienceSection — Liiffe "Así empieza todo" section.
 *
 * The guest app captures signals → Liiffe turns them into hotel intelligence.
 * Self-contained: ships its own scoped CSS (injected once) and renders icons via
 * `lucide-react`. Drop it anywhere in a Next.js app (it's a client component):
 *
 *   import BrandExperienceSection from '@/components/BrandExperienceSection';
 *   <BrandExperienceSection logoSrc="/liiffe-isotipo.png" navHeight="80px" />
 *
 * Requirements:
 *   npm i lucide-react
 *   Put the Liiffe isotipo PNG in /public (default path "/liiffe-isotipo.png").
 *
 * Props:
 *   logoSrc    URL for the Liiffe isotipo tile (default "/liiffe-isotipo.png").
 *   navHeight  CSS length subtracted from 100vh so it fits under your navbar
 *              (e.g. "80px"). Default "0px".
 *   className  extra class(es) appended to the <section>.
 *   id         id for the <section> (default "ae").
 *
 * Fonts: this pulls Geist from Google Fonts (a free near-match to ABC Diatype).
 * If you self-host fonts (e.g. next/font), delete the @import at the top of CSS.
 */

const I = 'material-symbols-rounded'; // shared class the CSS uses to size icons

const CHIPS = [
  { t: 'Gastronomía', on: true }, { t: 'Cultura' }, { t: 'Naturaleza', on: true },
  { t: 'Bienestar' }, { t: 'Aventura' }, { t: 'Arte', on: true }, { t: 'Compras' },
];
const TOGGLES = [
  { Icon: Utensils, t: 'Desayuno tardío', on: true },
  { Icon: Dumbbell, t: 'Acceso al gym' },
  { Icon: Flower2, t: 'Reserva de spa', on: true },
  { Icon: SquareParking, t: 'Parking' },
];
const TABS = [
  { Icon: Compass, t: 'Explorar', on: true }, { Icon: Map, t: 'Mis guías' },
  { Icon: Ticket, t: 'Activid.' }, { Icon: Heart, t: 'Favoritos' }, { Icon: User, t: 'Perfil' },
];
const BLOCKS = [
  { Icon: Heart, label: 'Gustos', c: 'var(--ae-magenta)' },
  { Icon: Star, label: 'Intereses', c: 'var(--ae-peri)' },
  { Icon: Briefcase, label: 'Motivo del viaje', c: 'var(--ae-purple)' },
  { Icon: SlidersHorizontal, label: 'Preferencias', c: 'var(--ae-peri)' },
  { Icon: ConciergeBell, label: 'Experiencias', c: 'var(--ae-magenta)' },
  { Icon: BarChart3, label: 'Comportamiento', c: 'var(--ae-purple)' },
];
const NAV = [
  { Icon: LayoutDashboard, label: 'Dashboard', on: true },
  { Icon: Users, label: 'Huéspedes' },
  { Icon: MessagesSquare, label: 'Interacciones' },
  { Icon: PieChart, label: 'Segmentos' },
  { Icon: ThumbsUp, label: 'Recomend.' },
  { Icon: FileText, label: 'Informes' },
  { Icon: Settings, label: 'Ajustes' },
];
const KPIS = [
  { l: 'Huéspedes activos', v: '1.248', d: '12%' },
  { l: 'Interacciones', v: '3.682', d: '18%' },
  { l: 'Preferencias captadas', v: '2.156', d: '31%' },
  { l: 'Satisfacción', v: '4,8/5', d: '8%' },
];
const LEGEND = [
  { c: 'var(--ae-purple)', l: 'Gastronomía', p: '32%' },
  { c: 'var(--ae-magenta)', l: 'Bienestar', p: '20%' },
  { c: 'var(--ae-cyan)', l: 'Cultura', p: '18%' },
  { c: 'var(--ae-peri)', l: 'Aventura', p: '16%' },
  { c: '#F4B740', l: 'Compras', p: '14%' },
];
const BARS = [
  { l: 'Ocio', p: 48 }, { l: 'Negocios', p: 32 }, { l: 'Pareja', p: 12 }, { l: 'Eventos', p: 8 },
];
const ACTS = [
  { Icon: Utensils, t: 'Laura consultó restaurantes', time: '10:24' },
  { Icon: Flower2, t: 'Reservó experiencia de spa', time: 'Ayer' },
  { Icon: Bus, t: 'Consultó transporte', time: 'Ayer' },
];

/* ───────────────────────── styles (scoped under .ae) ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');

.ae {
  /* design tokens (subset of the Liiffe design system) */
  --brand-white:#F6F6F9; --navy:#1F2C49; --magenta:#FF008C; --cyan:#06BFFF; --cyan-bright:#00E7FF;
  --periwinkle:#5C74FF; --primary:#862BF4; --primary-soft:#EEE1FD; --purple-200:#D2B2FB;
  --ink:#0E1626; --ink-2:#3A4256; --ink-3:#6B7387; --line:#E2E4EC; --line-2:#CDD1DD;
  --surface:#FFFFFF; --surface-2:#F6F6F9;
  --grad-corp-1:linear-gradient(90deg,#FF008C 0%,#06BFFF 100%);
  --grad-corp-2:linear-gradient(90deg,#00E7FF 0%,#5C74FF 100%);
  --grad-isotipo:linear-gradient(150deg,#FF008C 0%,#862BF4 38%,#5C74FF 64%,#00E7FF 100%);
  --w-regular:400; --w-medium:500; --w-semibold:600; --w-bold:700;
  --r-md:14px; --r-lg:20px; --r-pill:999px;
  --shadow-sm:0 1px 2px rgba(14,22,38,.06),0 1px 1px rgba(14,22,38,.04);
  --shadow-md:0 4px 14px rgba(14,22,38,.08),0 2px 4px rgba(14,22,38,.04);
  --ls-eyebrow:0.14em;
  --font-sans:'Geist','ABC Diatype',system-ui,-apple-system,'Segoe UI',sans-serif;
  --font-mono:'Geist Mono',ui-monospace,'SF Mono',Menlo,monospace;
  /* section accents */
  --ae-navy:var(--navy); --ae-magenta:var(--magenta); --ae-cyan:var(--cyan);
  --ae-purple:var(--primary); --ae-peri:var(--periwinkle);
  --ae-nav: 0px;

  position: relative; box-sizing: border-box; width: 100%;
  min-height: calc(100vh - var(--ae-nav));
  display: flex; align-items: center;
  color: var(--ink); font-family: var(--font-sans); -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(120% 80% at 6% -4%,  rgba(134,43,244,0.07), transparent 40%),
    radial-gradient(120% 80% at 102% 104%, rgba(6,191,255,0.08), transparent 46%),
    linear-gradient(180deg, #FFFFFF 0%, #F4F4F8 100%);
  padding: clamp(34px, 5vh, 60px) clamp(18px, 3.4vw, 60px) clamp(22px, 3vh, 40px);
  overflow: hidden;
}
.ae *, .ae *::before, .ae *::after { box-sizing: border-box; }
.ae__inner { width: 100%; max-width: 1360px; margin-inline: auto; position: relative; z-index: 1; }

.ae .${I} { display: inline-flex; align-items: center; justify-content: center; width: 1em; height: 1em; vertical-align: middle; flex: 0 0 auto; }

/* seam / divider */
.ae__seam { position: absolute; top: 0; left: 0; right: 0; height: 0; z-index: 3; display: flex; justify-content: center; }
.ae__seam::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad-isotipo); opacity: .9; }
.ae__marker { position: relative; top: clamp(14px, 2.6vh, 26px); display: inline-flex; align-items: center; gap: 9px; padding: 6px 16px 6px 7px; background: #fff; border: 1px solid var(--line); border-radius: var(--r-pill); box-shadow: var(--shadow-md); font-size: 11.5px; font-weight: var(--w-bold); letter-spacing: var(--ls-eyebrow); text-transform: uppercase; color: var(--ae-navy); }
.ae__marker img { width: 22px; height: 22px; border-radius: 6px; display: block; }

/* decorative ambient */
.ae__deco { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.ae__dots { position: absolute; width: 220px; height: 190px; background-image: radial-gradient(rgba(134,43,244,0.20) 1.5px, transparent 1.6px); background-size: 16px 16px; -webkit-mask: linear-gradient(135deg, #000, transparent 72%); mask: linear-gradient(135deg, #000, transparent 72%); }
.ae__dots--br { right: -16px; bottom: -8px; transform: scaleX(-1); }
.ae__blob { position: absolute; border-radius: 50%; filter: blur(64px); opacity: .5; }
.ae__blob--1 { left: -110px; top: -60px; width: 320px; height: 320px; background: radial-gradient(circle, rgba(255,0,140,0.16), transparent 70%); }
.ae__blob--2 { right: -130px; bottom: 20px; width: 360px; height: 360px; background: radial-gradient(circle, rgba(6,191,255,0.14), transparent 70%); }

/* header */
.ae__head { margin-bottom: clamp(16px, 2.6vh, 34px); }
.ae__title { margin: 0 0 clamp(12px, 1.8vh, 20px); font-weight: var(--w-bold); font-size: clamp(28px, 4.6vw, 58px); line-height: 0.98; letter-spacing: -0.03em; text-transform: uppercase; color: var(--ae-navy); text-wrap: balance; }
.ae__title b { font-weight: inherit; color: var(--ae-purple); }
.ae__panelLabel p { text-wrap: balance; }
.ae__point { display: flex; align-items: center; gap: 11px; }
.ae__point .ic { flex: 0 0 auto; width: 38px; height: 38px; display: grid; place-items: center; border-radius: 11px; color: #fff; }
.ae__point .ic .${I} { font-size: 21px; }
.ae__point.is-guest .ic { background: var(--ae-purple); }
.ae__point.is-hotel .ic { background: linear-gradient(135deg, var(--ae-magenta), var(--ae-peri)); }
.ae__point p { margin: 0; font-size: clamp(13px, 1.4vw, 17px); line-height: 1.25; color: var(--ae-navy); }
.ae__point b { font-weight: var(--w-bold); }
.ae__point .g { color: var(--ae-purple); font-weight: var(--w-bold); }
.ae__point .h { color: var(--ae-magenta); font-weight: var(--w-bold); }

/* flow */
.ae__flow { position: relative; display: grid; gap: clamp(20px, 3vh, 34px); align-items: center; }
.ae__particles { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; display: none; }
.ae__panel, .ae__col--data, .ae__merge { position: relative; z-index: 1; min-width: 0; }
.ae__panel { display: flex; flex-direction: column; align-items: center; gap: clamp(12px, 1.8vh, 20px); }

/* fit-to-width scaler */
.ae .fitwrap { width: 100%; display: flex; justify-content: center; overflow: hidden; }
.ae .fitbox { transform-origin: top center; flex: 0 0 auto; }
.ae .padbox { padding: 36px 40px 44px; }

/* phone cluster */
.ae .cluster { position: relative; width: 480px; height: 470px; }
.ae .phone { position: absolute; width: 206px; background: #0E1626; border-radius: 32px; padding: 7px; box-shadow: 0 26px 56px rgba(14,22,38,0.26), 0 8px 18px rgba(14,22,38,0.14); }
.ae .phone__screen { position: relative; width: 100%; aspect-ratio: 210 / 446; background: #fff; border-radius: 26px; overflow: hidden; text-align: left; }
.ae .phone__notch { position: absolute; top: 9px; left: 50%; transform: translateX(-50%); width: 68px; height: 16px; background: #0E1626; border-radius: 0 0 11px 11px; z-index: 5; }
.ae .ph-a { left: 137px; top: 36px; z-index: 3; width: 206px; }
.ae .ph-b { left: 0; top: 6px; z-index: 2; width: 182px; }
.ae .ph-c { left: 298px; top: 64px; z-index: 1; width: 182px; }

.ae .scr { font-size: 11px; color: var(--ink); height: 100%; display: flex; flex-direction: column; }
.ae .scr__status { display: flex; justify-content: space-between; align-items: center; padding: 9px 14px 4px; font-size: 9px; font-weight: var(--w-bold); color: var(--ink); }
.ae .scr__status .r { display: flex; gap: 3px; align-items: center; }
.ae .scr__status .${I} { font-size: 11px; }
.ae .scr__app { display: flex; align-items: center; gap: 8px; margin: 2px 12px 0; padding: 10px 12px; background: var(--ae-purple); border-radius: 15px; color: #fff; }
.ae .scr__app img { width: 26px; height: 26px; border-radius: 8px; }
.ae .scr__app .tt { font-size: 12px; font-weight: var(--w-bold); line-height: 1; }
.ae .scr__app .ss { font-size: 8.5px; opacity: .85; margin-top: 2px; }
.ae .scr__lang { margin-left: auto; background: rgba(255,255,255,0.16); border-radius: 8px; padding: 5px 8px; font-size: 8.5px; font-weight: var(--w-medium); display: flex; align-items: center; gap: 3px; }
.ae .scr__lang .${I} { font-size: 11px; }
.ae .scr__h1 { margin: 12px 14px 0; font-size: 13.5px; font-weight: var(--w-bold); line-height: 1.2; color: var(--ae-navy); }
.ae .scr__search { margin: 9px 14px 0; display: flex; align-items: center; gap: 7px; padding: 9px 11px; border: 1.5px solid var(--purple-200); border-radius: 11px; color: var(--ink-3); font-size: 9.5px; }
.ae .scr__search .${I} { font-size: 14px; color: var(--ae-purple); }
.ae .scr__lbl { margin: 12px 14px 7px; font-size: 9px; font-weight: var(--w-bold); letter-spacing: .06em; text-transform: uppercase; color: var(--ink-3); }
.ae .scr__cards { display: flex; gap: 9px; padding: 0 14px; overflow: hidden; }
.ae .gcard { flex: 0 0 60%; }
.ae .gcard__img { width: 100%; aspect-ratio: 4/3.4; border-radius: 11px; position: relative; overflow: hidden; }
.ae .gcard__img .fav { position: absolute; top: 6px; right: 6px; width: 20px; height: 20px; border-radius: 50%; background: #fff; display: grid; place-items: center; box-shadow: var(--shadow-sm); }
.ae .gcard__img .fav .${I} { font-size: 12px; color: var(--ae-purple); }
.ae .gcard__t { font-size: 10.5px; font-weight: var(--w-bold); color: var(--ae-navy); margin-top: 6px; }
.ae .gcard__m { display: flex; gap: 9px; margin-top: 3px; font-size: 8.5px; color: var(--ink-3); align-items: center; }
.ae .gcard__m span { display: inline-flex; align-items: center; gap: 2px; }
.ae .gcard__m .${I} { font-size: 10px; }
.ae .scr__tabs { margin-top: auto; display: flex; justify-content: space-between; padding: 8px 12px 12px; border-top: 1px solid var(--line); }
.ae .scr__tab { display: flex; flex-direction: column; align-items: center; gap: 2px; font-size: 7.5px; color: var(--ink-3); font-weight: var(--w-medium); }
.ae .scr__tab .${I} { font-size: 16px; }
.ae .scr__tab.is-on { color: var(--ae-purple); }
.ae .scr__pad { padding: 13px 14px 0; flex: 1; }
.ae .qz__step { font-size: 8.5px; font-weight: var(--w-bold); letter-spacing: .06em; text-transform: uppercase; color: var(--ae-magenta); }
.ae .qz__q { font-size: 13.5px; font-weight: var(--w-bold); color: var(--ae-navy); margin-top: 5px; line-height: 1.2; }
.ae .qz__chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 13px; }
.ae .chip { padding: 7px 12px; border-radius: var(--r-pill); border: 1.5px solid var(--line-2); font-size: 9.5px; font-weight: var(--w-medium); color: var(--ink-2); }
.ae .chip.is-on { background: var(--primary-soft); border-color: var(--ae-purple); color: var(--ae-purple); font-weight: var(--w-bold); }
.ae .tg { display: flex; align-items: center; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--line); }
.ae .tg__l { display: flex; align-items: center; gap: 9px; font-size: 10px; font-weight: var(--w-medium); color: var(--ae-navy); }
.ae .tg__l .${I} { font-size: 16px; color: var(--ae-purple); }
.ae .sw { width: 30px; height: 17px; border-radius: 999px; background: var(--line-2); position: relative; flex: 0 0 auto; }
.ae .sw::after { content: ""; position: absolute; top: 2px; left: 2px; width: 13px; height: 13px; border-radius: 50%; background: #fff; box-shadow: var(--shadow-sm); }
.ae .sw.is-on { background: var(--ae-purple); }
.ae .sw.is-on::after { left: 15px; }
.ae .scr__btn { margin: 13px 14px; padding: 11px; border-radius: 12px; background: var(--ae-purple); color: #fff; font-size: 11px; font-weight: var(--w-bold); text-align: center; }
.ae .qz__prog { height: 4px; border-radius: 999px; background: var(--line); margin: 0 14px; position: relative; overflow: hidden; }
.ae .qz__prog::after { content: ""; position: absolute; inset: 0; width: var(--p, 60%); background: var(--grad-corp-1); border-radius: inherit; }

/* data blocks */
.ae .blocks { display: flex; flex-direction: column; gap: clamp(7px, 1vh, 11px); width: 100%; max-width: 300px; margin-inline: auto; }
.ae .block { display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid var(--line); border-radius: var(--r-md); padding: 9px 15px; box-shadow: var(--shadow-sm); transition: transform .25s cubic-bezier(.22,.61,.36,1), box-shadow .25s ease; }
.ae .block:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.ae .block__ic { flex: 0 0 auto; width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; color: #fff; background: var(--c, var(--ae-purple)); }
.ae .block__ic .${I} { font-size: 19px; }
.ae .block__t { font-size: 14px; font-weight: var(--w-semibold); color: var(--ae-navy); }

/* merge node */
.ae__merge { display: grid; place-items: center; }
.ae .merge__node { position: relative; width: 86px; height: 86px; }
.ae .merge__node img { width: 100%; height: 100%; display: block; border-radius: 24px; box-shadow: 0 16px 36px rgba(134,43,244,0.28), 0 5px 12px rgba(14,22,38,0.16); }
.ae .merge__node::before { content: ""; position: absolute; inset: -7px; border-radius: 30px; background: var(--grad-isotipo); z-index: -1; filter: blur(11px); opacity: .55; }

/* dashboard */
.ae .dash { width: 600px; display: grid; grid-template-columns: 140px 1fr; background: #fff; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; text-align: left; box-shadow: 0 30px 64px rgba(14,22,38,0.20), 0 8px 20px rgba(14,22,38,0.10); }
.ae .dash__top { display: flex; align-items: center; gap: 9px; padding: 13px 18px; border-bottom: 1px solid var(--line); }
.ae .dash__top img { width: 26px; height: 26px; border-radius: 8px; }
.ae .dash__top .nm { font-size: 14px; font-weight: var(--w-bold); color: var(--ae-navy); }
.ae .dash__hotel { margin-left: auto; display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: var(--w-medium); color: var(--ink-2); background: var(--surface-2); border: 1px solid var(--line); border-radius: 999px; padding: 5px 10px; }
.ae .dash__hotel .${I} { font-size: 14px; }
.ae .dash__av { width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, var(--ae-magenta), var(--ae-peri)); flex: 0 0 auto; }
.ae .dash__body { display: flex; flex-direction: column; min-width: 0; }
.ae .dash__nav { border-right: 1px solid var(--line); padding: 14px 12px; display: flex; flex-direction: column; gap: 3px; background: #FCFCFE; }
.ae .dnav { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 9px; font-size: 11px; font-weight: var(--w-medium); color: var(--ink-2); }
.ae .dnav .${I} { font-size: 16px; }
.ae .dnav.is-on { background: var(--primary-soft); color: var(--ae-purple); font-weight: var(--w-bold); }
.ae .dash__main { padding: 16px; }
.ae .dash__h { font-size: 14px; font-weight: var(--w-bold); color: var(--ae-navy); margin: 0 0 12px; }
.ae .kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 9px; margin-bottom: 12px; }
.ae .kpi { border: 1px solid var(--line); border-radius: 12px; padding: 10px 11px; background: #fff; }
.ae .kpi__l { font-size: 8.5px; color: var(--ink-3); font-weight: var(--w-medium); line-height: 1.25; }
.ae .kpi__v { font-size: 19px; font-weight: var(--w-bold); color: var(--ae-navy); margin-top: 5px; letter-spacing: -0.01em; }
.ae .kpi__d { font-size: 8.5px; font-weight: var(--w-bold); color: #1F9D55; margin-top: 3px; display: flex; align-items: center; gap: 2px; }
.ae .kpi__d .${I} { font-size: 11px; }
.ae .dgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
.ae .panel { border: 1px solid var(--line); border-radius: 12px; padding: 12px; }
.ae .panel__t { font-size: 11px; font-weight: var(--w-bold); color: var(--ae-navy); margin: 0 0 10px; }
.ae .donutrow { display: flex; align-items: center; gap: 12px; }
.ae .donut { width: 84px; height: 84px; border-radius: 50%; flex: 0 0 auto; position: relative; background: conic-gradient(var(--ae-purple) 0 32%, var(--ae-magenta) 32% 52%, var(--ae-cyan) 52% 70%, var(--ae-peri) 70% 86%, #F4B740 86% 100%); }
.ae .donut::after { content: ""; position: absolute; inset: 24%; border-radius: 50%; background: #fff; }
.ae .legend { display: flex; flex-direction: column; gap: 5px; font-size: 9px; flex: 1; }
.ae .legend > div { display: flex; align-items: center; gap: 6px; color: var(--ink-2); }
.ae .legend .sw2 { width: 8px; height: 8px; border-radius: 2px; flex: 0 0 auto; }
.ae .legend .pc { margin-left: auto; font-weight: var(--w-bold); color: var(--ae-navy); }
.ae .bars { display: flex; flex-direction: column; gap: 9px; }
.ae .bar { font-size: 9px; }
.ae .bar__top { display: flex; justify-content: space-between; color: var(--ink-2); margin-bottom: 4px; }
.ae .bar__top b { color: var(--ae-navy); font-weight: var(--w-bold); }
.ae .bar__track { height: 7px; border-radius: 999px; background: var(--surface-2); overflow: hidden; }
.ae .bar__fill { height: 100%; border-radius: 999px; background: var(--grad-corp-2); }
.ae .dgrid--2 { margin-top: 11px; }
.ae .spark { width: 100%; height: 78px; display: block; }
.ae .acts { display: flex; flex-direction: column; gap: 9px; }
.ae .act { display: flex; align-items: center; gap: 9px; font-size: 9.5px; }
.ae .act__ic { width: 24px; height: 24px; border-radius: 8px; background: var(--primary-soft); color: var(--ae-purple); display: grid; place-items: center; flex: 0 0 auto; }
.ae .act__ic .${I} { font-size: 14px; }
.ae .act__t { color: var(--ae-navy); font-weight: var(--w-medium); }
.ae .act__time { margin-left: auto; color: var(--ink-3); font-size: 8.5px; }
.ae .dash__more { margin-top: 10px; font-size: 10px; font-weight: var(--w-bold); color: var(--ae-purple); display: flex; align-items: center; gap: 3px; }
.ae .dash__more .${I} { font-size: 13px; }

/* banner */
.ae__banner { display: flex; align-items: center; gap: 15px; max-width: 740px; margin: clamp(16px, 2.6vh, 34px) auto 0; padding: 13px 22px; background: #fff; border: 1px solid var(--line); border-radius: var(--r-lg); box-shadow: var(--shadow-md); }
.ae__banner .bic { flex: 0 0 auto; width: 44px; height: 44px; border-radius: 13px; background: linear-gradient(135deg, var(--ae-magenta), var(--ae-peri)); color: #fff; display: grid; place-items: center; }
.ae__banner .bic .${I} { font-size: 25px; }
.ae__banner p { margin: 0; font-size: clamp(14px, 1.5vw, 19px); line-height: 1.4; color: var(--ae-navy); text-wrap: pretty; }
.ae__banner .g { color: var(--ae-purple); font-weight: var(--w-bold); }
.ae__banner .h { color: var(--ae-magenta); font-weight: var(--w-bold); }

/* reveal */
.ae--anim .reveal { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s cubic-bezier(.22,.61,.36,1); }
.ae--anim .reveal.in { opacity: 1; transform: none; }

/* responsive */
.ae__flow { grid-template-columns: 1fr; grid-template-areas: "guest" "data" "merge" "hotel"; }
.ae__panel--guest { grid-area: guest; }
.ae__col--data { grid-area: data; }
.ae__merge { grid-area: merge; }
.ae__panel--hotel { grid-area: hotel; }
.ae__col--data { position: relative; }
.ae__col--data::before { content: ''; position: absolute; left: 50%; top: -20px; transform: translateX(-50%); width: 2px; height: 20px; background: linear-gradient(to bottom, transparent, var(--ae-purple)); }
.ae__col--data::after { content: ''; position: absolute; left: 50%; bottom: -20px; transform: translateX(-50%); width: 2px; height: 20px; background: linear-gradient(to bottom, var(--ae-purple), transparent); }
.ae__merge::before { content: ''; position: absolute; left: 50%; top: -20px; transform: translateX(-50%); width: 2px; height: 20px; background: linear-gradient(to bottom, transparent, var(--ae-magenta)); }
.ae__merge::after { content: ''; position: absolute; left: 50%; bottom: -20px; transform: translateX(-50%); width: 2px; height: 20px; background: linear-gradient(to bottom, var(--ae-magenta), transparent); }

@media (min-width: 720px) {
  .ae__col--data::before, .ae__col--data::after, .ae__merge::before, .ae__merge::after { display: none; }
  .ae__flow { grid-template-columns: 1fr 1fr; grid-template-areas: "guest hotel" "data merge"; align-items: start; column-gap: clamp(24px, 4vw, 52px); row-gap: clamp(22px, 4vh, 40px); }
  .ae__col--data { justify-self: center; }
  .ae .blocks { flex-flow: row wrap; max-width: 560px; justify-content: center; }
  .ae .block { flex: 0 0 auto; }
  .ae__merge { align-self: start; }
}
@media (min-width: 1080px) {
  .ae__flow { grid-template-columns: minmax(0, 1.04fr) minmax(150px, 178px) auto minmax(0, 1.08fr); grid-template-areas: "guest data merge hotel"; align-items: stretch; column-gap: clamp(14px, 2.2vw, 40px); row-gap: 0; }
  .ae__panel--guest { grid-area: guest; }
  .ae__col--data { grid-area: data; justify-self: stretch; display: flex; align-items: center; justify-content: center; }
  .ae__merge { grid-area: merge; align-self: center; }
  .ae__panel--hotel { grid-area: hotel; }
  .ae__panel .fitwrap { margin-block: auto; }
  .ae .blocks { flex-direction: column; max-width: 178px; }
  .ae .block { flex: 1 1 auto; }
  .ae__particles { display: block; }
}
@media (prefers-reduced-motion: reduce) { .ae--anim .reveal { opacity: 1; transform: none; transition: none; } }
@media print { .ae--anim .reveal { opacity: 1 !important; transform: none !important; } }
`;

let stylesInjected = false;
function useAeStyles() {
  useEffect(() => {
    if (stylesInjected || document.getElementById('ae-styles-v3')) { stylesInjected = true; return; }
    stylesInjected = true;
    const el = document.createElement('style');
    el.id = 'ae-styles-v3';
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

export default function AsiEmpiezaTodo({
  logoSrc = '/logo.svg',
  navHeight = '0px',
  className = '',
  id = 'asi-empieza',
}) {
  useAeStyles();
  const sectionRef = useRef(null);
  const flowRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const flow = flowRef.current;
    const canvas = canvasRef.current;
    if (!section || !flow || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ac = new AbortController();
    const sig = { signal: ac.signal };
    const timers = [];
    const addT = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    let cancelled = false;

    /* ---- fit-to-width scaler ---- */
    const fits = [...section.querySelectorAll('[data-fit]')];
    function fitOne(box) {
      if (!box) return;
      const design = parseFloat(box.getAttribute('data-fit'));
      const wrap = box.parentElement;
      const avail = wrap.clientWidth;
      if (!avail) { clearTimeout(box.__ft); box.__ft = addT(() => fitOne(box), 120); return; }
      box.style.width = design + 'px';
      const s = Math.min(1, avail / design);
      box.style.transform = 'scale(' + s + ')';
      const child = box.firstElementChild;
      const h = child ? child.offsetHeight : box.offsetHeight;
      wrap.style.height = (h * s) + 'px';
    }
    function fit() { fits.forEach(fitOne); }

    let ro = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver((es) => { es.forEach((e) => fitOne(e.target.firstElementChild)); measureSoon(); });
      fits.forEach((box) => ro.observe(box.parentElement));
    }

    /* ---- particle dot streams ---- */
    const PALETTE = [[255, 0, 140], [134, 43, 244], [92, 116, 255], [6, 191, 255], [0, 231, 255]];
    let W = 0, H = 0, dpr = 1, segs = [], parts = [], raf = null;
    const rand = (a, b) => a + Math.random() * (b - a);

    function rel(el) {
      const f = flow.getBoundingClientRect(), r = el.getBoundingClientRect();
      return { l: r.left - f.left, r: r.right - f.left, t: r.top - f.top, b: r.bottom - f.top,
        cx: r.left - f.left + r.width / 2, cy: r.top - f.top + r.height / 2 };
    }
    function measure() {
      if (getComputedStyle(canvas).display === 'none') { stop(); return; }
      const f = flow.getBoundingClientRect();
      W = f.width; H = f.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const guest = section.querySelector('.ae__panel--guest .cluster');
      const data = section.querySelector('.blocks');
      const merge = section.querySelector('.merge__node');
      const dash = section.querySelector('.ae__panel--hotel .dash');
      if (!guest || !data || !merge || !dash) { segs = []; parts = []; return; }
      const g = rel(guest), d = rel(data), m = rel(merge), h = rel(dash);
      segs = [
        { a: { x: g.r - 6, y: d.cy }, b: { x: d.l - 4, y: d.cy }, spread: (d.b - d.t) * 0.34 },
        { a: { x: d.r + 4, y: d.cy }, b: { x: m.cx, y: m.cy }, spread: 26 },
        { a: { x: m.cx, y: m.cy }, b: { x: h.l - 4, y: h.cy }, spread: (h.b - h.t) * 0.16 },
      ];
      const lens = segs.map((s) => Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y));
      const total = lens.reduce((a, b) => a + b, 0) || 1;
      const N = Math.round(Math.min(110, Math.max(60, W / 11)));
      parts = [];
      for (let i = 0; i < N; i++) {
        let r = Math.random() * total, si = 0;
        while (si < lens.length - 1 && r > lens[si]) { r -= lens[si]; si++; }
        parts.push(spawn(si, Math.random()));
      }
    }
    function spawn(si, t) {
      return { si, t, sp: rand(0.0026, 0.0072), off: rand(-1, 1), size: rand(1.3, 3.4), col: PALETTE[(Math.random() * PALETTE.length) | 0] };
    }
    function draw(p) {
      const s = segs[p.si]; if (!s) return;
      const dx = s.b.x - s.a.x, dy = s.b.y - s.a.y, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const bow = Math.sin(p.t * Math.PI) * s.spread * p.off;
      const x = s.a.x + dx * p.t + nx * bow;
      const y = s.a.y + dy * p.t + ny * bow;
      const a = Math.sin(p.t * Math.PI) * 0.9;
      ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.col[0] + ',' + p.col[1] + ',' + p.col[2] + ',' + a.toFixed(3) + ')';
      ctx.fill();
    }
    function frame() {
      if (cancelled) return;
      if (!segs.length) measure();
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) { p.t += p.sp; if (p.t >= 1) Object.assign(p, spawn(p.si, 0)); draw(p); }
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (cancelled) return;
      if (getComputedStyle(canvas).display === 'none') { stop(); return; }
      measure();
      ctx.clearRect(0, 0, W, H); for (const p of parts) draw(p); // immediate static frame
      if (reduce) return;
      if (raf) return;
      raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
    let mt; function measureSoon() { clearTimeout(mt); mt = addT(start, 120); }

    /* ---- reveal ---- */
    const revealEls = [...section.querySelectorAll('.reveal')];
    let revIO = null;
    if (!reduce && document.visibilityState === 'visible') {
      section.classList.add('ae--anim');
      revIO = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); }
      }), { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
      revealEls.forEach((el, i) => { el.style.transitionDelay = (Math.min(i, 9) * 0.045) + 's'; revIO.observe(el); });
      addT(() => revealEls.forEach((el) => el.classList.add('in')), 1600);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') revealEls.forEach((el) => el.classList.add('in'));
      else { fit(); stop(); start(); }
    }, sig);

    /* ---- visibility-gated animation ---- */
    const io2 = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { fit(); start(); } else stop();
    }), { threshold: 0.04 });
    io2.observe(flow);

    let rt;
    function onResize() { clearTimeout(rt); rt = addT(() => { fit(); start(); }, 90); }
    window.addEventListener('resize', onResize, sig);

    function boot() { fit(); start(); addT(() => { fit(); start(); }, 700); addT(start, 1800); }
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(() => { if (!cancelled) boot(); }); addT(boot, 400); }
    else boot();

    return () => {
      cancelled = true;
      ac.abort();
      io2.disconnect();
      if (revIO) revIO.disconnect();
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`ae ${className}`.trim()} style={{ '--ae-nav': navHeight }} data-screen-label="Así empieza todo">

      <div className="ae__seam" aria-hidden="true">
        <span className="ae__marker"><img src={logoSrc} alt="" />El recorrido Liiffe</span>
      </div>

      <div className="ae__deco" aria-hidden="true">
        <div className="ae__blob ae__blob--1"></div>
        <div className="ae__blob ae__blob--2"></div>
        <div className="ae__dots ae__dots--br"></div>
      </div>

      <div className="ae__inner">

        {/* Header */}
        <div className="ae__head">
          <h2 className="ae__title reveal">Así empieza <b>todo</b></h2>
        </div>

        {/* Flow */}
        <div className="ae__flow" ref={flowRef}>
          <canvas className="ae__particles" aria-hidden="true" ref={canvasRef}></canvas>

          {/* LEFT: guest experience (phones) */}
          <div className="ae__panel ae__panel--guest reveal">
            <div className="ae__point is-guest ae__panelLabel">
              <span className="ic"><Smartphone className={I} /></span>
              <p>Una <b>guía personalizada</b><br />para el <span className="g">huésped</span>.</p>
            </div>
            <div className="fitwrap">
              <div className="fitbox" data-fit="560">
                <div className="padbox">
                  <div className="cluster">

                    {/* Phone B — questionnaire chips */}
                    <div className="phone ph-b">
                      <div className="phone__notch"></div>
                      <div className="phone__screen"><div className="scr">
                        <div className="scr__status"><span>9:41</span><span className="r"><Wifi className={I} /><BatteryFull className={I} /></span></div>
                        <div className="scr__pad">
                          <div className="qz__step">Paso 2 de 5</div>
                          <div className="qz__q">¿Qué te mueve a viajar?</div>
                          <div className="qz__chips">
                            {CHIPS.map((c) => <span className={`chip${c.on ? ' is-on' : ''}`} key={c.t}>{c.t}</span>)}
                          </div>
                        </div>
                        <div className="qz__prog" style={{ '--p': '40%' }}></div>
                        <div className="scr__btn">Continuar</div>
                      </div></div>
                    </div>

                    {/* Phone C — preferences toggles */}
                    <div className="phone ph-c">
                      <div className="phone__notch"></div>
                      <div className="phone__screen"><div className="scr">
                        <div className="scr__status"><span>9:41</span><span className="r"><Wifi className={I} /><BatteryFull className={I} /></span></div>
                        <div className="scr__pad">
                          <div className="qz__step">Tus preferencias</div>
                          <div className="qz__q">Ajusta tu estancia</div>
                          <div style={{ marginTop: '8px' }}>
                            {TOGGLES.map(({ Icon, t, on }) => (
                              <div className="tg" key={t}>
                                <span className="tg__l"><Icon className={I} />{t}</span>
                                <span className={`sw${on ? ' is-on' : ''}`}></span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="scr__btn">Continuar</div>
                      </div></div>
                    </div>

                    {/* Phone A — guide / explore */}
                    <div className="phone ph-a">
                      <div className="phone__notch"></div>
                      <div className="phone__screen"><div className="scr">
                        <div className="scr__status"><span>9:41</span><span className="r"><Wifi className={I} /><BatteryFull className={I} /></span></div>
                        <div className="scr__app">
                          <img src={logoSrc} alt="" />
                          <div><div className="tt">Liiffe</div><div className="ss">Planifica menos, vive más.</div></div>
                          <span className="scr__lang">ES<ChevronDown className={I} /></span>
                        </div>
                        <div className="scr__h1">Encuentra una guía para viajar como un local.</div>
                        <div className="scr__search"><Search className={I} />Busca tu destino</div>
                        <div className="scr__lbl">Visto recientemente</div>
                        <div className="scr__cards">
                          <div className="gcard">
                            <div className="gcard__img" style={{ background: 'linear-gradient(135deg,#5C74FF,#06BFFF)' }}><span className="fav"><Heart className={I} /></span></div>
                            <div className="gcard__t">Zen y Salud</div>
                            <div className="gcard__m"><span><MapPin className={I} />Madrid</span><span><Calendar className={I} />3d</span></div>
                          </div>
                          <div className="gcard">
                            <div className="gcard__img" style={{ background: 'linear-gradient(135deg,#FF008C,#862BF4)' }}><span className="fav"><Heart className={I} /></span></div>
                            <div className="gcard__t">Pasión Otaku</div>
                            <div className="gcard__m"><span><MapPin className={I} />Madrid</span><span><Calendar className={I} />3d</span></div>
                          </div>
                        </div>
                        <div className="scr__tabs">
                          {TABS.map(({ Icon, t, on }) => (
                            <span className={`scr__tab${on ? ' is-on' : ''}`} key={t}><Icon className={I} />{t}</span>
                          ))}
                        </div>
                      </div></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: data blocks */}
          <div className="ae__col--data reveal">
            <div className="blocks">
              {BLOCKS.map(({ Icon, label, c }) => (
                <div className="block" style={{ '--c': c }} key={label}>
                  <span className="block__ic"><Icon className={I} /></span>
                  <span className="block__t">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MERGE node */}
          <div className="ae__merge reveal">
            <div className="merge__node"><img src={logoSrc} alt="Liiffe" style={{ background: '#1F2C49', padding: '8px', borderRadius: '24px' }} />
            </div>
          </div>

          {/* RIGHT: hotel intelligence dashboard */}
          <div className="ae__panel ae__panel--hotel reveal">
            <div className="ae__point is-hotel ae__panelLabel">
              <span className="ic"><TrendingUp className={I} /></span>
              <p><b>Información valiosa</b><br />para el <span className="h">hotel</span>.</p>
            </div>

            <div className="fitwrap">
  <div className="fitbox" data-fit="680">
    <div className="padbox">
      <div className="dash" style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
        
       {/* COLUMN 1: nav sidebar */}
<div className="dash__nav" style={{ gridColumn: '1' }}>
  {NAV.map(({ Icon, label, on }) => (
    <span className={`dnav${on ? ' is-on' : ''}`} key={label}>
      <Icon className={I} />{label}
    </span>
  ))}
</div>

        {/* COLUMN 2: main content */}
        <div className="dash__body" style={{ minWidth: 0, gridColumn: '2' }}>
          <div className="dash__top">
            <img src={logoSrc} alt="" />
            <span className="nm">Liiffe</span>
            <span className="dash__hotel">Hotel Liiffe<ChevronDown className={I} /></span>
            <span className="dash__av"></span>
          </div>
          <div className="dash__main">
            <h3 className="dash__h">Resumen general</h3>
            <div className="kpis">
              {KPIS.map((k) => (
                <div className="kpi" key={k.l}>
                  <div className="kpi__l">{k.l}</div>
                  <div className="kpi__v">{k.v}</div>
                  <div className="kpi__d"><ArrowUp className={I} />{k.d}</div>
                </div>
              ))}
            </div>
            <div className="dgrid">
              <div className="panel">
                <h4 className="panel__t">Preferencias principales</h4>
                <div className="donutrow">
                  <div className="donut"></div>
                  <div className="legend">
                    {LEGEND.map((g) => (
                      <div key={g.l}><span className="sw2" style={{ background: g.c }}></span>{g.l}<span className="pc">{g.p}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel">
                <h4 className="panel__t">Motivo del viaje</h4>
                <div className="bars">
                  {BARS.map((b) => (
                    <div className="bar" key={b.l}>
                      <div className="bar__top"><span>{b.l}</span><b>{b.p}%</b></div>
                      <div className="bar__track"><div className="bar__fill" style={{ width: `${b.p}%` }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="dgrid dgrid--2">
              <div className="panel">
                <h4 className="panel__t">Evolución de interacciones</h4>
                <svg className="spark" viewBox="0 0 240 78" preserveAspectRatio="none">
                  <defs><linearGradient id="ae-spark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#862BF4" stopOpacity="0.22" /><stop offset="1" stopColor="#862BF4" stopOpacity="0" /></linearGradient></defs>
                  <polyline points="0,60 34,52 68,55 102,40 136,44 170,26 204,30 240,12" fill="none" stroke="#862BF4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polygon points="0,60 34,52 68,55 102,40 136,44 170,26 204,30 240,12 240,78 0,78" fill="url(#ae-spark)" />
                </svg>
              </div>
              <div className="panel">
                <h4 className="panel__t">Actividad reciente</h4>
                <div className="acts">
                  {ACTS.map(({ Icon, t, time }) => (
                    <div className="act" key={t}>
                      <span className="act__ic"><Icon className={I} /></span>
                      <span className="act__t">{t}</span>
                      <span className="act__time">{time}</span>
                    </div>
                  ))}
                </div>
                <div className="dash__more">Ver todas las actividades<ChevronRight className={I} /></div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
          </div>

        </div>

        {/* Bottom banner */}
        <div className="ae__banner reveal">
          <span className="bic"><UserRoundCheck className={I} /></span>
          <p>Cada interacción <span className="g">mejora la experiencia</span> del huésped y <span className="h">aumenta el conocimiento</span> que tienes sobre él.</p>
        </div>

      </div>
    </section>
  );
}