'use client'

import Image from 'next/image'
import { useState } from 'react'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#huesped', label: 'Tu Huésped' },
  { href: '#asi-empieza', label: 'Cómo funciona' },
  { href: '#por-que-liiffe', label: 'Por qué Liiffe' },
  { href: '#paquetes', label: 'Paquetes' },
  { href: '#soluciones', label: 'Soluciones' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => setOpen(false)

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Image src="/logo.svg" alt="Liiffe logo" width={44} height={53} style={{ objectFit: 'contain' }} />
          <div className="nav-logo-text">
            <span className="brand">liiffe</span>
            <span className="tagline">
              <span className="data">Data </span>
              <span className="guest">Guest </span>
              <span className="intelligence">Intelligence</span>
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button className="nav-cta nav-cta--desktop">Solicitar demo</button>

        {/* Mobile right side */}
        <div className="nav-mobile-right">
          <button className="nav-cta nav-cta--mobile">Solicitar demo</button>
          <button
            className={`nav-burger ${open ? 'nav-burger--open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div className={`nav-overlay ${open ? 'nav-overlay--open' : ''}`}>
        <ul className="nav-overlay-links">
          {links.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${i * 0.06}s` }}>
              <a href={l.href} onClick={handleLinkClick}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-overlay-cta" onClick={handleLinkClick}>
          Solicitar demo →
        </button>
      </div>
    </>
  )
}