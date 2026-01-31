// Projects Carousel Configuration
// Initialize Swiper carousel for projects section

document.addEventListener('DOMContentLoaded', function() {
  // Check if Swiper is loaded
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library not loaded. Falling back to static grid.');
    fallbackToGrid();
    return;
  }

  // Initialize Swiper carousel
  const projectsSwiper = new Swiper('.projectsSwiper', {
    // Responsive slides
    slidesPerView: 1,
    spaceBetween: 24,

    // Loop & Auto-play
    loop: true,
    autoplay: {
      delay: 6000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 32
      }
    },

    // Navigation
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    // Accessibility
    a11y: {
      prevSlideMessage: 'Previous project',
      nextSlideMessage: 'Next project',
    },

    // Performance
    speed: 400,
    effect: 'slide',

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Mouse wheel control (optional)
    mousewheel: {
      forceToAxis: true,
    },
  });

  // Pause autoplay when hovering over any project card
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (projectsSwiper.autoplay.running) {
        projectsSwiper.autoplay.pause();
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!projectsSwiper.autoplay.running) {
        projectsSwiper.autoplay.start();
      }
    });
  });

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    projectsSwiper.params.speed = 0;
    projectsSwiper.autoplay.stop();
  }
});

// Fallback function if Swiper fails to load
function fallbackToGrid() {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const swiperContainer = document.querySelector('.projectsSwiper');

  if (swiperWrapper && swiperContainer) {
    // Remove swiper classes
    swiperWrapper.classList.remove('swiper-wrapper');
    swiperContainer.classList.remove('swiper', 'projectsSwiper');

    // Apply grid layout
    swiperWrapper.style.display = 'grid';
    swiperWrapper.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    swiperWrapper.style.gap = '2rem';

    // Remove swiper-slide wrapper divs
    const slides = swiperWrapper.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      const card = slide.querySelector('.project-card');
      if (card) {
        swiperWrapper.appendChild(card);
        slide.remove();
      }
    });

    // Hide navigation controls
    const navElements = document.querySelectorAll('.swiper-button-prev, .swiper-button-next, .swiper-pagination');
    navElements.forEach(el => el.style.display = 'none');

    console.log('Fallback to grid layout applied successfully.');
  }
}
