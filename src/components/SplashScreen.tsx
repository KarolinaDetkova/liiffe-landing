'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Start fade out after 1.7s, fully gone at 2s
    const fadeTimer = setTimeout(() => setFading(true), 1700)
    const hideTimer = setTimeout(() => setVisible(false), 2200)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div className={`splash ${fading ? 'splash--out' : ''}`}>
      <div className="splash-logo">
        <Image
          src="/logo.svg"
          alt="Liiffe"
          width={64}
          height={77}
          priority
        />
        <span className="splash-brand">liiffe</span>
      </div>
    </div>
  )
}