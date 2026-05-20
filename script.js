// ═══════════════════════════════════════════
// MONTE VERDE PRODUCE — mv_script.js
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER MENU (móvil) ──
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('navMobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      navMobile.classList.toggle('open');
      const isOpen = navMobile.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer click en un enlace
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
      });
    });
  }

  // ── NAVBAR: sombra al hacer scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
    } else {
      navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
    }
  }, { passive: true });

  // ── FORMULARIO DE CONTACTO ──
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Limpiar errores previos
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

      // Validación básica
      let valid = true;
      const nombre  = form.querySelector('#nombre');
      const email   = form.querySelector('#email');
      const mensaje = form.querySelector('#mensaje');

      if (!nombre.value.trim()) { nombre.classList.add('error'); valid = false; }
      if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; }
      if (!mensaje.value.trim()) { mensaje.classList.add('error'); valid = false; }

      if (!valid) return;

      // Simular envío
      const btn = form.querySelector('.form-btn');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.innerHTML = '<i class="ti ti-send"></i> Enviar mensaje';
        btn.disabled = false;
        formSuccess.classList.add('visible');

        setTimeout(() => {
          formSuccess.classList.remove('visible');
        }, 5000);
      }, 1200);
    });
  }

  // ── ANIMACIÓN DE ENTRADA (Intersection Observer) ──
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar a pilares, pasos y tarjetas
  document.querySelectorAll('.pillar, .step, .mv-card, .stat-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`;
    observer.observe(el);
  });

  // Clase para activar animación
  document.querySelectorAll('.pillar, .step, .mv-card, .stat-card').forEach(el => {
    el.classList.add('animate-target');
  });

});

// Agregar estilo de animación al document
const animStyle = document.createElement('style');
animStyle.textContent = `
  .pillar.visible,
  .step.visible,
  .mv-card.visible,
  .stat-card.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(animStyle);
