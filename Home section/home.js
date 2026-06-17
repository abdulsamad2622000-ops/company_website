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