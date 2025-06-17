import React, { useState, useEffect } from "react";

const slides = [
  {
    img: "https://placehold.co/1200x500/7FDBFF/333?text=注目のゲーム+1",
    title: "ゲームタイトル ALPHA",
    desc: "革新的なゲームプレイと美しいグラフィックが融合した、次世代の体験をあなたに。",
    link: "#game-alpha-details"
  },
  {
    img: "https://placehold.co/1200x500/39CCCC/FFF?text=ピックアップゲーム+BETA",
    title: "プロジェクト BETA",
    desc: "仲間と協力し、広大な世界を冒険しよう。無限の可能性が待っている。",
    link: "#project-beta-details"
  },
  {
    img: "https://placehold.co/1200x500/01FF70/333?text=最新作+GAMMA",
    title: "最新作 GAMMA",
    desc: "手に汗握るストーリーと、戦略的なバトルが楽しめる意欲作。",
    link: "#latest-gamma-details"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isZooming, setIsZooming] = useState(true);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  // スライド切り替え時にアニメーション中フラグを立てる
  useEffect(() => {
    setIsZooming(true);
    const timer = setTimeout(() => setIsZooming(false), 5000); // 5秒間overflow: hidden
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="hero-carousel">
      <div
        className="carousel-slides-container"
        style={{
          transform: `translateX(-${current * 100}%)`,
          display: "flex",
          transition: "transform 0.5s"
        }}
      >
        {slides.map((slide, idx) => (
          <div
            className="carousel-slide"
            key={idx}
            style={{
              minWidth: "100%",
              height: "60vh",
              overflow: isZooming && current === idx ? "hidden" : "auto"
            }}
          >
            <img
              key={current === idx ? `active-${idx}` : `inactive-${idx}`}
              src={slide.img}
              alt={slide.title}
              className="hero-zoom-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            <div className="slide-caption">
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
              <a href={slide.link} className="cta-button slide-cta">詳細を見る</a>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-nav prev" aria-label="前のスライドへ" onClick={prev}>&#10094;</button>
      <button className="carousel-nav next" aria-label="次のスライドへ" onClick={next}>&#10095;</button>
      <div className="carousel-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot${current === idx ? " active" : ""}`}
            aria-label={`スライド${idx + 1}へ`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </div>
  );
}