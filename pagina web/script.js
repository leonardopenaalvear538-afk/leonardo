// ========================================
// BASE DE DATOS DE FOTOS - GALERÍA
// Para agregar más fotos: copia una línea, cambia el src, title, desc y cat
// Categorías disponibles: puertas, rejas, escaleras, ventanas, ornamental
// ========================================
const galleryData = [
  // ============ PUERTAS ============
  {
    src: "images/soldadura-puerta-industrial.jpg",
    title: "Puerta Industrial en Proceso",
    desc: "Soldadura profesional de gran formato",
    cat: "puertas",
  },
  {
    src: "images/puerta-rejilla-negra.jpg",
    title: "Puerta Metálica con Rejilla",
    desc: "Diseño moderno con ventilación integrada",
    cat: "puertas",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.36.19-AM.jpeg",
    title: "Portón de Garaje Metálico",
    desc: "Portón con barrotes verticales de gran formato",
    cat: "puertas",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.19-AM-(5).jpeg",
    title: "Reja y Puerta Residencial",
    desc: "Protección frontal completa para vivienda",
    cat: "puertas",
  },

  // ============ REJAS ============
  {
    src: "images/reja-ornamental-exterior.jpg",
    title: "Reja Ornamental de Fachada",
    desc: "Diseño elegante con patrón decorativo",
    cat: "rejas",
  },
  {
    src: "images/estructura-ornamental-grande.jpeg",
    title: "Estructura Ornamental de Fachada",
    desc: "Trabajo de gran envergadura con diseño moderno",
    cat: "rejas",
  },
  {
    src: "images/reja-fachada-completa.jpeg",
    title: "Reja de Fachada Completa",
    desc: "Protección total con diseño arquitectónico",
    cat: "rejas",
  },

  // ============ ESCALERAS ============
  {
    src: "images/escalera-metalica-industrial.jpeg",
    title: "Escalera Metálica Industrial",
    desc: "Estructura robusta con peldaños antideslizantes",
    cat: "escaleras",
  },
  {
    src: "images/baranda-metalica-moderna.jpeg",
    title: "Baranda Metálica Moderna",
    desc: "Diseño minimalista con acabado negro mate",
    cat: "escaleras",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.19-AM-(4).jpeg",
    title: "Escalera Flotante con Baranda",
    desc: "Diseño moderno con peldaños de madera y estructura metálica",
    cat: "escaleras",
  },

  // ============ VENTANAS ============
  {
    src: "images/volqueta-metalica.jpg",
    title: "Estructura Metálica Pesada",
    desc: "Soldadura industrial de alta resistencia",
    cat: "ventanas",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.18-AM.jpeg",
    title: "Sistema de Ductos Metálicos",
    desc: "Instalación de ductos y extracción en acero inoxidable",
    cat: "ventanas",
  },

  // ============ ORNAMENTAL ============
  {
    src: "images/estructura-techo-metalico.jpeg",
    title: "Estructura de Techo Metálico",
    desc: "Cercha y estructura de cubierta soldada",
    cat: "ornamental",
  },
  {
    src: "images/taller-soldadura-profesional.jpeg",
    title: "Taller de Soldadura Profesional",
    desc: "Equipamiento y experiencia garantizada",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.36.19-AM-(3).jpeg",
    title: "Cercha Metálica Pintada",
    desc: "Estructura triangular con acabado en pintura amarilla",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.19-AM-(1).jpeg",
    title: "Estructura de Cubierta Grande",
    desc: "Vigas metálicas para cubierta de bodega",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.19-AM-(2).jpeg",
    title: "Bodega con Estructura Metálica",
    desc: "Cubierta y cerchas para espacio industrial",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.19-AM-(3).jpeg",
    title: "Estructura Vigas de Acero",
    desc: "Vigas de perfil H para construcción de segundo piso",
    cat: "ornamental",
  },

  // ============ SOLDADURA ============
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.20-AM-(1).jpeg",
    title: "Soldadura en Altura",
    desc: "Trabajo especializado con arnés de seguridad",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.20-AM-(2).jpeg",
    title: "Mezzanine Metálico",
    desc: "Estructura de segundo piso industrial con escalera",
    cat: "ornamental",
  },
  {
    src: "images/WhatsApp-Image-2026-02-18-at-1.50.20-AM-(3).jpeg",
    title: "Estructura de Entrepiso",
    desc: "Vigas y estructura metálica para mezzanine",
    cat: "ornamental",
  },
];

