# Projects Carousel Design

**Date:** 2026-01-31
**Author:** Claude & Thang Nguyen
**Status:** Approved

## Overview

Redesign the projects section to display all 13 projects (6 featured + 7 other) using a responsive carousel with auto-play functionality, replacing the current static grid layout.

## Problem Statement

The current projects section only displays 6 featured projects in a static grid. The remaining 7 projects from `profile.md` are not shown, resulting in incomplete portfolio representation.

## Goals

1. Display all 13 projects in an engaging, interactive format
2. Maintain responsive design across all devices
3. Create dynamic user experience with auto-play while preserving user control
4. Keep implementation simple and performant

## Design Decisions

### Carousel Implementation

**Library Choice:** Swiper.js v11 (latest)
- **Rationale:** Mature, well-documented, comprehensive features, excellent touch support
- **Trade-off:** 40KB gzipped vs custom solution, but justified by feature completeness and reliability
- **Alternative considered:** Embla Carousel (lighter) - rejected for simpler API and better documentation of Swiper

### Responsive Behavior

**Slides Per View:**
- Desktop (≥1024px): 2 cards per slide
- Tablet (768px-1023px): 2 cards per slide (compact)
- Mobile (<768px): 1 card per slide

**Rationale:** Maintains current two-column desktop layout while optimizing for mobile reading experience.

### Auto-play Configuration

**Settings:**
- Delay: 6000ms (6 seconds per slide)
- Pause on hover: Enabled
- Pause on interaction: Enabled
- Resume: 3 seconds after last interaction
- Loop: Infinite

**Rationale:** 6 seconds provides enough time to read project title and description. Pause on hover respects user intent to read details.

### Navigation & Controls

**Included Elements:**
1. **Arrow Buttons** (Previous/Next)
   - Desktop: Positioned outside carousel container
   - Mobile: Overlay on cards with backdrop blur

2. **Pagination Dots**
   - Clickable for direct navigation
   - Active state highlighted
   - Center-aligned below carousel

3. ~~**Progress Bar**~~ - Removed to keep interface clean

**Excluded:**
- Progress bar (unnecessary complexity)
- Thumbnail previews (space constraints)

## Architecture

### File Structure

```
profile/
├── index.html                    # Add Swiper CDN links
├── components/
│   └── projects.html            # Wrap existing cards in Swiper structure
└── js/
    └── projectsCarousel.js      # Swiper initialization config
```

### Data Structure

**Keep existing HTML structure** - no separate data file needed:
- Projects remain as individual HTML cards in `components/projects.html`
- Each card wrapped in `<div class="swiper-slide">`
- Maintain chronological order (newest first)
- All 13 projects included

### HTML Structure

```html
<section id="projects" class="py-20 px-4 relative">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header (unchanged) -->

    <div class="swiper projectsSwiper">
      <div class="swiper-wrapper">
        <!-- Each project card wrapped in swiper-slide -->
        <div class="swiper-slide">
          <div class="project-card rounded-2xl p-8...">
            <!-- Existing card content -->
          </div>
        </div>
        <!-- Repeat for all 13 projects -->
      </div>

      <!-- Navigation Controls -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>
```

### Swiper Configuration

```javascript
new Swiper('.projectsSwiper', {
  // Responsive slides
  slidesPerView: 1,
  spaceBetween: 24,

  // Loop & Auto-play
  loop: true,
  autoplay: {
    delay: 6000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false
  },

  // Responsive breakpoints
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 2, spaceBetween: 32 }
  },

  // Navigation
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  // Pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Accessibility
  a11y: {
    prevSlideMessage: 'Previous project',
    nextSlideMessage: 'Next project'
  },

  // Performance
  speed: 400,
  effect: 'slide'
})
```

## UI/UX Specifications

### Animation & Transitions

**Slide Transitions:**
- Effect: Horizontal slide
- Duration: 400ms
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Space between: 24px (mobile/tablet), 32px (desktop)

**Card Hover Effects:**
- Transform: `translateY(-8px)` lift
- Shadow: Purple glow `0 20px 40px rgb(168 85 247 / 0.3)`
- Border: Highlight with `border-purple-500/50`
- Transition: 300ms ease
- **Carousel pauses automatically on hover**

