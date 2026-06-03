import Image from 'next/image'

export default function AsiEmpiezaTodo() {
  return (
    <section id="asi-empieza" style={{ width: '100%' }}>
      <Image
        src="/ref-asi.png"
        alt="Así empieza todo"
        width={1920}
        height={900}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </section>
  )
}