// ========================================
// SISTEMA DE GALERÍA DINÁMICA
// ========================================
const PHOTOS_PER_PAGE = 12;
let currentPage = 1;
let currentFilter = "all";
let displayedPhotos = 0;

function getFilteredPhotos() {
  if (currentFilter === "all") return galleryData;
  return galleryData.filter((photo) => photo.cat === currentFilter);
}

function createGalleryItem(photo, index) {
  const div = document.createElement("div");
  div.className = "gallery-item";
  div.setAttribute("data-category", photo.cat);
  div.style.animationDelay = `${(index % 6) * 0.1}s`;

  div.innerHTML = `
        <div class="gallery-image">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="gallery-overlay">
                <h3>${photo.title}</h3>
                <p>${photo.desc}</p>
                <button class="view-btn" onclick="openLightbox(this)">
                    <i class="fas fa-search-plus"></i> Ver más
                </button>
            </div>
        </div>
    `;
  return div;
}

function loadGallery() {
  const grid = document.getElementById("galleryGrid");
  const filtered = getFilteredPhotos();
  const end = currentPage * PHOTOS_PER_PAGE;
  const photosToShow = filtered.slice(0, end);

  grid.innerHTML = "";
  photosToShow.forEach((photo, i) => {
    grid.appendChild(createGalleryItem(photo, i));
  });

  displayedPhotos = photosToShow.length;
  updateLoadMoreButton(filtered.length);
  updatePhotosCount(filtered.length);
}

function loadMorePhotos() {
  currentPage++;
  loadGallery();
}

function updateLoadMoreButton(totalPhotos) {
  const btn = document.getElementById("loadMoreBtn");
  if (displayedPhotos >= totalPhotos) {
    btn.style.display = "none";
  } else {
    btn.style.display = "inline-flex";
    const remaining = totalPhotos - displayedPhotos;
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> Ver Más Trabajos (${remaining} más)`;
  }
}

function updatePhotosCount(total) {
  const counter = document.getElementById("photosCount");
  counter.textContent = `Mostrando ${displayedPhotos} de ${total} trabajos`;
}

// ========================================
// NAVEGACIÓN
// ========================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// ========================================
// GALERÍA - FILTROS
// ========================================
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.getAttribute("data-filter");
    currentPage = 1;
    loadGallery();
  });
});

// ========================================
// LIGHTBOX
// ========================================
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
let currentImageIndex = 0;
let currentImages = [];

function openLightbox(button) {
  const galleryItem = button.closest(".gallery-item");
  const image = galleryItem.querySelector("img");
  const title = galleryItem.querySelector("h3").textContent;
  const description = galleryItem.querySelector("p").textContent;

  const visibleItems = Array.from(document.querySelectorAll(".gallery-item"));
  currentImages = visibleItems.map((item) => ({
    src: item.querySelector("img").src,
    title: item.querySelector("h3").textContent,
    description: item.querySelector("p").textContent,
  }));

  currentImageIndex = visibleItems.indexOf(galleryItem);

  lightboxImage.src = image.src;
  lightboxTitle.textContent = title;
  lightboxDescription.textContent = description;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

function changeLightboxImage(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = currentImages.length - 1;
  if (currentImageIndex >= currentImages.length) currentImageIndex = 0;

  const currentImage = currentImages[currentImageIndex];
  lightboxImage.src = currentImage.src;
  lightboxTitle.textContent = currentImage.title;
  lightboxDescription.textContent = currentImage.description;
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  else if (e.key === "ArrowLeft") changeLightboxImage(-1);
  else if (e.key === "ArrowRight") changeLightboxImage(1);
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    message: document.getElementById("message").value,
  };

  // Construir mensaje para WhatsApp
  const whatsappMessage =
    `🔧 *NUEVA COTIZACIÓN - INTERNATIONAL COMPANY S.A.S*%0A%0A` +
    `👤 *Nombre:* ${formData.name}%0A` +
    `📧 *Email:* ${formData.email}%0A` +
    `📱 *Teléfono:* ${formData.phone}%0A` +
    `🛠️ *Servicio:* ${formData.service}%0A` +
    `💬 *Mensaje:* ${formData.message}`;

  // Abrir WhatsApp con el mensaje
  const whatsappURL = `https://wa.me/573115050660?text=${whatsappMessage}`;
  window.open(whatsappURL, "_blank");

  showNotification(
    "¡Redirigiendo a WhatsApp para enviar tu cotización!",
    "success",
  );
  contactForm.reset();
});

