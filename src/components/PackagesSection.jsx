'use client'

'use client';

import React, { useEffect, useRef } from 'react';
import {
  UserRound, Brain, Gem, Share2,
  Star, BarChart3, Users, TrendingUp,
} from 'lucide-react';

/**
 * PaquetesSection — Liiffe "Cuatro paquetes. Todo el valor." section.
 *
 * The four product packages (Experience · Intelligence · Studio · Connect) with
 * their illustrations, plus the four business-benefit chips beneath.
 * Self-contained: ships its own scoped CSS (injected once) and renders icons via
 * `lucide-react`. Drop it anywhere in a Next.js app (it's a client component):
 *
 *   import PaquetesSection from '@/components/PaquetesSection';
 *   <PaquetesSection
 *     logoSrc="/liiffe-isotipo.png"
 *     experienceSrc="/paquete-experience.png"
 *     intelligenceSrc="/paquete-intelligence.png"
 *     studioSrc="/paquete-studio.png"
 *     connectSrc="/paquete-connect.png"
 *   />
 *
 * Requirements:
 *   npm i lucide-react
 *   Put the Liiffe isotipo + the four package illustrations in /public.
 *
 * Props:
 *   logoSrc          URL for the Liiffe isotipo tile (default "/liiffe-isotipo.png").
 *   experienceSrc    illustration for the Experience card. Omit to show a placeholder.
 *   intelligenceSrc  illustration for the Intelligence card.
 *   studioSrc        illustration for the Studio card.
 *   connectSrc       illustration for the Connect card.
 *   className         extra class(es) appended to the <section>.
 *   id                id for the <section> (default "pk").
 *
 * Fonts: this pulls Geist from Google Fonts (a free near-match to ABC Diatype).
 * If you self-host fonts (e.g. next/font), delete the @import at the top of CSS.
 */

const PACKAGES = [
  {
    key: 'exp', Icon: UserRound, name: 'Experience', sub: 'Experiencia huésped',
    alt: 'App del huésped',
    cap: (<>La guía digital que <b>mejora cada paso</b> de la estancia.</>),
  },
  {
    key: 'intel', Icon: Brain, name: 'Intelligence', sub: 'Datos e inteligencia',
    alt: 'Dashboard de datos',
    cap: (<>Convierte los datos en <b>decisiones</b> y maximiza tu <b>rendimiento</b>.</>),
  },
  {
    key: 'studio', Icon: Gem, name: 'Studio', sub: 'Marca y personalización',
    alt: 'Editor de marca',
    cap: (<>Personaliza la experiencia y refuerza <b>tu marca</b>.</>),
  },
  {
    key: 'connect', Icon: Share2, name: 'Connect', sub: 'Integración total',
    alt: 'Ecosistema conectado',
    cap: (<>Conecta todo tu ecosistema y <span className="grad">multiplica el valor</span>.</>),
  },
];

const BENEFITS = [
  { key: 'exp', Icon: Star, txt: (<>Mejora la <b>experiencia</b> y aumenta la <b>satisfacción</b>.</>) },
  { key: 'intel', Icon: BarChart3, txt: (<>Optimiza la <b>operación</b> e impulsa tus <b>resultados</b>.</>) },
  { key: 'studio', Icon: Users, txt: (<>Personaliza la experiencia y crea <b>relaciones más sólidas</b>.</>) },
  { key: 'connect', Icon: TrendingUp, txt: (<>Genera más <b>ingresos</b> y amplía tu <b>crecimiento</b>.</>) },
];

