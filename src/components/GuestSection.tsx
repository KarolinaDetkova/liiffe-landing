import Image from 'next/image'

export default function GuestSection() {
  return (
    <section id="huesped" style={{ width: '100%' }}>
      <Image
        src="/ref-guest.png"
        alt="¿Conoces realmente a tu huésped?"
        width={1920}
        height={800}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </section>
  )
}
