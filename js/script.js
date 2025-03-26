// 圖標滑入動畫
document.querySelectorAll('.certifications-grid img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    img.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.boxShadow = 'none';
  });
});
// 漢堡選單切換
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

// 點擊外部區域關閉選單
document.addEventListener('click', (e) => {
  if (!e.target.closest('.aia-nav') && navList.classList.contains('active')) {
    navList.classList.remove('active');
    hamburger.classList.remove('active');
  }
});