/* ───────────────────────── styles (scoped under .pk) ───────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap');

.pk {
  /* design tokens (subset of the Liiffe design system) */
  --exp:#E62E6F; --intel:#2C7BE0; --studio:#7A2BE2; --navy:#1B2C4E; --sub:#5E6E8C;
  --grad-corp-1: linear-gradient(90deg, #FF008C 0%, #06BFFF 100%);
  --font-sans: 'Geist', system-ui, -apple-system, 'Segoe UI', sans-serif;

  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(165deg, #FAFBFE 0%, #F4F6FB 55%, #EFF2F8 100%);
  color: var(--navy);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  padding: clamp(26px, 4.4vh, 52px) clamp(18px, 3vw, 52px);
}
.pk *, .pk *::before, .pk *::after { box-sizing: border-box; }
.pk__inner { width: 100%; max-width: 1240px; }

/* ---------- HEADER ---------- */
.pk__head { display: flex; align-items: center; gap: clamp(16px, 3vw, 40px); margin-bottom: clamp(20px, 3.4vh, 38px); }
.pk .brand { flex: 0 0 auto; display: inline-flex; align-items: center; gap: clamp(10px,.9vw,14px); }
.pk .brand__mark { height: clamp(40px, 3.6vw, 52px); width: auto; display: block; transform-origin: center;
  border-radius: 22%; filter: drop-shadow(0 6px 16px rgba(31,44,73,.22)); }
.pk--anim .brand__mark { animation: pkFloat 4.2s ease-in-out infinite; }
@keyframes pkFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
.pk .brand__name { font-size: clamp(22px, 2vw, 28px); font-weight: 700; letter-spacing: -0.02em; color: #15233F; line-height: 1; }
.pk .brand__tag  { margin-top: 4px; font-size: clamp(8px, .7vw, 9.5px); font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  background: var(--grad-corp-1); background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.pk--anim .brand__tag { animation: pkPan 6s ease-in-out infinite alternate; }
.pk__titles { flex: 1 1 auto; text-align: center; }
.pk__title { margin: 0; font-weight: 800; font-size: clamp(26px, 3.5vw, 46px); line-height: 1.02; letter-spacing: -0.03em; color: #15233F; }
.pk__title .grad { background: var(--grad-corp-1); background-size: 220% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent; }
.pk--anim .pk__title .grad { animation: pkPan 6s ease-in-out infinite alternate; }
@keyframes pkPan { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
.pk__sub { margin: clamp(8px,1.1vh,13px) 0 0; font-size: clamp(13px, 1.35vw, 18px); font-weight: 400; color: var(--sub); }
.pk__rule { width: 46px; height: 3px; border-radius: 3px; background: var(--grad-corp-1); margin: clamp(8px,1.1vh,12px) auto 0; }

/* ---------- MAIN GRID ---------- */
.pk__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.4vw, 20px); align-items: stretch; }

.pk .card {
  --c: var(--exp); --tint:#FCE4EF;
  position: relative; display: flex; flex-direction: column;
  background: #fff; border: 1px solid #ECEFF4; border-radius: 18px;
  padding: clamp(13px,1.3vw,18px) clamp(12px,1.1vw,16px) clamp(15px,1.5vw,20px);
  box-shadow: 0 1px 2px rgba(20,30,55,.04), 0 12px 30px rgba(20,30,55,.05);
  transition: transform .35s cubic-bezier(.22,.61,.36,1), box-shadow .35s ease, border-color .35s ease;
}
.pk .card:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--c) 35%, #ECEFF4);
  box-shadow: 0 2px 4px rgba(20,30,55,.05), 0 22px 44px color-mix(in srgb, var(--c) 16%, rgba(20,30,55,.10)); }
.card__head { display: flex; align-items: center; gap: 10px; }
.card__ic { flex: 0 0 auto; width: clamp(40px,3.4vw,50px); height: clamp(40px,3.4vw,50px); border-radius: 14px; display: grid; place-items: center; background: var(--tint); color: var(--c);
  transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
.pk .card:hover .card__ic { transform: scale(1.08) rotate(-3deg); }
.card__ic svg { width: 58%; height: 58%; }
.card__name { font-size: clamp(13px,1.25vw,16px); font-weight: 800; letter-spacing: .03em; text-transform: uppercase; color: var(--c); line-height: 1.05; }
.card__sub  { margin-top: 3px; font-size: clamp(10.5px,1vw,12.5px); font-weight: 500; color: var(--navy); }

.stage { position: relative; margin: clamp(10px,1.2vw,15px) 0 clamp(11px,1.3vw,16px); aspect-ratio: 200 / 130; background: #fff; border-radius: 12px; overflow: hidden; }
.stage img { width: 100%; height: 100%; object-fit: contain; display: block; transition: transform .5s cubic-bezier(.22,.61,.36,1); }
.pk .card:hover .stage img { transform: scale(1.045); }
.stage__ph { width: 100%; height: 100%; display: grid; place-items: center; text-align: center; padding: 0 14px;
  background: repeating-linear-gradient(45deg, #ECEEF5 0 9px, #F6F6F9 9px 18px);
  color: #6B7387; font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 11px; letter-spacing: .04em; text-transform: uppercase; }

.card__cap { margin: auto 0 0; text-align: center; font-size: clamp(11.5px,1.15vw,14px); line-height: 1.5; font-weight: 500; color: var(--navy); text-wrap: balance; }
.card__cap b { font-weight: 700; color: var(--c); }
.card__cap .grad { font-weight: 700; background: var(--grad-corp-1); -webkit-background-clip: text; background-clip: text; color: transparent; }

.pk .card--exp     { --c: #E62E6F; --tint:#FCE3EE; }
.pk .card--intel   { --c: #2C7BE0; --tint:#E3F0FD; }
.pk .card--studio  { --c: #7A2BE2; --tint:#ECE2FB; }
.pk .card--connect { --c: #1B2C4E; --tint:#E9ECF3; }



/* ---------- BENEFITS ---------- */
.pk__benefits { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(12px, 1.4vw, 20px); margin-top: clamp(12px, 1.4vw, 20px); }
.pk .ben { --c: var(--exp); display: flex; align-items: center; gap: clamp(11px,1vw,15px);
  background: #F2F6FB; border: 1px solid #E7ECF3; border-radius: 16px;
  padding: clamp(12px,1.2vw,17px) clamp(13px,1.3vw,19px); }
.ben__ic { flex: 0 0 auto; width: clamp(40px,3vw,48px); height: clamp(40px,3vw,48px); border-radius: 50%; display: grid; place-items: center; background: var(--c); color: #fff; box-shadow: 0 7px 16px var(--sh);
  transition: transform .35s cubic-bezier(.34,1.56,.64,1); }
.pk .ben:hover .ben__ic { transform: scale(1.1) rotate(6deg); }
.ben__ic svg { width: 46%; height: 46%; }
.ben__txt { font-size: clamp(11px,1.1vw,13.5px); line-height: 1.4; font-weight: 500; color: var(--navy); text-wrap: pretty; }
.ben__txt b { font-weight: 700; color: var(--c); }
.pk .ben--exp     { --c: var(--exp);    --sh: rgba(230,46,111,.30); }
.pk .ben--intel   { --c: var(--intel);  --sh: rgba(44,123,224,.30); }
.pk .ben--studio  { --c: var(--studio); --sh: rgba(122,43,226,.30); }
.pk .ben--connect { --c: var(--navy);   --sh: rgba(27,44,78,.26); }

/* ---------- reveal ---------- */
.pk--anim .reveal { opacity: 0; transform: translateY(16px); transition: opacity .55s ease, transform .55s cubic-bezier(.22,.61,.36,1); }
.pk--anim .reveal.in { opacity: 1; transform: none; }

/* ---------- responsive ---------- */
@media (max-width: 860px) {
  .pk { align-items: flex-start; }
  .pk__head { flex-wrap: wrap; }
  .pk__grid, .pk__benefits { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 520px) { .pk__grid, .pk__benefits { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .pk--anim .reveal { opacity: 1; transform: none; transition: none; }
  .pk--anim .brand__mark, .pk--anim .brand__tag, .pk--anim .pk__title .grad { animation: none; }
}
@media print { .pk--anim .reveal { opacity: 1 !important; transform: none !important; } }

/* ---------- mobile carousel ---------- */
.pk__carousel-wrap { display: none; }
@media (max-width: 860px) {
  .pk__grid, .pk__benefits { display: none; }
  .pk__carousel-wrap { display: block; }
  .pk__carousel { overflow: hidden; border-radius: 18px; margin-bottom: 12px; }
  .pk__carousel-track { display: flex; transition: transform 0.35s cubic-bezier(.22,.61,.36,1); }
  .pk__carousel-track .card { min-width: 100%; margin: 0; }
  .pk__carousel-track .ben { min-width: 100%; border-radius: 16px; }
  .pk__dots { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
  .pk__dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(27,44,78,0.2); cursor: pointer; transition: width 0.3s, background 0.3s, border-radius 0.3s; }
  .pk__dot.active { width: 24px; border-radius: 4px; background: linear-gradient(90deg, #FF008C, #06BFFF); }
}
`;

let stylesInjected = false;
function usePkStyles() {
  useEffect(() => {
    if (stylesInjected || document.getElementById('pk-styles')) { stylesInjected = true; return; }
    stylesInjected = true;
    const el = document.createElement('style');
    el.id = 'pk-styles';
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

export default function PackagesSection({
  logoSrc = '/logo.svg',
  experienceSrc,
  intelligenceSrc,
  studioSrc,
  connectSrc,
  className = '',
  id = 'paquetes',
}) {
  usePkStyles();
  const sectionRef = useRef(null);
  const [active, setActive] = React.useState(0);

  const handleTouchStart = (e) => {
    e.currentTarget.dataset.startX = String(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    const diff = Number(e.currentTarget.dataset.startX) - e.changedTouches[0].clientX;
    if (diff > 50 && active < PACKAGES.length - 1) setActive(active + 1);
    if (diff < -50 && active > 0) setActive(active - 1);
  };

  const srcByKey = {
    exp: experienceSrc,
    intel: intelligenceSrc,
    studio: studioSrc,
    connect: connectSrc,
  };

  /* scroll-reveal (with reduced-motion + background-tab fallbacks) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = [...section.querySelectorAll('.reveal')];
    if (reduce || document.visibilityState !== 'visible') return undefined;

    section.classList.add('pk--anim');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach((el) => io.observe(el));

    const fallback = setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 1600);
    const onVis = () => { if (document.visibilityState !== 'visible') revealEls.forEach((el) => el.classList.add('in')); };
    document.addEventListener('visibilitychange', onVis);

    return () => { io.disconnect(); clearTimeout(fallback); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`pk ${className}`.trim()} data-screen-label="Cuatro paquetes">
      <div className="pk__inner">

        {/* ============ HEADER ============ */}
        <header className="pk__head">
          <div className="brand reveal">
            <img className="brand__mark" src={logoSrc} alt="Liiffe" />
            <div>
              <div className="brand__name">Liiffe</div>
              <div className="brand__tag">Data Guest Intelligence</div>
            </div>
          </div>
          <div className="pk__titles reveal">
            <h2 className="pk__title">Cuatro paquetes. Todo el <span className="grad">valor.</span></h2>
            <p className="pk__sub">Elige la solución que mejor se adapta a tu estrategia y crece contigo.</p>
            <div className="pk__rule"></div>
          </div>
        </header>

        {/* ============ MAIN CARDS ============ */}
        <div className="pk__grid">
          {PACKAGES.map((p, i) => {
            const src = srcByKey[p.key];
            return (
              <article
                className={`card card--${p.key} reveal`}
                style={{ transitionDelay: `${0.06 * (i + 1)}s` }}
                data-screen-label={p.name}
                key={p.key}
              >
                <div className="card__head">
                  <span className="card__ic"><p.Icon strokeWidth={1.7} /></span>
                  <span>
                    <span className="card__name">{p.name}</span>
                    <div className="card__sub">{p.sub}</div>
                  </span>
                </div>
                <div className="stage">
                  {src
                    ? <img src={src} alt={p.alt} />
                    : <div className="stage__ph"><span>{p.alt}</span></div>}
                </div>
                <p className="card__cap">{p.cap}</p>
              </article>
            );
          })}
        </div>

        {/* ============ BENEFITS ============ */}
        <div className="pk__benefits">
          {BENEFITS.map((b, i) => (
            <div
              className={`ben ben--${b.key} reveal`}
              style={{ transitionDelay: `${0.3 + 0.06 * (i + 1)}s` }}
              key={b.key}
            >
              <span className="ben__ic"><b.Icon strokeWidth={2} /></span>
              <p className="ben__txt">{b.txt}</p>
            </div>
          ))}
        </div>

        {/* ============ MOBILE CAROUSEL ============ */}
        <div className="pk__carousel-wrap">
          <div
            className="pk__carousel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="pk__carousel-track"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {PACKAGES.map((p) => {
                const src = srcByKey[p.key];
                return (
                  <article className={`card card--${p.key}`} key={p.key}>
                    <div className="card__head">
                      <span className="card__ic"><p.Icon strokeWidth={1.7} /></span>
                      <span>
                        <span className="card__name">{p.name}</span>
                        <div className="card__sub">{p.sub}</div>
                      </span>
                    </div>
                    <div className="stage">
                      {src
                        ? <img src={src} alt={p.alt} />
                        : <div className="stage__ph"><span>{p.alt}</span></div>}
                    </div>
                    <p className="card__cap">{p.cap}</p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Benefit for active card */}
          <div className="pk__carousel" style={{ marginTop: 12 }}>
            <div
              className="pk__carousel-track"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {BENEFITS.map((b) => (
                <div className={`ben ben--${b.key}`} key={b.key}>
                  <span className="ben__ic"><b.Icon strokeWidth={2} /></span>
                  <p className="ben__txt">{b.txt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="pk__dots">
            {PACKAGES.map((_, i) => (
              <div
                key={i}
                className={`pk__dot${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}