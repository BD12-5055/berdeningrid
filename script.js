(function () {
  const body = document.body;

  // Reveal sequence
  const reveal = () => body.classList.remove("is-loading");

  if (document.readyState === "complete") {
    setTimeout(reveal, 250);
  } else {
    window.addEventListener("load", () => setTimeout(reveal, 250));
  }

  setTimeout(reveal, 2200);

  // Sync orbit SVG clocks
  const resyncOrbits = () => {
    const svgs = document.querySelectorAll(".rings");
    svgs.forEach((svg) => {
      if (typeof svg.setCurrentTime === "function") {
        try { svg.setCurrentTime(0); } catch (_) { /* no-op */ }
      }
    });
  };

  window.addEventListener("load", () => {
    setTimeout(resyncOrbits, 300);
  });

  // ---------- Pricing Interactive Switcher ----------
  const pricingData = {
    "1": { 
      tag: "Solidares", 
      inIntakeOld: "100€", inIntakeNew: "85€",
      inOpvolgOld: "70€",  inOpvolgNew: "55€", 
      outIntakeOld: "90€", outIntakeNew: "75€",
      outOpvolgOld: "60€", outOpvolgNew: "45€" 
    },
    "2": { 
      tag: "Helan", 
      inIntakeOld: "100€", inIntakeNew: "80€",
      inOpvolgOld: "70€",  inOpvolgNew: "50€", 
      outIntakeOld: "90€", outIntakeNew: "70€",
      outOpvolgOld: "60€", outOpvolgNew: "40€" 
    },
    "3": { 
      tag: "Liberale Mutualiteit", 
      inIntakeOld: "100€", inIntakeNew: "85€",
      inOpvolgOld: "70€",  inOpvolgNew: "55€", 
      outIntakeOld: "90€", outIntakeNew: "75€",
      outOpvolgOld: "60€", outOpvolgNew: "45€" 
    },
    "4": { 
      tag: "Vlaams & Neutraal Ziekenfonds", 
      inIntakeOld: "100€", inIntakeNew: "90€",
      inOpvolgOld: "70€",  inOpvolgNew: "60€", 
      outIntakeOld: "90€", outIntakeNew: "80€",
      outOpvolgOld: "60€", outOpvolgNew: "50€" 
    }
  };

  const selectorBtns = document.querySelectorAll(".selector-btn");
  const pricingFrame = document.getElementById("pricing-frame");
  const pricingTag = document.getElementById("pricing-tag");
  
  // Grab all the old and new price elements
  const pInIntakeOld = document.getElementById("price-in-intake-old");
  const pInIntakeNew = document.getElementById("price-in-intake-new");
  
  const pInOpvolgOld = document.getElementById("price-in-opvolg-old");
  const pInOpvolgNew = document.getElementById("price-in-opvolg-new");
  
  const pOutIntakeOld = document.getElementById("price-out-intake-old");
  const pOutIntakeNew = document.getElementById("price-out-intake-new");
  
  const pOutOpvolgOld = document.getElementById("price-out-opvolg-old");
  const pOutOpvolgNew = document.getElementById("price-out-opvolg-new");

  selectorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      const option = btn.getAttribute("data-option");
      const data = pricingData[option];

      if (!data) return;

      // Update button states
      selectorBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-checked", "true");

      // Smooth blur transition out
      pricingFrame.classList.add("is-blurring");

      setTimeout(() => {
        // Update content during peak blur
        pricingTag.textContent = data.tag;
        
        pInIntakeOld.textContent = data.inIntakeOld;
        pInIntakeNew.textContent = data.inIntakeNew;
        
        pInOpvolgOld.textContent = data.inOpvolgOld;
        pInOpvolgNew.textContent = data.inOpvolgNew;
        
        pOutIntakeOld.textContent = data.outIntakeOld;
        pOutIntakeNew.textContent = data.outIntakeNew;
        
        pOutOpvolgOld.textContent = data.outOpvolgOld;
        pOutOpvolgNew.textContent = data.outOpvolgNew;

        // Transition back in
        pricingFrame.classList.remove("is-blurring");
      }, 200);
    });
  });
})();