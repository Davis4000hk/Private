(function () {
  'use strict';

  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.crs-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          // Trigger reflow
          void card.offsetWidth;
          card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();