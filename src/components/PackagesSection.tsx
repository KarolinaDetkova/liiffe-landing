import Image from 'next/image'

export default function PackagesSection() {
  return (
    <section id="paquetes" style={{ width: '100%' }}>
      <Image
        src="/ref-packages.png"
        alt="Cuatro formas de crecer — Paquetes Liiffe"
        width={1920}
        height={700}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </section>
  )
}
