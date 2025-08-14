// Typewriter effect setup
const line = "Designing reliable systems with clean UX & secure foundations.";
const target = document.getElementById('typewriter');
let i = 0;
let typingTimeout;

function type() {
  if (!target) return;
  if (i <= line.length) {
    target.textContent = line.slice(0, i++);
    typingTimeout = setTimeout(type, 40);
  }
}

function resetTypewriter() {
  clearTimeout(typingTimeout);
  i = 0;
  if (target) target.textContent = '';
  type();
}

// IntersectionObserver for hero section to reset typewriter on scroll-in
const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      resetTypewriter();
    }
  });
}, { threshold: 0.5 });

if (heroSection) {
  heroObserver.observe(heroSection);
}

// Reveal effect for .reveal elements that toggles visibility on scroll in/out
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

// Parallax engine: Move .bg faster than content with requestAnimationFrame for better performance
const sections = Array.from(document.querySelectorAll('.parallax'));
const speedMap = new Map();
sections.forEach(sec => speedMap.set(sec, sec.id === 'hero' ? 0.25 : 0.45));

function parallax() {
  const viewportTop = window.scrollY;
  const viewportH = window.innerHeight;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    const secTop = rect.top + viewportTop; // absolute top
    const progress = (viewportTop - secTop + viewportH) / (rect.height + viewportH);
    const speed = speedMap.get(sec) || 0.4; // higher = faster bg
    const translate = Math.max(-60, Math.min(60, (progress * 120) * speed));
    const bg = sec.querySelector('.bg');
    if (bg) { bg.style.transform = `translateY(${translate}px)`; }
  });
}

let ticking = false;
document.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      parallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener('resize', parallax);
window.addEventListener('load', parallax);

// Contact form toast instead of alert and form reset
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Thank you for reaching out! Mohammed will get back to you soon.');
    form.reset();
  });
}

// Minimal toast function styled with your portfolio colors
function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = `
    position: fixed;
    left: 50%;
    top: 28px;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 12px 16px;
    color: #fff;
    border-radius: 12px;
    box-shadow: ${getComputedStyle(document.documentElement).getPropertyValue('--shadow')};
    backdrop-filter: blur(8px);
  `;
  t.style.background = 'linear-gradient(135deg,var(--accent),var(--accent-2))'; // Accent gradient
  t.style.border = 'none';

  document.body.appendChild(t);
  setTimeout(() => {
    t.style.transition = 'opacity .5s ease, transform .5s ease';
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(-8px)';
  }, 2000);
  setTimeout(() => t.remove(), 2600);
}

// Scrollspy to highlight nav links based on scroll position
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 80; // adjust offset to your header height

  navLinks.forEach(link => {
    let section = document.querySelector(link.getAttribute('href'));
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
