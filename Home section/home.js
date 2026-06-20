  /* COUNT-UP on stat numbers */
document.addEventListener('DOMContentLoaded', () => {
  const nums = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      const dur    = 1600;
      const step   = 16;
      const steps  = dur / step;
      let cur = 0;
      const timer = setInterval(() => {
        cur += target / steps;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = Math.floor(cur) + suffix;
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => observer.observe(n));
});
const pgRing  = document.getElementById('pgRing');
const pgPctEl = document.getElementById('pgPct');
const pgBtn   = document.getElementById('scrollProgressBtn');
const CIRC    = 188.5;   /* 2 * π * 30 */
let   pgPct   = 0;

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const maxScroll  = document.body.scrollHeight - window.innerHeight;
  pgPct = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;

  pgBtn.style.display = scrollTop > 120 ? 'block' : 'none';
  pgRing.style.strokeDashoffset = CIRC - (pgPct / 100) * CIRC;
  if (pgPctEl) pgPctEl.textContent = pgPct + '%';
});

function handleScrollBtn() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('hidden');
      animateCounters();
    }, 2200);
  });
 
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
 
  function animateCounters() {
    [{el:'cnt1',end:850},{el:'cnt2',end:320},{el:'cnt3',end:45}].forEach(({el,end}) => {
      let v = 0; const step = Math.ceil(end/50);
      const t = setInterval(() => {
        v = Math.min(v+step, end);
        document.getElementById(el).textContent = v+'+';
        if(v>=end) clearInterval(t);
      }, 28);
    });
  }
 
  const secs = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur='';
    secs.forEach(s => { if(window.scrollY >= s.offsetTop-110) cur=s.id; });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href')==='#'+cur);
    });
  });

  /* SCROLL ANIMATION - Sections slide in alternately from right to left and left to right */
  const scrollAnimateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const sectionIndex = Array.from(document.querySelectorAll('section')).indexOf(element);
        
        // Alternate animation: even sections from right, odd sections from left
        if (sectionIndex % 2 === 0) {
          element.classList.add('animate-right');
        } else {
          element.classList.add('animate-left');
        }
        
        scrollAnimateObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });

  // Apply scroll animation to all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    scrollAnimateObserver.observe(section);
  });
/* ============================================
   TECKKO - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 400);
  });

  /* ---------- AOS Init ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  /* ---------- Sticky Navbar on Scroll ---------- */
  const mainNav = document.getElementById('mainNav');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  /* ---------- Back To Top ---------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Smooth Scroll for nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // collapse mobile nav after click
          const navMenu = document.getElementById('navMenu');
          if (navMenu.classList.contains('show')) {
            bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
          }
        }
      }
    });
  });

  /* ---------- Animated Counters (stat cards) ---------- */
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      }
      requestAnimationFrame(updateCount);
    });
  }

  const statSection = document.querySelector('.hero-section');
  if (statSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statSection);
  }

  /* ---------- Close Promo Strip ---------- */
  const closePromo = document.getElementById('closePromo');
  const promoStrip = document.getElementById('promoStrip');
  if (closePromo) {
    closePromo.addEventListener('click', function () {
      promoStrip.classList.add('hide');
    });
  }

  /* ---------- Team Slider Arrows (visual feedback + scroll carousel of cards) ---------- */
  const teamPrev = document.getElementById('teamPrev');
  const teamNext = document.getElementById('teamNext');
  if (teamPrev && teamNext) {
    teamNext.addEventListener('click', function () {
      teamNext.classList.add('active');
      teamPrev.classList.remove('active');
    });
    teamPrev.addEventListener('click', function () {
      teamPrev.classList.add('active');
      teamNext.classList.remove('active');
    });
  }

  /* ---------- Contact Form Submit (demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i> Message Sent!';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }

});

