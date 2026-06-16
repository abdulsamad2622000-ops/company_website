document.addEventListener('DOMContentLoaded', () => {
  // Testimonials Logic
  const testimonials = document.querySelectorAll('.testimonial');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  let index = 0;

  function updateTestimonial() {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });
  }

  next.addEventListener('click', () => {
    index = (index + 1) % testimonials.length;
    updateTestimonial();
  });

  prev.addEventListener('click', () => {
    index = (index - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
  });

  // Intersection Observer Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('[data-anim]').forEach((el) => observer.observe(el));
});