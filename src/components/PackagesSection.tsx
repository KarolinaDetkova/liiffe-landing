'use client'

import Image from 'next/image'
import { useRef, MouseEvent } from 'react'

function TiltCard({ children, className }: { children: React.ReactNode, className: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -15
    const rotateY = ((x - centerX) / centerX) * 15
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={cardRef}
      className={`pkg-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease' }}
    >
      {children}
    </div>
  )
}

function ExperienceMockup() {
  return (
    <div className="pkg-mockup" style={{
      background: 'linear-gradient(135deg,#fce4f0,#f9d0e8)',
      flexDirection: 'column',
      gap: 6
    }}>
      <div style={{ display: 'flex', gap: 8, padding: 12 }}>
        <div style={{
          background: '#fff', borderRadius: 8, padding: '8px 12px',
          fontSize: 11, fontWeight: 700, color: '#e91e8c',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>🏨 Check-in</div>
        <div style={{
          background: '#fff', borderRadius: 8, padding: '8px 12px',
          fontSize: 11, fontWeight: 700, color: '#e91e8c',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>🍽️ F&B</div>
      </div>
      <div style={{ fontSize: 11, color: '#e91e8c', fontWeight: 600 }}>Guest Journey Digital</div>
    </div>
  )
}

function IntelligenceMockup() {
  const bars = [40, 55, 30, 65, 50]
  return (
    <div className="pkg-mockup" style={{
      background: 'linear-gradient(135deg,#e0f7fa,#b2ebf2)',
      flexDirection: 'column',
      gap: 4,
      padding: 12
    }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            width: 20, height: h,
            background: i % 2 === 0 ? '#00b4d8' : '#0097a7',
            borderRadius: 3
          }} />
        ))}
      </div>
      <div style={{ fontSize: 10, color: '#00b4d8', fontWeight: 700 }}>+18% Revenue YTD</div>
    </div>
  )
}

function StudioMockup() {
  return (
    <div className="pkg-mockup" style={{
      background: 'linear-gradient(135deg,#f3e5f5,#e1bee7)',
      flexDirection: 'column',
      gap: 6,
      padding: 12
    }}>
      <div style={{
        background: '#fff', borderRadius: 8, padding: '8px 14px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        display: 'flex', alignItems: 'center', gap: 8
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: 6,
          background: 'linear-gradient(135deg,#e91e8c,#7b2d8b)'
        }} />
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#7b2d8b' }}>Tu marca</div>
          <div style={{ fontSize: 9, color: '#999' }}>Aa</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: '#7b2d8b', fontWeight: 600 }}>White-label completo</div>
    </div>
  )
}

function ConnectMockup() {
  return (
    <div className="pkg-mockup" style={{
      background: 'linear-gradient(135deg,#e8eaf6,#c5cae9)',
      flexDirection: 'column',
      gap: 6,
      padding: 12
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        {['🏨', '☁️', '📊', '🔌'].map((icon) => (
          <div key={icon} style={{
            background: '#fff', borderRadius: 6, padding: 6,
            textAlign: 'center', fontSize: 18
          }}>{icon}</div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: '#1a2340', fontWeight: 600 }}>+50 integraciones</div>
    </div>
  )
}

const packages = [
  {
    cardClass: 'pkg-experience',
    icon: '🌟',
    name: 'EXPERIENCE',
    sub: 'Experiencia huésped',
    mockup: <ExperienceMockup />,
    desc: <>La guía digital que <strong>mejora cada paso</strong> de la estancia.</>,
    badge: 'Mejora la experiencia y aumenta la satisfacción.',
    accent: '#e91e8c',
  },
  {
    cardClass: 'pkg-intelligence',
    icon: '🧠',
    name: 'INTELLIGENCE',
    sub: 'Datos e inteligencia',
    mockup: <IntelligenceMockup />,
    desc: <>Convierte los datos en <strong>decisiones y maximiza tu rendimiento.</strong></>,
    badge: 'Optimiza la operación e impulsa tus resultados.',
    accent: '#00b4d8',
  },
  {
    cardClass: 'pkg-studio',
    icon: '🎨',
    name: 'STUDIO',
    sub: 'Marca y personalización',
    mockup: <StudioMockup />,
    desc: <>Personaliza la experiencia y <strong>refuerza tu marca.</strong></>,
    badge: 'Personaliza la experiencia y crea relaciones más sólidas.',
    accent: '#c084fc',
  },
  {
    cardClass: 'pkg-connect',
    icon: '🔗',
    name: 'CONNECT',
    sub: 'Integración total',
    mockup: <ConnectMockup />,
    desc: <>Conecta todo tu ecosistema y <strong>multiplica el valor.</strong></>,
    badge: 'Genera más ingresos y amplía tu crecimiento.',
    accent: '#a78bfa',
  },
]

export default function PackagesSection() {
  return (
    <section className="section-packages" id="paquetes">
      <div className="packages-header">
        <Image src="/logo.svg" alt="Liiffe logo" width={40} height={48} style={{ objectFit: 'contain' }} />
        <h2>Cuatro paquetes. Todo el <span>valor.</span></h2>
      </div>
      <p className="packages-sub">Elige la solución que mejor se adapta a tu estrategia y crece con nosotros.</p>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <TiltCard key={pkg.name} className={pkg.cardClass}>
            <div className="pkg-accent-bar" style={{ background: pkg.accent }} />
            <div className="pkg-icon">{pkg.icon}</div>
            <div className="pkg-name">{pkg.name}</div>
            <div className="pkg-sub">{pkg.sub}</div>
            {pkg.mockup}
            <p className="pkg-desc">{pkg.desc}</p>
            <div className="pkg-badge">{pkg.badge}</div>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}