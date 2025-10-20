(function () {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  function revealHeader() {
    const header = document.querySelector(".header");
    if (!header) return;
    header.classList.add("revealed");
  }

  function revealCards() {
    const cards = Array.from(document.querySelectorAll(".flower-card"));
    cards.forEach((c, i) => {
      setTimeout(() => c.classList.add("animate"), i * 120);
    });
  }

  function parallax(e) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const x = (e.clientX - w / 2) / w;
    const y = (e.clientY - h / 2) / h;

    document.querySelectorAll(".bg-circle").forEach((el, idx) => {
      const depth = (idx + 1) * 6;
      el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    revealHeader();
    revealCards();

    if (window.innerWidth > 600) {
      let throttled = false;
      window.addEventListener("mousemove", (e) => {
        if (throttled) return;
        throttled = true;
        requestAnimationFrame(() => {
          parallax(e);
          throttled = false;
        });
      });
    }
  });
})();
