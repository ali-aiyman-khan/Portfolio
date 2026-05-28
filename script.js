// Simple carousel logic for elements with data-carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');
// Simple center-focused carousel logic for elements with data-carousel
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');

  // Simple center-focused carousel logic for elements with data-carousel
  document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const prev = carousel.querySelector('.carousel-btn.prev');
      const next = carousel.querySelector('.carousel-btn.next');
      const items = Array.from(track.children);
      let centerIndex = 0;

      function computeGap() {
        if (items.length < 2) return 12;
        const r0 = items[0].getBoundingClientRect();
        const r1 = items[1].getBoundingClientRect();
        return Math.max(8, Math.round(r1.left - r0.right));
      }

      function update() {
        if (!items.length) return;
        const gap = computeGap();
        const cardRect = items[0].getBoundingClientRect();
        const cardWidth = Math.round(cardRect.width);
        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = Math.round(containerRect.width / 2);

        centerIndex = Math.max(0, Math.min(items.length - 1, centerIndex));

        const itemCenterPos = Math.round(centerIndex * (cardWidth + gap) + cardWidth / 2);
        const offset = containerCenter - itemCenterPos;

        track.style.transition = 'transform .36s cubic-bezier(.22,.9,.36,1)';
        track.style.transform = `translateX(${offset}px)`;

        items.forEach((it, i) => {
          it.classList.remove('is-center','is-left','is-right','is-side');
          if (i === centerIndex) it.classList.add('is-center');
          else if (i === centerIndex - 1) it.classList.add('is-left');
          else if (i === centerIndex + 1) it.classList.add('is-right');
          else it.classList.add('is-side');
        });

        if (prev) { prev.disabled = centerIndex <= 0; prev.style.opacity = prev.disabled ? '0.35' : '1'; }
        if (next) { next.disabled = centerIndex >= items.length - 1; next.style.opacity = next.disabled ? '0.35' : '1'; }
      }

      if (prev) prev.addEventListener('click', () => { centerIndex = Math.max(0, centerIndex - 1); update(); });
      if (next) next.addEventListener('click', () => { centerIndex = Math.min(items.length - 1, centerIndex + 1); update(); });

      // Make cert cards clickable and open the data-credly-url if set (scoped per carousel)
      const certCards = carousel.querySelectorAll('.cert-card[data-credly-url]');
      certCards.forEach(card => {
        card.addEventListener('click', () => {
          const url = card.getAttribute('data-credly-url');
          if (url && url !== 'PLACEHOLDER_CREDLY_URL') {
            window.open(url, '_blank', 'noopener');
          } else {
            alert('Credly URL not set yet. Replace PLACEHOLDER_CREDLY_URL in the DOM or provide the URL.');
          }
        });
      });

      // initialize: center the first item (index 0)
      requestAnimationFrame(() => update());

      // on resize, recalculate and reposition
      window.addEventListener('resize', () => {
        track.style.transition = 'none';
        requestAnimationFrame(() => {
          update();
          setTimeout(() => { track.style.transition = ''; }, 50);
        });
      });
    });
  });
            certCards.forEach(card => {
              card.addEventListener('click', () => {
                const url = card.getAttribute('data-credly-url');
                if (url && url !== 'PLACEHOLDER_CREDLY_URL') {
                  window.open(url, '_blank', 'noopener');
                } else {
                  alert('Credly URL not set yet. Replace PLACEHOLDER_CREDLY_URL in the DOM or provide the URL.');
                }
              });
            });

            // initialize: center the first item (index 0)
            requestAnimationFrame(() => update());

            // on resize, recalculate and reposition
            window.addEventListener('resize', () => {
              track.style.transition = 'none';
              requestAnimationFrame(() => {
                update();
                setTimeout(() => { track.style.transition = ''; }, 50);
              });
            });
          });
        });
