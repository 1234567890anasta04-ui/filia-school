document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // 1. HERO СЦЕНА
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .from(".gsap-header", { y: -30, autoAlpha: 0, duration: 0.9 })
    .from(".gsap-hero-logo", { scale: 0.92, y: 30, autoAlpha: 0, duration: 1.1 }, "-=0.5")
    .from(".gsap-hero-sub", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.15 }, "-=0.7")
    .from(".gsap-hero-slogan", { y: 40, autoAlpha: 0, duration: 1, stagger: 0.2 }, "-=0.6");

  gsap.to(".gsap-hero-bg", {
    yPercent: 18,
    ease: "none",
    scrollTrigger: {
      trigger: ".gsap-hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 2. ЗАГОЛОВКИ СЕКЦИЙ
  gsap.utils.toArray(".gsap-title").forEach((title) => {
    gsap.from(title, {
      y: 45,
      autoAlpha: 0,
      duration: 0.95,
      ease: "power3.out",
      scrollTrigger: {
        trigger: title,
        start: "top 86%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // 3. ПИЛЛЫ И МАНИФЕСТ
  gsap.from(".gsap-pill", {
    scale: 0.85,
    y: 25,
    autoAlpha: 0,
    duration: 0.65,
    ease: "back.out(1.4)",
    stagger: { amount: 0.55, from: "start" },
    scrollTrigger: {
      trigger: ".gsap-pills-container",
      start: "top 82%"
    }
  });

  gsap.from(".gsap-manifest-card", {
    x: 40,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".gsap-manifest-card",
      start: "top 82%"
    }
  });

  // 4. КАРТОЧКИ ФОРМАТОВ (РОВНЫЙ КАСКАД)
  gsap.from(".gsap-format-card", {
    y: 55,
    autoAlpha: 0,
    duration: 0.85,
    ease: "power3.out",
    stagger: 0.16,
    scrollTrigger: {
      trigger: ".gsap-formats-grid",
      start: "top 82%"
    }
  });

  // 5. КВИЗ
  gsap.from(".gsap-quiz-box", {
    y: 50,
    scale: 0.97,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".gsap-quiz-box",
      start: "top 85%"
    }
  });

  const quizForm = document.getElementById("quizForm");
  const quizResult = document.getElementById("quizResult");

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const goal = document.getElementById("goal").value;
    let recommendation = "Формат «Вместе с группой» + пятничный разговорный клуб.";

    if (goal === "vnj") {
      recommendation = "Формат «Один на один» с Еленой (интенсивная подготовка к экзамену на ВНЖ).";
    } else if (goal === "travel") {
      recommendation = "Формат «Вместе с группой» + еженедельные встречи разговорного клуба с Никосом.";
    }

    quizResult.hidden = false;
    quizResult.innerHTML = `
      <span><strong>Рекомендация filía:</strong> ${recommendation}</span>
      <span class="pill pill--peach">Заявка принята! Ждём на пробном уроке</span>
    `;
    gsap.fromTo(quizResult, { y: 15, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 });
  });

  // 6. ПРЕПОДАВАТЕЛИ И КАРТА ГРЕЦИИ
  gsap.fromTo(".gsap-greece-map",
    { scale: 0.92, rotation: -2, autoAlpha: 0 },
    {
      scale: 1,
      rotation: 0,
      autoAlpha: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".gsap-teachers-section",
        start: "top 80%"
      }
    }
  );

  gsap.to(".gsap-greece-map", {
    y: -25,
    ease: "none",
    scrollTrigger: {
      trigger: ".gsap-teachers-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2
    }
  });

  gsap.from(".gsap-teacher-card", {
    y: 60,
    autoAlpha: 0,
    duration: 0.85,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".gsap-teachers-grid",
      start: "top 82%"
    }
  });

  // 7. ИНТЕРАКТИВНЫЙ 4 БЛОК («НЕ ПРОСТО ПРАВИЛА, А СТИЛЬ ЖИЗНИ»)
  const lifestyleData = [
    {
      img: "img/dinner.png",
      tag: "пятничный мезе-клуб • 20:00",
      caption: "Живое общение с носителями за виртуальным столом: обсуждаем культуру, учимся спорить и заказывать ужин в таверне."
    },
    {
      img: "img/acropolis.png",
      tag: "выездной ретрит • крит & киклады",
      caption: "7 дней полного погружения в Греции: утренние уроки на террасе с видом на море, локальные рынки и практика 24/7."
    },
    {
      img: "img/music.png",
      tag: "кино и музыка • без субтитров",
      caption: "Разбираем греческий кинематограф и современные треки — начинаем понимать живой сленг, идиомы и юмор местных."
    }
  ];

  const stageImg = document.getElementById("lifestyleStageImg");
  const stageTag = document.getElementById("lifestyleStageTag");
  const stageCaption = document.getElementById("lifestyleStageCaption");
  const tabs = document.querySelectorAll(".lifestyle-tab");
  const thumbs = document.querySelectorAll(".lifestyle-thumb");

  function switchLifestyleSlide(index) {
    const item = lifestyleData[index];
    if (!item) return;

    tabs.forEach((t, i) => t.classList.toggle("is-active", i === index));
    thumbs.forEach((th, i) => th.classList.toggle("is-active", i === index));

    gsap.to([stageImg, stageTag, stageCaption], {
      autoAlpha: 0,
      y: 8,
      duration: 0.2,
      onComplete: () => {
        stageImg.src = item.img;
        stageTag.textContent = item.tag;
        stageCaption.textContent = item.caption;
        gsap.to([stageImg, stageTag, stageCaption], {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out"
        });
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchLifestyleSlide(Number(tab.dataset.index)));
  });

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => switchLifestyleSlide(Number(thumb.dataset.index)));
  });

  gsap.from(".gsap-lifestyle-main", {
    x: 40,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".gsap-lifestyle-section",
      start: "top 78%"
    }
  });

  gsap.from(".gsap-lifestyle-item", {
    y: 35,
    autoAlpha: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.14,
    scrollTrigger: {
      trigger: ".gsap-lifestyle-section",
      start: "top 78%"
    }
  });

  // 8. МАГНИТНЫЕ КНОПКИ НА ДЕСКТОПЕ
  mm.add("(min-width: 1024px)", () => {
    document.querySelectorAll(".gsap-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.22;
        gsap.to(btn, { x, y, duration: 0.3, ease: "power2.out" });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      });
    });
  });

  // 9. КНОПКИ «ПОСЛУШАТЬ ГОЛОС»
  let activeAudioBtn = null;
  document.querySelectorAll(".btn--audio").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (activeAudioBtn && activeAudioBtn !== btn) {
        activeAudioBtn.textContent = "▶ послушать голос";
      }
      const isPlaying = btn.textContent.includes("⏸");
      btn.textContent = isPlaying ? "▶ послушать голос" : "⏸ воспроизводится...";
      activeAudioBtn = isPlaying ? null : btn;
    });
  });

  // 10. МОДАЛЬНОЕ ОКНО ПРОГРАММЫ КЛУБА
  const clubModal = document.getElementById("clubModal");
  const openBtn = document.getElementById("openClubModal");
  const closeBtn = document.getElementById("closeClubModal");
  const modalJoinBtn = document.getElementById("modalJoinBtn");

  openBtn.addEventListener("click", () => {
    clubModal.hidden = false;
    gsap.fromTo(".modal-card", { y: 30, scale: 0.95, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 0.4, ease: "power3.out" });
  });

  const closeModal = () => {
    gsap.to(".modal-card", {
      y: 20,
      autoAlpha: 0,
      duration: 0.25,
      onComplete: () => { clubModal.hidden = true; }
    });
  };

  closeBtn.addEventListener("click", closeModal);
  modalJoinBtn.addEventListener("click", closeModal);
  clubModal.addEventListener("click", (e) => {
    if (e.target === clubModal) closeModal();
  });

  // 11. FAQ АККОРДЕОН НА GSAP
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector("span");
      const isOpen = answer.offsetHeight > 0;

      if (isOpen) {
        gsap.to(answer, { height: 0, duration: 0.35, ease: "power2.inOut" });
        icon.textContent = "+";
      } else {
        gsap.set(answer, { height: "auto" });
        gsap.from(answer, { height: 0, duration: 0.4, ease: "power2.out" });
        icon.textContent = "−";
      }
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
});