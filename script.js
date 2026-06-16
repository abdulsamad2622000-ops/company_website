
document.querySelectorAll(".nav-links a").forEach(link=>{
link.addEventListener("click",()=>{
links.classList.remove("active");
});
});

// Navbar functionality
const navbar = document.getElementById("navbar");
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
// Navbar scroll effect (unchanged)
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile menu toggle (unchanged)
if(toggle && links){
toggle.addEventListener("click", () => {
links.classList.toggle("active");
});
}

// Hero slides functionality (unchanged)
const slides = document.querySelectorAll(".slide");
const lines = document.querySelectorAll(".line");
const slideCount = document.querySelector(".slide-count");

let index = 0;
let interval;

// Slide navigation (unchanged)
function goToSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  lines.forEach(line => line.classList.remove("active"));

  index = (i + slides.length) % slides.length;
  slides[index].classList.add("active");
  lines[index].classList.add("active");

  slideCount.textContent = `Slide ${index + 1} / ${slides.length}`;
  resetAutoSlide();
}

// Line click for slides (unchanged)
lines.forEach((line, i) => {
  line.addEventListener("click", () => goToSlide(i));
});

// Auto-slide functionality (unchanged)
function startAutoSlide(){
clearInterval(interval);
interval = setInterval(() => {
goToSlide(index + 1);
},6000);
}

function resetAutoSlide() {
  clearInterval(interval);
  startAutoSlide();
}

startAutoSlide();



// Quick Bytes Counter Animation (unchanged)
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll('.block');

    function animateCounter(element, target) {
      let current = 1;
      const increment = target > 100 ? Math.ceil(target / 100) : 1;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = current + '+';
      }, 50);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const counter = entry.target.querySelector('.counter');
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(counter, target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    blocks.forEach((block) => observer.observe(block));
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".testimonials .t-slide"); // renamed in HTML
  const dots = document.querySelectorAll(".testimonials .dot");
  const nextBtn = document.querySelector(".testimonials .next");
  const prevBtn = document.querySelector(".testimonials .prev");

  let index = 0;

  function showSlide(newIndex) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.style.opacity = 0;
      slide.style.transform = "translateX(100%)";

      if (i === newIndex) {
        slide.classList.add("active");
        slide.style.opacity = 1;
        slide.style.transform = "translateX(0)";
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === newIndex);
    });
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      showSlide(index);
    });
  });

  // Initialize first slide
  showSlide(index);
});

// Intersection Observer for animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

      
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
 btn.innerHTML = "Sent ✓";
btn.style.background = "#22c55e";
btn.disabled = true;
});


// ===== SCROLL ANIMATION OBSERVER =====
const scrollEls = document.querySelectorAll('[data-scroll]');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { 
  threshold: 0.1,      // ← lower from 0.15 to 0.1
  rootMargin: '0px 0px -50px 0px'  // ← trigger slightly before element is fully visible
});

scrollEls.forEach(el => scrollObserver.observe(el));