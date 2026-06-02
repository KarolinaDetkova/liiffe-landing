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
        <div className="hero-btns">
          <button className="btn-primary">Solicitar demo →</button>
          <button className="btn-secondary">
            <div className="play-icon" />
            Ver cómo funciona
          </button>
        </div>
        <p className="hero-clients-label">Más de 300 alojamientos ya confían en Liiffe</p>
        <div className="client-logos">
          {['MELIÁ', 'RIU', 'Barceló', 'ESTIVAL', 'CALEIA'].map((name) => (
            <span key={name} className="client-logo">{name}</span>
          ))}
        </div>
      </div>
      <div className="hero-right">
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
    </section>
  )
}