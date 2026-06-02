import Image from 'next/image'

const types = [
  { img: '/hoteles.jpg', label: 'Hoteles' },
  { img: '/apartamentos turist.jpg', label: 'Apartamentos turísticos' },
  { img: '/viviendas vacacion.jpg', label: 'Viviendas vacacionales' },
  { img: '/resorts.jpg', label: 'Resorts' },
  { img: '/camping.jpg', label: 'Camping y glamping' },
  { img: '/destination.jpg', label: 'Destinos' },
]

export default function TypesSection() {
  return (
    <section className="section-types" id="soluciones">
      <h2>UNA SOLUCIÓN PARA <span>TODO TIPO</span> DE ALOJAMIENTOS</h2>
      <div className="types-grid">
        {types.map((t) => (
          <div key={t.label} className="type-card">
            <div className="type-img-wrap">
              <Image
                src={t.img}
                alt={t.label}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="type-overlay" />
              <div className="type-label">{t.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}