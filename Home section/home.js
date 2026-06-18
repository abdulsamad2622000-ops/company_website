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
 const pgRing = document.getElementById('pgRing');
  const pgArrow = document.getElementById('pgArrow');
  const pgBtn = document.getElementById('scrollProgressBtn');
  const circ = 144.5;
  let pgPct = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    pgPct = Math.round((scrollTop / maxScroll) * 100);
    pgBtn.style.display = scrollTop > 100 ? 'block' : 'none';
    pgRing.style.strokeDashoffset = circ - (pgPct / 100) * circ;
    pgArrow.setAttribute('d', pgPct >= 95
      ? 'M27 34 L27 20 M21 28 L27 34 L33 28'
      : 'M27 20 L27 34 M21 26 L27 20 L33 26');
  });

  function handleScrollBtn() {
    window.scrollTo({ top: pgPct >= 95 ? 0 : window.scrollY + 400, behavior: 'smooth' });
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

