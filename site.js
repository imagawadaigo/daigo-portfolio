/* Custom cursor + nav scroll state + reveal observer */
(function () {
  document.documentElement.classList.remove("no-js");

  // ----- Custom cursor -----
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let tx = -100, ty = -100;
  let rx = -100, ry = -100;
  let mx = -100, my = -100;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    tx = mx; ty = my;
  });
  function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const hoverSel = "a, button, .case, .service, [data-cursor='hover']";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) {
      document.body.classList.add("cursor-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) {
      document.body.classList.remove("cursor-hover");
    }
  });

  // Hide custom cursor when leaving window
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0"; ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1"; ring.style.opacity = "1";
  });

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
