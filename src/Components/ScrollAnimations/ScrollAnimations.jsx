import React, { useEffect } from "react";

function ScrollAnimations() {
  useEffect(() => {
    const hiddenElements = document.querySelectorAll(".hidden");
    const navbar = document.querySelector(".navbar-brand");
    const h1 = document.querySelector(".first");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    // Observe hidden elements from different components

    hiddenElements.forEach((el) => observer.observe(el));

    const handleScroll = window.addEventListener("scroll", () => {
      const h1Bottom = h1.offsetTop + h1.offsetHeight;

      if (window.scrollY > h1Bottom) {
        navbar.classList.add("active");
      } else {
        navbar.classList.remove("active");
      }
    });
  });

  return null; // This component doesn't render anything itself
}

export default ScrollAnimations;
