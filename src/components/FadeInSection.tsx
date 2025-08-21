import React, { useRef, useEffect, useState } from "react";
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const FadeInSection: React.FC<Props> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section${isVisible ? " is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;