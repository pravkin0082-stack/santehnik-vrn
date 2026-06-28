/* ============================================
   Основной JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Закрыть мобильное меню после клика
        if (mainNav) {
          mainNav.classList.remove("active");
        }
      }
    });
  });

  // Плавающая кнопка звонка - появляется после прокрутки
  const callBtn = document.querySelector(".floating-call-btn");
  if (callBtn) {
    // Скрываем кнопку при загрузке
    callBtn.style.opacity = "0";
    callBtn.style.transform = "translateY(20px) scale(0.8)";
    callBtn.style.transition =
      "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    callBtn.style.pointerEvents = "none";

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateButton() {
      const currentScrollY = window.scrollY;

      // Показываем кнопку после прокрутки 300px
      if (currentScrollY > 300) {
        callBtn.style.opacity = "1";
        callBtn.style.transform = "translateY(0) scale(1)";
        callBtn.style.pointerEvents = "auto";
      } else {
        callBtn.style.opacity = "0";
        callBtn.style.transform = "translateY(20px) scale(0.8)";
        callBtn.style.pointerEvents = "none";
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateButton);
        ticking = true;
      }
    });

    // Проверяем при загрузке (если страница уже прокручена)
    updateButton();
  }
});

/* ============================================
   КНОПКА "НАВЕРХ"
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  if (scrollToTopBtn) {
    // Показывать/скрывать кнопку при прокрутке
    let ticking = false;

    function updateScrollButton() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollButton);
        ticking = true;
      }
    });

    // Плавная прокрутка наверх при клике
    scrollToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Проверка при загрузке (если страница уже прокручена)
    updateScrollButton();
  }
});
