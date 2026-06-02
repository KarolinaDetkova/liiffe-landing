'use client'

import Image from 'next/image'


export default function Navbar() {
  return (
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
      <ul className="nav-links">
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#huesped">Tu Huésped</a></li>
      <li><a href="#por-que-liiffe">Por qué Liiffe</a></li>
      <li><a href="#paquetes">Paquetes</a></li>
      <li><a href="#soluciones">Soluciones</a></li>
    </ul>
      <button className="nav-cta">Solicitar demo</button>
    </nav>
  )
}
