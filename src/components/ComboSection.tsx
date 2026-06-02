'use client'

import Image from 'next/image'
import { useState } from 'react'

const results = [
  {
    icon: '📈',
    title: 'Incrementa el gasto por huésped',
    desc: 'Recomendaciones y ofertas personalizadas que aumentan el ticket medio.',
    color: '#e91e8c',
  },
  {
    icon: '🛒',
    title: 'Impulsa la venta de servicios',
    desc: 'Más reservas de restaurante, spa, actividades y experiencias.',
    color: '#00b4d8',
  },
  {
    icon: '⭐',
    title: 'Mejora la experiencia del huésped',
    desc: 'Información relevante en el momento adecuado para cada cliente.',
    color: '#a78bfa',
  },
  {
    icon: '🔄',
    title: 'Aumenta la fidelización y la repetición',
    desc: 'Los huéspedes vuelven cuando sienten que les conoces.',
    color: '#e91e8c',
  },
  {
    icon: '🔍',
    title: 'Obtén una visión 360° de tus huéspedes',
    desc: 'Toda la información centralizada, segmentada y accesible en tiempo real.',
    color: '#00b4d8',
  },
]

const steps = [
  { icon: '📊', label: 'DATA', color: '#e91e8c' },
  { icon: '👥', label: 'PERSONALIZACIÓN', color: '#7b2d8b' },
  { icon: '✨', label: 'EXPERIENCIA', color: '#00b4d8' },
  { icon: '🌿', label: 'SOSTENIBILIDAD', color: '#27ae60' },
  { icon: '📈', label: 'REVENUE', color: '#e91e8c' },
]

export default function ComboSection() {
  const [active, setActive] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    ;(e.currentTarget as HTMLElement).dataset.startX = String(touch.clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = Number((e.currentTarget as HTMLElement).dataset.startX)
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX
    if (diff > 50 && active < results.length - 1) setActive(active + 1)
    if (diff < -50 && active > 0) setActive(active - 1)
  }

  return (
    <section className="section-combo" id="por-que-liiffe">
      {/* DESKTOP: SVG */}
      <div className="combo-desktop">
        <Image
          src="/Body.svg"
          alt="El Combo Liiffe"
          width={1400}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* MOBILE: Simple layout */}
      <div className="combo-mobile">
        <h2 className="combo-mobile-title">
          EL COMBO <span className="hl-pink">LIIFFE</span>
        </h2>

        {/* Steps pills */}
        <div className="combo-steps-row">
          {steps.map((s, i) => (
            <div key={s.label} className="combo-step-pill" style={{ borderColor: s.color }}>
              <span>{s.icon}</span>
              <span style={{ color: s.color }}>{s.label}</span>
              {i < steps.length - 1 && <span className="combo-arrow">→</span>}
            </div>
          ))}
        </div>

        {/* Results carousel */}
        <h3 className="combo-results-title">
          Resultados que <span className="hl-pink">impactan</span> en tu negocio
        </h3>

        <div
          className="combo-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="combo-carousel-track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {results.map((r) => (
              <div key={r.title} className="combo-carousel-card">
                <div className="combo-card-icon" style={{ background: `${r.color}20`, color: r.color }}>
                  {r.icon}
                </div>
                <div className="combo-card-title">{r.title}</div>
                <div className="combo-card-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="combo-dots">
          {results.map((_, i) => (
            <div
              key={i}
              className={`combo-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}