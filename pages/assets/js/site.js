/**
 * 哈基米挽肉 品牌官方網站共用腳本 (site.js)
 * 功能：
 * 1. 手機版漢堡導覽選單展開 / 收合與無障礙控制 (ARIA)
 * 2. 點擊外部或按下 Esc 鍵自動關閉選單
 * 3. 點擊選單內部連結時自動關閉選單
 * 4. 滾動頁面時頂部導覽列陰影效果
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // 1. 手機版選單切換開關
  if (navToggle && navMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(isExpanded));
      navToggle.setAttribute('aria-label', isExpanded ? '關閉選單' : '開啟選單');
      navToggle.classList.toggle('open', isExpanded);
      navMenu.classList.toggle('open', isExpanded);

      // 當選單打開時防止背景不正常捲動 (若需要)
      document.body.style.overflow = isExpanded && window.innerWidth <= 768 ? 'hidden' : '';
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // 2. 點擊任一導覽連結時關閉選單
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // 3. 點擊選單外部區域自動關閉
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        toggleMenu(false);
      }
    });

    // 4. 按下 ESC 鍵自動關閉
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        navToggle.focus();
      }
    });

    // 5. 視窗尺寸改變時重設狀態
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // 6. 滾動時增加導覽列陰影效果
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});
