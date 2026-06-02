import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Liiffe – Data Guest Intelligence',
  description: 'Convertimos datos del huésped en ingresos. Más de 300 alojamientos ya confían en Liiffe.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
