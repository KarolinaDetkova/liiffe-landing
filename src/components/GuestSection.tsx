'use client'

import { useState } from 'react'

const sources = [
  { id: 'booking', label: 'Booking.com', sub: 'Expedia · Hotels', color: '#e91e8c', angle: 200 },
  { id: 'sitio', label: 'Sitio Web', sub: 'Direct traffic', color: '#a78bfa', angle: 230 },
  { id: 'otas1', label: 'OTA', sub: 'Kayak · TripAdvisor', color: '#00b4d8', angle: 260 },
  { id: 'otas2', label: 'GDS', sub: 'Sabre · Amadeus', color: '#a78bfa', angle: 290 },
  { id: 'social', label: 'Redes Sociales', sub: 'Instagram · TikTok', color: '#e91e8c', angle: 320 },
]

const outputs = [
  { id: 'email', label: 'Email Marketing', icon: '✉️', color: '#a78bfa', angle: 60 },
  { id: 'fidelizacion', label: 'Fidelización', icon: '🏆', color: '#e91e8c', angle: 100 },
  { id: 'encuestas', label: 'Encuestas', icon: '📋', color: '#00b4d8', angle: 140 },
  { id: 'reviews', label: 'Reviews', icon: '⭐', color: '#e91e8c', angle: 30 },
  { id: 'pms', label: 'Datos PMS', icon: '📊', color: '#a78bfa', angle: 170 },
]

const attrs = [
  { icon: '❤️', label: 'Intereses', bg: 'rgba(232,0,138,.2)', border: 'rgba(232,0,138,.4)' },
  { icon: '😋', label: 'Gustos', bg: 'rgba(251,191,36,.2)', border: 'rgba(251,191,36,.4)' },
  { icon: '⚙️', label: 'Preferencias', bg: 'rgba(34,197,94,.2)', border: 'rgba(34,197,94,.4)' },
  { icon: '👤', label: 'Perfil', bg: 'rgba(124,58,237,.2)', border: 'rgba(124,58,237,.4)' },
  { icon: '💸', label: 'Presupuesto', bg: 'rgba(59,130,246,.2)', border: 'rgba(59,130,246,.4)' },
  { icon: '📊', label: 'Comportamiento', bg: 'rgba(167,139,250,.2)', border: 'rgba(167,139,250,.4)' },
]

