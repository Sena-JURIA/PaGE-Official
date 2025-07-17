import React, { useState, useEffect } from "react";
import { getPosts } from "../data/blogPosts";
import { Link } from "react-router-dom";

interface Slide {
  img: string;
  title: string;
  desc: string;
  link: string;
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isZooming, setIsZooming] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        const latestPosts = posts.slice(0, 3).map(post => ({
          img: post.imageUrl,
          title: post.title,
          desc: post.excerpt,
          link: `/blog/${post.id}`
        }));
        setSlides(latestPosts);
      } catch (error) {
        console.error("Failed to fetch posts for carousel:", error);
        // Optionally, set some default slides or an error state
      }
    };

    fetchPosts();
  }, []);

  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => slides.length > 0 && setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => slides.length > 0 && setCurrent((current + 1) % slides.length);

  // スライド切り替え時にアニメーション中フラグを立てる
  useEffect(() => {
    if (slides.length > 0) {
      setIsZooming(true);
      const timer = setTimeout(() => setIsZooming(false), 5000); // 5秒間overflow: hidden
      return () => clearTimeout(timer);
    }
  }, [current, slides.length]);

  if (slides.length === 0) {
    return <div className="hero-carousel-loading">Loading...</div>; // Or a placeholder
  }

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
              <Link to={slide.link} className="cta-button slide-cta">詳細を見る</Link>
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