### Custom Styling

**Navigation Arrows:**
```css
.swiper-button-prev,
.swiper-button-next {
  width: 48px;
  height: 48px;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 50%;
  color: rgb(192, 132, 252); /* purple-400 */
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.5);
  transform: scale(1.1);
}

/* Responsive positioning */
@media (max-width: 1023px) {
  .swiper-button-prev { left: 16px; }
  .swiper-button-next { right: 16px; }
}

@media (min-width: 1024px) {
  .swiper-button-prev { left: -24px; }
  .swiper-button-next { right: -24px; }
}
```

**Pagination Dots:**
```css
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: rgba(71, 85, 105, 0.5);
  opacity: 1;
}

.swiper-pagination-bullet-active {
  width: 12px;
  height: 12px;
  background: linear-gradient(to right, rgb(168, 85, 247), rgb(236, 72, 153));
}
```

### Accessibility

**Keyboard Navigation:**
- Left/Right arrows: Navigate slides
- Tab: Focus navigation buttons
- Enter/Space: Activate focused button

**ARIA Attributes:**
- `aria-label` on navigation buttons
- `role="region"` on carousel
- `aria-live="polite"` for slide changes

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .swiper {
    --swiper-transition-duration: 0ms;
  }
  .swiper-wrapper {
    transition-duration: 0ms !important;
  }
}
```

## Missing Projects to Add

From `profile.md`, add these 7 projects to complete the carousel:

1. **All In One** (08/2023 - Present) - Internal project management system
2. **Snippets** (05/2023 - 12/2023) - Code snippet management platform
3. **All In One - Remake** (12/2023) - Golang GraphQL remake
4. **Wave1-Expert** (05/2023) - Fire suppression system management
5. **EcoCrawler** (12/2023 - 04/2024) - Trading data crawler
6. **SongPhuongFood** (08/2023 - 10/2023) - E-commerce website

These should be added after the existing 6 featured projects in chronological order.

## Performance Considerations

**Optimization:**
- Lazy loading: Only render visible slides + adjacent slides
- CSS containment: Use `contain: layout style paint` on cards
- Image optimization: Defer off-screen SVG rendering
- Debounce resize handlers

**Loading Strategy:**
1. Load Swiper CSS/JS from CDN (cached globally)
2. Initialize carousel on DOMContentLoaded
3. Fallback: If Swiper fails, show static grid

**Fallback Implementation:**
```javascript
if (typeof Swiper === 'undefined') {
  // Remove swiper classes, show as grid
  document.querySelector('.swiper-wrapper').style.display = 'grid';
  document.querySelector('.swiper-wrapper').style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
}
```

## Error Handling

**Edge Cases:**
1. **CDN failure:** Graceful degradation to static grid
2. **Single project:** Hide navigation if only one slide
3. **JavaScript disabled:** CSS-only horizontal scroll with `overflow-x: auto`
4. **Touch devices:** Native swipe gestures work automatically

## Success Metrics

**User Experience:**
- All 13 projects visible and accessible
- Smooth transitions on all devices
- Auto-play doesn't interfere with reading
- Navigation is intuitive

**Performance:**
- Page load impact: < 50KB additional assets
- First render: Carousel visible within 1 second
- Interaction: < 16ms frame time during animations

## Implementation Phases

### Phase 1: Add Missing Projects
- Extract project data from `profile.md`
- Create HTML cards for 7 missing projects
- Add to `components/projects.html`

### Phase 2: Integrate Swiper
- Add Swiper CDN to `index.html`
- Wrap existing grid in Swiper structure
- Create `js/projectsCarousel.js` with configuration

### Phase 3: Custom Styling
- Override Swiper default styles
- Match purple gradient theme
- Add responsive adjustments

### Phase 4: Testing & Refinement
- Test on mobile/tablet/desktop
- Verify auto-play and pause behavior
- Check accessibility with keyboard/screen readers
- Optimize performance

## Open Questions

None - design approved and ready for implementation.

## References

- Swiper.js Documentation: https://swiperjs.com/
- Current projects: `components/projects.html`
- Project data source: `profile.md`
- Design system: Purple gradient theme with Tailwind CSS
