/* Nav scroll state + reveal observer + contact form */
(function () {
  document.documentElement.classList.remove("no-js");

  // ----- Nav scroll state -----
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Reveal on scroll -----
  const targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && targets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    targets.forEach((t) => io.observe(t));
  } else {
    targets.forEach((t) => t.classList.add("is-visible"));
  }

  // ----- Magnetic buttons -----
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // ----- Contact form -----
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = form.querySelector(".contact-form__submit");
      const label = btn.querySelector("span");
      const errEl = document.getElementById("cf-error");
      const successEl = document.getElementById("cf-success");

      btn.disabled = true;
      label.textContent = "送信中…";
      errEl.hidden = true;

      try {
        const res = await fetch("https://portfolio-contact.wishdaigo1458.workers.dev/contact", {
          method: "POST",
          body: new FormData(form),
        });
        const json = await res.json();
        if (json.ok) {
          form.hidden = true;
          successEl.hidden = false;
        } else {
          throw new Error(json.error);
        }
      } catch {
        errEl.hidden = false;
        btn.disabled = false;
        label.textContent = "送信する";
      }
    });
  }
})();
