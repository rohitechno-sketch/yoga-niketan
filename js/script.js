/* =========================================================
   Yoga Niketan — Site Script
   Minimal, dependency-free JavaScript.
   ========================================================= */

/* =========================================================
   OWNER SETTINGS
   Update the values below to change site-wide contact details.
   These are also mirrored in the HTML (About/Contact pages,
   footer) — update both places when the real details are known.
   ========================================================= */
const SITE_SETTINGS = {
  // Replace with the real WhatsApp number in international format,
  // digits only, no spaces or "+" (e.g. "919876543210").
  whatsappNumber: "REPLACE_WITH_NUMBER",
  whatsappMessage:
    "Hello Yoga Niketan, I would like to know more about your yoga classes.",
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initWhatsappButtons();
  initRevealAnimations();
  initGalleryFilters();
  initLightbox();
  initContactForm();
});

/* -------------------- Mobile Navigation -------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (!toggle || !navList) return;

  toggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu after a nav link is chosen.
  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* -------------------- WhatsApp Buttons -------------------- */
function initWhatsappButtons() {
  const buttons = document.querySelectorAll("[data-whatsapp-button]");
  if (!buttons.length) return;

  const url = `https://wa.me/${SITE_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    SITE_SETTINGS.whatsappMessage
  )}`;

  buttons.forEach((button) => {
    button.setAttribute("href", url);
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noopener noreferrer");
  });
}

/* -------------------- Reveal on Scroll -------------------- */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* -------------------- Gallery Filters -------------------- */
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll("[data-category]");
  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      const filter = button.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const matches = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

/* -------------------- Lightbox -------------------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
  if (!lightbox || !galleryButtons.length) return;

  const lightboxImg = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;
  let lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryButtons[currentIndex];
    const img = item.querySelector("img");
    lightboxImg.src = img.getAttribute("src");
    lightboxImg.alt = img.getAttribute("alt") || "";
    lightboxCaption.textContent = img.getAttribute("alt") || "";
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function showRelative(step) {
    const visibleItems = galleryButtons.filter(
      (item) => !item.classList.contains("is-hidden")
    );
    const visibleIndex = visibleItems.indexOf(galleryButtons[currentIndex]);
    const nextVisibleIndex =
      (visibleIndex + step + visibleItems.length) % visibleItems.length;
    const nextItem = visibleItems[nextVisibleIndex];
    openLightbox(galleryButtons.indexOf(nextItem));
  }

  galleryButtons.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showRelative(-1));
  nextBtn.addEventListener("click", () => showRelative(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showRelative(-1);
    if (event.key === "ArrowRight") showRelative(1);
  });
}

/* -------------------- Contact Form -------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // NOTE: This is a static, front-end-only website. Submitting this
  // form does not send data anywhere yet. To make it functional,
  // connect it to a service such as Formspree, Netlify Forms, or
  // EmailJS, or point the "action" attribute at a custom backend.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const successMessage = document.getElementById("form-success");
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.focus();
    }
    form.reset();
  });
}

