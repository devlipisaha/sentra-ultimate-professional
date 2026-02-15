// Navbar scroll effect

        function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    }

        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll reveal animation
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animate chart bars
        const chartBars = document.querySelectorAll('.bar-fill');
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            });
        });

        chartBars.forEach(bar => {
            chartObserver.observe(bar);
        });

        // NEW CAROUSEL TESTIMONIAL SLIDER
        let currentCarouselIndex = 0;
        const carouselTrack = document.getElementById('carouselTrack');
        const carouselDots = document.querySelectorAll('.carousel-dot-indicator');
        const carouselPrevBtn = document.getElementById('carouselPrev');
        const carouselNextBtn = document.getElementById('carouselNext');
        const carouselCurrentNum = document.getElementById('carouselCurrentNum');
        const totalSlides = document.querySelectorAll('.testimonial-slide-item').length;

        function updateCarousel() {
            // Move the track
            const offset = -currentCarouselIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;

            // Update dots
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentCarouselIndex);
            });

            // Update counter
            carouselCurrentNum.textContent = currentCarouselIndex + 1;

            // Update button states
            carouselPrevBtn.disabled = currentCarouselIndex === 0;
            carouselNextBtn.disabled = currentCarouselIndex === totalSlides - 1;
        }

        function moveCarousel(direction) {
            currentCarouselIndex += direction;
            
            // Keep within bounds
            if (currentCarouselIndex < 0) currentCarouselIndex = 0;
            if (currentCarouselIndex >= totalSlides) currentCarouselIndex = totalSlides - 1;

            updateCarousel();
        }

        function goToCarouselSlide(index) {
            currentCarouselIndex = index;
            updateCarousel();
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                moveCarousel(-1);
            } else if (e.key === 'ArrowRight') {
                moveCarousel(1);
            }
        });

        // Auto-play carousel
        let carouselAutoplay;
        
        function startCarouselAutoplay() {
            carouselAutoplay = setInterval(() => {
                if (currentCarouselIndex < totalSlides - 1) {
                    moveCarousel(1);
                } else {
                    currentCarouselIndex = 0;
                    updateCarousel();
                }
            }, 6000); // Change every 6 seconds
        }

        function stopCarouselAutoplay() {
            clearInterval(carouselAutoplay);
        }

        // Initialize carousel
        updateCarousel();
        startCarouselAutoplay();

        // Pause on hover
        const carouselContainer = document.querySelector('.testimonials-carousel');
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoplay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoplay);