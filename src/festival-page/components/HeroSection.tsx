import mainVisual from '../../assets/images/400.png';

export default function HeroSection() {
  return (
    <section className="festival-hero">
      <div className="festival-hero-bg">
        <img
          src={mainVisual}
          alt="メインビジュアル"
          className="festival-hero-bg-img"
        />
      </div>
      <div className="festival-hero-content">
        <h2 className="festival-hero-title">NEXTA vol.1へようこそ！</h2>
        <p className="festival-hero-subtitle">PaGEが送る、星々の輝きを巡る祭典</p>
        <div className="festival-hero-date-time">
          <p>2025.9.20 (Sat) - 9.21 (Sun) 開催！</p>
          <p>11:00 - 18:00</p>
        </div>
      </div>
    </section>
  );
}