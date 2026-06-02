import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-left">
        <h1>
          CONVERTIMOS<br />
          <span className="hl-pink">DATOS DEL</span><br />
          <span className="hl-cyan">HUÉSPED</span><br />
          EN INGRESOS
        </h1>
        <p>
          Conoce a cada huésped antes de su llegada y transforma cada estancia en una
          oportunidad para generar más valor, satisfacción y revenue.
        </p>
        <div className="hero-btns hero-btns-desktop">
          <button className="btn-primary">Solicitar demo →</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-devices">
          <Image
            src="/liiffe_dashboard_nobg.png"
            alt="Liiffe Dashboard"
            width={700}
            height={500}
            style={{ width: '100%', height: 'auto' }}
          />
          <Image
            src="/Mobile.png"
            alt="Liiffe Mobile"
            width={100}
            height={220}
            className="hero-mobile"
          />
        </div>
      </div>

      <div className="hero-btn-mobile">
        <button className="btn-primary">Solicitar demo →</button>
      </div>

      <div className="hero-clients">
        <p className="hero-clients-label">Más de 300 alojamientos ya confían en Liiffe</p>
        <div className="client-logos">
          <Image src="/logo marsenses.png" alt="Marsenses" width={120} height={40} style={{ objectFit: 'contain', filter: 'grayscale(100%) opacity(0.6)', mixBlendMode: 'multiply' }} />
          <Image src="/logo intercontinental.avif" alt="Intercontinental" width={120} height={40} style={{ objectFit: 'contain', filter: 'grayscale(100%) opacity(0.6)', mixBlendMode: 'multiply' }} />
          <Image src="/logo vibra colombia.avif" alt="Vibra Colombia" width={120} height={40} style={{ objectFit: 'contain', filter: 'grayscale(100%) opacity(0.6)', mixBlendMode: 'multiply' }} />
          <Image src="/logo asohost.avif" alt="Asohost" width={120} height={40} style={{ objectFit: 'contain', filter: 'grayscale(100%) opacity(0.6)', mixBlendMode: 'multiply' }} />
        </div>
      </div>
    </section>
  )
}