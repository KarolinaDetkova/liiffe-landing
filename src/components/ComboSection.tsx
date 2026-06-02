import Image from 'next/image'

export default function ComboSection() {
  return (
    <section className="section-combo" id="por-que-liiffe">
      <Image
        src="/Body.svg"
        alt="El Combo Liiffe"
        width={1400}
        height={600}
        style={{ width: '100%', height: 'auto' }}
      />
    </section>
  )
}