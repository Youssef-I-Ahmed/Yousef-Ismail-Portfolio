
    // Intersection Observer for reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal,.reveal-left,.reveal-right")
      .forEach((el) => observer.observe(el));

    // Counter animation
    function animateCounter(el, target) {
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (target > 10 ? "" : "+");
      }, 30);
    }
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll("[data-target]").forEach((el) => {
              animateCounter(el, parseInt(el.dataset.target));
            });
            statsObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document.querySelector(".stats-bar") &&
      statsObserver.observe(document.querySelector(".stats-bar"));

    // Form handler
    function handleForm(e) {
      e.preventDefault();
      const btn = e.target.querySelector("button");
      btn.textContent = "Message Sent ✓";
      btn.style.background = "#6dd47e";
      btn.style.color = "#0d0c0b";
      setTimeout(() => {
        btn.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';
        btn.style.background = "";
        btn.style.color = "";
      }, 3000);
    }
    // Smooth nav highlight
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.scrollY;
      sections.forEach((sec) => {
        const top = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < top + height) {
            link.style.color = "var(--gold)";
          } else {
            link.style.color = "";
          }
        }
      });
    });

    const toggleBtn = document.getElementById("theme-toggle");
    const icon = toggleBtn.querySelector("i");
    const heroImg = document.querySelector(".hero-img");

    // الصورة الأولى (dark mode) — الصورة الحالية
    const darkImg = heroImg.src;

    // الصورة الثانية (light mode) — حط مسار صورتك هنا
    const lightImg = "img/your-light-image.png"; // ← غيّر ده بمسار الصورة التانية

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("light-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        heroImg.src = lightImg;
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        heroImg.src = darkImg;
      }
    });
    const certModalData = {
      aws: {
        img: 'img/aws-cert.jpg', // حط صورة الشهادة هنا
        title: 'AWS Academy Cloud Foundations',
        verify: 'https://www.credly.com/go/y49uCTp1'
      },
      meta: {
        img: 'img/meta-cert.jpg', // حط صورة شهادة الميتا هنا
        title: 'Meta Front-End Developer Professional Certificate',
        verify: 'https://coursera.org/verify/professional-cert/YEKZOR0ZWWD5'
      }
    };

    function openCertModal(key) {
      const modal = document.getElementById('certModal');
      const data = certModalData[key];

      if (!modal || !data) return;

      document.getElementById('certModalImg').src = data.img;
      document.getElementById('certModalTitle').textContent = data.title;
      document.getElementById('certModalVerify').href = data.verify;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeCertModal(e) {
      const modal = document.getElementById('certModal');
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('certModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  
