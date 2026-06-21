/* ═══════════════════════════════════════
   ABOUT PAGE — JavaScript
═══════════════════════════════════════ */

'use strict';

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    setTimeout(() => pre.classList.add('loaded'), 800);
  }
});

/* ─── AOS INIT ─── */
AOS.init({
  duration: 750,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60
});

/* ─── NAVBAR SCROLL ─── */
const mainNav = document.querySelector('.main-nav');
window.addEventListener('scroll', () => {
  if (mainNav) {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }
});

/* ─── BACK TO TOP ─── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 300);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── ACTIVE SIDE ICON on scroll ─── */
const sideButtons = document.querySelectorAll('.side-icon-btn');
const sections = [
  { id: 'about-hero',    btn: 0 },
  { id: 'about-story',   btn: 1 },
  { id: 'about-values',  btn: 2 },
  { id: 'about-team',    btn: 3 },
  { id: 'about-contact', btn: 4 }
];

function updateSideNav() {
  const scrollY = window.scrollY + 200;
  let activeIndex = 0;
  sections.forEach((s, i) => {
    const el = document.getElementById(s.id);
    if (el && el.offsetTop <= scrollY) activeIndex = i;
  });
  sideButtons.forEach((b, i) => {
    b.classList.toggle('active-side', i === sections[activeIndex]?.btn);
  });
}
window.addEventListener('scroll', updateSideNav);
updateSideNav();

/* ─── COUNT-UP ANIMATION ─── */
function countUp(el, target, suffix) {
  const duration = 2000;
  const step = 16;
  const steps = Math.ceil(duration / step);
  let current = 0;
  const inc = target / steps;

  const timer = setInterval(() => {
    current += inc;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current) + suffix;
  }, step);
}

/* Use IntersectionObserver so count runs when stats strip enters viewport */
const statNums = document.querySelectorAll('.stat-num');
if ('IntersectionObserver' in window && statNums.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        countUp(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(n => observer.observe(n));
}

/* ─── SMOOTH NAV SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
      // close mobile menu if open
      const menu = document.getElementById('navMenu');
      if (menu && menu.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    }
  });
});

/* ─── CONTACT FORM ─── */
const ctaForm = document.getElementById('ctaForm');
if (ctaForm) {
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = ctaForm.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#28a745';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        ctaForm.reset();
      }, 2500);
    }, 1200);
  });
}

/* ─── TECH PILL HOVER STAGGER ─── */
const techPills = document.querySelectorAll('.tech-pill');
techPills.forEach((pill, i) => {
  pill.style.transitionDelay = (i * 0.025) + 's';
});

/* ─── PARALLAX on hero badges (subtle) ─── */
const ahBadges = document.querySelectorAll('.ah-badge');
const wfcCards = document.querySelectorAll('.why-floating-card');

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  ahBadges.forEach((b, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    b.style.transform = `translate(${x * dir}px, ${y * dir}px)`;
  });
  wfcCards.forEach((c, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    c.style.transform = `translate(${x * 0.5 * dir}px, ${y * 0.5 * dir}px)`;
  });
});