// ========================================
// NOTIFICACIONES
// ========================================
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `;

  if (!document.getElementById("notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            .notification { position: fixed; top: 100px; right: 2rem; background: var(--bg-card); color: var(--text-primary); padding: 1.5rem 2rem; border-radius: 10px; border-left: 4px solid var(--primary-color); box-shadow: var(--shadow-lg); z-index: 10000; display: flex; align-items: center; gap: 1rem; animation: slideIn 0.3s ease; max-width: 400px; }
            .notification.success { border-left-color: #25d366; }
            .notification.error { border-left-color: #ff6b35; }
            .notification i { font-size: 1.5rem; color: var(--primary-color); }
            .notification.success i { color: #25d366; }
            .notification.error i { color: #ff6b35; }
            @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// ========================================
// ANIMACIONES AL SCROLL
// ========================================
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// ========================================
// EFECTO TYPEWRITER - HERO
// ========================================
const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
  const words = [
    "Puertas Metálicas",
    "Rejas y Protecciones",
    "Escaleras",
    "Soldadura Profesional",
    "Ornamentación",
    "Estructuras de Metal",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1800; // pausa al terminar de escribir
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400; // pausa antes de siguiente palabra
    }

    setTimeout(typeEffect, speed);
  }

  setTimeout(typeEffect, 800);
}

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .info-card, .feature-item",
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Cargar galería dinámica
  loadGallery();
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  });
});

// ========================================
// CONTADOR ANIMADO
// ========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "%");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(start) + (element.textContent.includes("+") ? "+" : "%");
    }
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const number = entry.target.querySelector(".stat-number");
        const targetValue = parseInt(number.textContent);
        const hasPlus = number.textContent.includes("+");
        const hasPercent = number.textContent.includes("%");
        number.textContent = "0" + (hasPlus ? "+" : hasPercent ? "%" : "");
        animateCounter(number, targetValue);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat-item")
  .forEach((stat) => statsObserver.observe(stat));

// ========================================
// PRELOADER
// ========================================
window.addEventListener("load", () => document.body.classList.add("loaded"));

// ========================================
// SLIDESHOW AUTOMÁTICO
// ========================================
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  if (!slides.length) return;
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  slides[currentSlide].classList.add("active");
  if (indicators[currentSlide])
    indicators[currentSlide].classList.add("active");
}

function changeSlide(direction) {
  currentSlide += direction;
  showSlide(currentSlide);
  resetSlideInterval();
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
  resetSlideInterval();
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 4000);
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => goToSlide(index));
    });
    const slideshow = document.querySelector(".about-slideshow");
    if (slideshow) {
      slideshow.addEventListener("mouseenter", () =>
        clearInterval(slideInterval),
      );
      slideshow.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 4000);
      });
    }
  }
});

// ========================================
// ACTUALIZAR AÑO
// ========================================
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
  yearElement.innerHTML = yearElement.innerHTML.replace(
    "2026",
    new Date().getFullYear(),
  );
}

console.log("✨ INTERNATIONAL COMPANY S.A.S - Website cargado");
console.log(`📸 Galería: ${galleryData.length} fotos del cliente`);