function polarToXY(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

const CX = 300
const CY = 300
const SOURCE_R = 220
const OUTPUT_R = 220

export default function GuestSection() {
  const [activeSource, setActiveSource] = useState<string | null>(null)

  const activeConnects = activeSource
    ? sources.find((s) => s.id === activeSource)?.connects ?? []
    : []

  return (
    <section className="section-guest-new" id="huesped">

      {/* LEFT TITLE */}
      <div className="guest-title-col">
        <h2 className="guest-title">
          CONOCES<br />
          <span className="hl-pink">REALMENTE</span><br />
          A TU<br />
          <span className="hl-purple">HUÉSPED</span>
        </h2>
        <p className="guest-subtitle">
          Cada dato cuenta una historia. Liiffe la entiende.
        </p>
      </div>

      {/* CENTER VISUALIZATION */}
      <div className="guest-viz">
        <svg viewBox="0 0 600 600" className="guest-svg">
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,180,216,0.3)"/>
              <stop offset="100%" stopColor="rgba(0,180,216,0)"/>
            </radialGradient>
          </defs>

          {/* Background glow */}
          <circle cx={CX} cy={CY} r="180" fill="url(#centerGlow)" />

          {/* Orbit rings */}
          <circle cx={CX} cy={CY} r="80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r="130" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="6 4"/>
          <circle cx={CX} cy={CY} r="180" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
          <circle cx={CX} cy={CY} r="230" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>

          {/* Source lines */}
          {sources.map((src) => {
            const pos = polarToXY(src.angle, SOURCE_R, CX, CY)
            const isActive = activeSource === src.id
            const isDimmed = activeSource && activeSource !== src.id
            return (
              <line
                key={src.id}
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                stroke={isActive ? src.color : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                style={{ transition: 'all 0.3s', opacity: isDimmed ? 0.1 : 1 }}
                filter={isActive ? 'url(#glow)' : undefined}
              />
            )
          })}

          {/* Output lines */}
          {outputs.map((out) => {
            const pos = polarToXY(out.angle, OUTPUT_R, CX, CY)
            const isActive = activeSource !== null
            return (
              <line
                key={out.id}
                x1={CX} y1={CY}
                x2={pos.x} y2={pos.y}
                stroke={isActive ? out.color : 'rgba(255,255,255,0.08)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                style={{ transition: 'all 0.3s', opacity: isActive ? 0.8 : 0.3 }}
                filter={isActive ? 'url(#glow)' : undefined}
              />
            )
          })}

          {/* Source nodes */}
          {sources.map((src) => {
            const pos = polarToXY(src.angle, SOURCE_R, CX, CY)
            const isActive = activeSource === src.id
            const isDimmed = activeSource && activeSource !== src.id
            return (
              <g
                key={src.id}
                style={{ cursor: 'pointer', opacity: isDimmed ? 0.2 : 1, transition: 'all 0.3s' }}
                onMouseEnter={() => setActiveSource(src.id)}
                onMouseLeave={() => setActiveSource(null)}
              >
                <circle
                  cx={pos.x} cy={pos.y} r={isActive ? 32 : 26}
                  fill={isActive ? `${src.color}33` : 'rgba(255,255,255,0.06)'}
                  stroke={isActive ? src.color : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: 'all 0.3s' }}
                  filter={isActive ? 'url(#glow)' : undefined}
                />
                <text
                  x={pos.x} y={pos.y - 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="Montserrat, sans-serif"
                >
                  {src.label}
                </text>
                <text
                  x={pos.x} y={pos.y + 8}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="8"
                  fontFamily="Montserrat, sans-serif"
                >
                  {src.sub}
                </text>
              </g>
            )
          })}

          {/* Output nodes */}
          {outputs.map((out) => {
            const pos = polarToXY(out.angle, OUTPUT_R, CX, CY)
            const isActive = activeSource !== null
            return (
              <g key={out.id} style={{ transition: 'all 0.3s', opacity: isActive ? 1 : 0.4 }}>
                <circle
                  cx={pos.x} cy={pos.y} r={isActive ? 28 : 22}
                  fill={isActive ? `${out.color}33` : 'rgba(255,255,255,0.06)'}
                  stroke={isActive ? out.color : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: 'all 0.3s' }}
                  filter={isActive ? 'url(#glow)' : undefined}
                />
                <text x={pos.x} y={pos.y + 2} textAnchor="middle" fontSize="16">{out.icon}</text>
                <text
                  x={pos.x} y={pos.y + 18}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.7)"
                  fontSize="8"
                  fontWeight="600"
                  fontFamily="Montserrat, sans-serif"
                >
                  {out.label}
                </text>
              </g>
            )
          })}

          {/* Center avatar */}
          <defs>
            <clipPath id="avatarClip">
              <circle cx={CX} cy={CY} r="100"/>
            </clipPath>
          </defs>
          <circle cx={CX} cy={CY} r="103"
            fill="none"
            stroke={activeSource ? '#00b4d8' : 'rgba(255,255,255,0.2)'}
            strokeWidth={activeSource ? 3 : 2}
            style={{ transition: 'all 0.3s' }}
            filter={activeSource ? 'url(#glow)' : undefined}
          />
          <image
            href="/user icon.jpg"
            x={CX - 100} y={CY - 100}
            width="200" height="200"
            clipPath="url(#avatarClip)"
            preserveAspectRatio="xMidYMid slice"
          />
          <text
            x={CX} y={CY + 88}
            textAnchor="middle"
            fill="rgba(255,255,255,0.6)"
            fontSize="11"
            fontWeight="800"
            fontFamily="Montserrat, sans-serif"
            letterSpacing="1"
          >
            TU HUÉSPED
          </text>
        </svg>
      </div>

      {/* RIGHT ATTRS PANEL */}
      <div className="guest-attrs-col">
        <div className="attrs-title">
          Lo que realmente<br/>
          <span className="hl-pink">importa conocer</span>
        </div>
        <div className="attrs-list">
          {attrs.map((a) => (
            <div
              key={a.label}
              className={`attr-item ${activeSource ? 'attr-active' : ''}`}
              style={{
                borderColor: activeSource ? a.border : 'rgba(255,255,255,0.08)',
                background: activeSource ? a.bg : 'rgba(255,255,255,0.04)',
              }}
            >
              <div className="attr-icon" style={{ background: a.bg }}>{a.icon}</div>
              <div className="attr-name">{a.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}