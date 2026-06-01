/**
 * Hero loader + orbit sync.
 *
 * The "back" and "front" SVGs each contain their own copy of the orbiting
 * star. Because both copies share identical `dur` and `begin` values, the
 * browser plays them in lockstep — when one star reaches the top half of the
 * ellipse it's revealed by the back SVG (behind the portrait); when it swings
 * to the bottom half, the front SVG shows it instead. The result reads as a
 * single star orbiting through the rings around the image.
 */

(function () {
  const body = document.body;

  // Reveal sequence: collapse the loader rectangle, draw the rings,
  // fade the text in.
  const reveal = () => body.classList.remove("is-loading");

  if (document.readyState === "complete") {
    setTimeout(reveal, 250);
  } else {
    window.addEventListener("load", () => setTimeout(reveal, 250));
  }

  // Failsafe — never leave the loader stuck.
  setTimeout(reveal, 2200);

  // Restart the SVG motion clocks together after the loader finishes,
  // so the back/front pairs stay perfectly aligned even if the tab was
  // throttled while loading.
  const resyncOrbits = () => {
    const svgs = document.querySelectorAll(".rings");
    svgs.forEach((svg) => {
      if (typeof svg.setCurrentTime === "function") {
        try { svg.setCurrentTime(0); } catch (_) { /* no-op */ }
      }
    });
  };

  window.addEventListener("load", () => {
    // small delay so the resync happens after the reveal transition starts
    setTimeout(resyncOrbits, 300);
  });
})();