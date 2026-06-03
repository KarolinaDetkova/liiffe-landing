'use client'

import Image from 'next/image'
import { useState } from 'react'

const steps = [
  {
    icon: '📊',
    label: 'DATA',
    color: '#e91e8c',
    desc: 'Todos los datos de tus huéspedes en un solo lugar.',
    borderColor: '#e91e8c',
    bg: 'rgba(233,30,140,0.08)',
  },
  {
    icon: '🧠',
    label: 'INTELIGENCIA',
    color: '#7b2d8b',
    desc: 'Convertimos datos en información accionable para decidir mejor.',
    borderColor: '#7b2d8b',
    bg: 'rgba(123,45,139,0.08)',
  },
  {
    icon: '👤',
    label: 'PERSONALIZACIÓN',
    color: '#00b4d8',
    desc: 'Creamos experiencias únicas para cada huésped, en el momento perfecto.',
    borderColor: '#00b4d8',
    bg: 'rgba(0,180,216,0.08)',
  },
  {
    icon: '🌿',
    label: 'SOSTENIBILIDAD',
    color: '#27ae60',
    desc: 'Optimizamos recursos y operaciones para un hotel más eficiente y rentable.',
    borderColor: '#27ae60',
    bg: 'rgba(39,174,96,0.08)',
  },
]

const result = {
  icon: '📈',
  label: 'INGRESOS',
  color: '#e91e8c',
  desc: 'Más valor por huésped y mejores resultados para tu alojamiento.',
  borderColor: '#e91e8c',
  bg: 'rgba(233,30,140,0.08)',
}

const mobileCards = [...steps, result]

export default function ComboSection() {
  const [active, setActive] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    ;(e.currentTarget as HTMLElement).dataset.startX = String(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = Number((e.currentTarget as HTMLElement).dataset.startX)
    const diff = startX - e.changedTouches[0].clientX
    if (diff > 50 && active < mobileCards.length - 1) setActive(active + 1)
    if (diff < -50 && active > 0) setActive(active - 1)
  }

  return (
    <section className="section-combo" id="por-que-liiffe">

      {/* DESKTOP */}
      <div className="combo-desktop">
        <div className="combo-header">
          <h2 className="combo-heading">
            EL COMBO <span className="hl-pink">LIIFFE</span>
          </h2>
          <p className="combo-heading-sub">Nuestra fórmula para convertir datos en ingresos.</p>
        </div>

        <div className="combo-formula">
          {steps.map((s, i) => (
            <div key={s.label} className="combo-formula-group">
              <div className="combo-formula-circle" style={{ borderColor: s.borderColor, background: s.bg }}>
                <span className="combo-formula-icon">{s.icon}</span>
              </div>
              <div className="combo-formula-label" style={{ color: s.color }}>{s.label}</div>
              <div className="combo-formula-desc">{s.desc}</div>
              {i < steps.length - 1 && <div className="combo-formula-plus">+</div>}
            </div>
          ))}
          <div className="combo-formula-equals">=</div>
          <div className="combo-formula-group combo-formula-group--result">
            <div className="combo-formula-circle combo-formula-circle--result" style={{ borderColor: result.borderColor, background: result.bg }}>
              <span className="combo-formula-icon">{result.icon}</span>
            </div>
            <div className="combo-formula-label" style={{ color: result.color }}>{result.label}</div>
            <div className="combo-formula-desc">{result.desc}</div>
          </div>
        </div>

        {/* SVG bottom section */}
        <div className="combo-svg-wrap">
          <Image
            src="/Body.svg"
            alt="El Combo Liiffe — resultados"
            width={1400}
            height={501}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>

      {/* MOBILE */}
      <div className="combo-mobile">
        <h2 className="combo-mobile-title">
          EL COMBO <span className="hl-pink">LIIFFE</span>
        </h2>
        <div
          className="combo-carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="combo-carousel-track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {mobileCards.map((c) => (
              <div key={c.label} className="combo-carousel-card">
                <div className="combo-card-icon" style={{ background: c.bg, color: c.color }}>
                  {c.icon}
                </div>
                <div className="combo-card-title" style={{ color: c.color }}>{c.label}</div>
                <div className="combo-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="combo-dots">
          {mobileCards.map((_, i) => (
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
