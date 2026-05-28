// Carousel + reveal animations (clean implementation)
document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initReveal();
});

function initCarousels(){
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.carousel-btn.prev');
    const next = carousel.querySelector('.carousel-btn.next');
    const items = Array.from(track.children);
    // center on the true middle index so there is a card on each side
    let centerIndex = Math.max(0, Math.floor(items.length / 2));

    function computeGap(){
      if (items.length < 2) return 12;
      const r0 = items[0].getBoundingClientRect();
      const r1 = items[1].getBoundingClientRect();
      return Math.max(8, Math.round(r1.left - r0.right));
    }

    function update(){
      if (!items.length) return;

      centerIndex = Math.max(0, Math.min(items.length - 1, centerIndex));

      // To get accurate positions regardless of current transform, temporarily remove transform
      const prevTransform = track.style.transform;
      track.style.transition = 'none';
      track.style.transform = 'none';

      // measure
      const containerRect = carousel.getBoundingClientRect();
      const itemRect = items[centerIndex].getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const neededOffset = Math.round(containerCenterX - itemCenterX);

      // apply transform with animation
      track.style.transition = 'transform .36s cubic-bezier(.22,.9,.36,1)';
      track.style.transform = `translateX(${neededOffset}px)`;

      // update classes and scaling variable
      items.forEach((it, i) => {
        it.classList.remove('is-center','is-left','is-right','is-side');
        if (i === centerIndex) it.classList.add('is-center');
        else if (i === centerIndex - 1) it.classList.add('is-left');
        else if (i === centerIndex + 1) it.classList.add('is-right');
        else it.classList.add('is-side');

        if (i === centerIndex) it.style.setProperty('--card-scale', '1.06');
        else if (i === centerIndex - 1 || i === centerIndex + 1) it.style.setProperty('--card-scale', '0.96');
        else it.style.setProperty('--card-scale', '0.87');
      });

      if (prev) { prev.disabled = centerIndex <= 0; prev.style.opacity = prev.disabled ? '0.35' : '1'; }
      if (next) { next.disabled = centerIndex >= items.length - 1; next.style.opacity = next.disabled ? '0.35' : '1'; }
    }

    if (prev) prev.addEventListener('click', () => { centerIndex = Math.max(0, centerIndex - 1); update(); });
    if (next) next.addEventListener('click', () => { centerIndex = Math.min(items.length - 1, centerIndex + 1); update(); });

    // for non-anchor cert cards, open data-credly-url on click
    items.forEach(it => {
      if (it.classList.contains('cert-card') && it.getAttribute('data-credly-url') && it.tagName.toLowerCase() !== 'a'){
        it.addEventListener('click', () => {
          const url = it.getAttribute('data-credly-url');
          if (url && url !== 'PLACEHOLDER_CREDLY_URL') window.open(url, '_blank', 'noopener');
        });
      }
    });

    requestAnimationFrame(() => update());
    window.addEventListener('resize', () => { track.style.transition = 'none'; requestAnimationFrame(() => { update(); setTimeout(() => track.style.transition = '', 60); }); });
  });
}

function initReveal(){
  const els = document.querySelectorAll('.hero, .card');
  els.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--reveal-delay', `${i * 80}ms`); });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
  }, { threshold: 0.12 });

  els.forEach(el => obs.observe(el));
}
