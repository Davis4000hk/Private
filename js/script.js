// 漢堡選單控制
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const closeBtn = document.querySelector('.menu-close-btn');

// 開啟選單
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navList.classList.add('active');
    document.body.style.overflow = 'hidden'; // 禁止滾動
  });
}

// 關閉選單
const closeMenu = () => {
  navList.classList.remove('active');
  document.body.style.overflow = 'auto'; // 恢復滾動
};

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

// 點擊選單連結後自動關閉
document.querySelectorAll('.nav-list li a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// 點擊外部區域關閉選單
document.addEventListener('click', (e) => {
  if (navList.classList.contains('active') && !navList.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// 認證圖標滑入動畫
document.querySelectorAll('.certification-item img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.1)';
    img.style.filter = 'grayscale(0%)';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    img.style.filter = 'grayscale(100%)';
  });
});
