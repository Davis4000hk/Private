(function () {
  'use strict';

  const hamburger = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  const overlay = document.querySelector('.nav-overlay');
  const header = document.querySelector('.aia-header');

  if (!hamburger || !navList) return;

  const closeMenu = () => {
    navList.classList.remove('active');
    hamburger.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    navList.classList.add('active');
    hamburger.classList.add('active');
    if (overlay) overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navList.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.nav-list li a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList.classList.contains('active')) {
      closeMenu();
    }
  });

  // Header scroll effect
  let lastScroll = 0;
  if (header) {
    window.addEventListener('scroll', () => {
      const current = window.pageYOffset;
      header.classList.toggle('scrolled', current > 30);
      lastScroll = current;
    }, { passive: true });
  }

  // Scroll fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach((el) => io.observe(el));
  }

  // Animated counters
  const counters = document.querySelectorAll('.data-number');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target || el.innerText.replace(/,/g, ''), 10);
    if (isNaN(target)) return;
    const duration = 1800;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.innerText = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.innerText = target.toLocaleString();
    };
    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach((c) => counterIO.observe(c));
  }

  // Typed effect (only if element exists)
  const typedEls = document.querySelectorAll('.typed-text');
  if (typeof Typed !== 'undefined' && typedEls.length) {
    new Typed('.typed-text', {
      strings: ['為您的財富保駕護航', '專業理財，成就未來'],
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 2000,
      loop: true,
      smartBackspace: true
    });
  }

  // Certifications grayscale hover (initial state grayscale, full color on hover)
  document.querySelectorAll('.certifications-grid img').forEach((img) => {
    img.style.filter = 'grayscale(40%)';
    img.addEventListener('mouseenter', () => { img.style.filter = 'grayscale(0%)'; });
    img.addEventListener('mouseleave', () => { img.style.filter = 'grayscale(40%)'; });
  });
})();