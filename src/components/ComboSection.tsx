import Image from 'next/image'

export default function PackagesSection() {
  return (
    <section id="por-que-liiffe" style={{ width: '100%' }}>
      <Image
        src="/Combo.svg"
        alt="Paquetes de servicios de Liiffe"
        width={1920}
        height={700}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </section>
  )
}
