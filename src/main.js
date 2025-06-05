// 簡単なスムーススクロールとアクティブリンク処理（参考）
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if(targetElement){
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Carousel JavaScript - これらを専用のJSファイルに移動することを推奨
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = document.querySelector('.hero-carousel');
            if (!carousel) return;

            const slidesContainer = carousel.querySelector('.carousel-slides-container');
            const slides = Array.from(slidesContainer.children);
            const nextButton = carousel.querySelector('.carousel-nav.next');
            const prevButton = carousel.querySelector('.carousel-nav.prev');
            const dotsContainer = carousel.querySelector('.carousel-dots');

            if (!slidesContainer || slides.length === 0 || !nextButton || !prevButton || !dotsContainer) {
                console.warn('Carousel elements not found. Carousel will not be initialized.');
                if(carousel) carousel.style.display = 'none'; // カルーセル要素が不完全なら非表示
                return;
            }

            let currentSlide = 0;
            const totalSlides = slides.length;

            // Create dots
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `スライド ${index + 1}へ移動`);
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
                dotsContainer.appendChild(dot);
            });
            const dots = Array.from(dotsContainer.children);

            function goToSlide(slideIndex) {
                slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
                currentSlide = slideIndex;
                updateActiveElements();
            }

            function updateActiveElements() {
                slides.forEach((slide, index) => {
                    if (index === currentSlide) {
                        slide.classList.add('active'); // 必要ならactiveクラスで何かする
                    } else {
                        slide.classList.remove('active');
                    }
                });
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            nextButton.addEventListener('click', () => {
                const nextSlideIndex = (currentSlide + 1) % totalSlides;
                goToSlide(nextSlideIndex);
            });

            prevButton.addEventListener('click', () => {
                const prevSlideIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                goToSlide(prevSlideIndex);
            });
            
            // Initialize
            if (slides.length > 0) {
                 slides[0].classList.add('active'); // Ensure first slide is marked active
                 goToSlide(0); // Set initial position
            } else {
                // スライドがない場合はカルーセル自体を隠すか、メッセージを表示
                carousel.style.display = 'none';
                console.warn("No slides found for the carousel.");
            }
        });