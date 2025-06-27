/**
 * Rayhan Hameed Portfolio - script.js
 * Cinematic & Magical Interactive Experience
 * Handles: splash animation, audio, theme toggle, navigation,
 * particles, typewriter, form validation, and scroll effects
 */

// Global State
const APP_STATE = {
  audioMuted: false,
  splashComplete: false,
  animationsEnabled: true
};

const QUOTES = [
  "It does not do to dwell on dreams and forget to live. - Albus Dumbledore",
  "All we have to decide is what to do with the time that is given us. - Gandalf",
  "When you play the game of thrones, you win or you die. - Cersei Lannister",
  "I am inevitable. - Thanos",
  "With great power comes great responsibility. - Uncle Ben",
  "Not all those who wander are lost. - J.R.R. Tolkien"
];

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initializeAudio();
  initializeNavigation();
  initializeSplashScreen();
  initializeParticles();
  initializeTypewriter();
  initializeContactForm();
  initializeScrollAnimations();
  initializeQuoteRotation();
  initializeProjectModals();
  initializeResumeButton();
  
  console.log('🎬 Portfolio initialized successfully');
});

// Audio Management
function initializeAudio() {
  const audioToggle = document.getElementById('audioToggle');
  
  // Initialize sounds
  window.hoverSound = new Howl({ src: ['assets/audio/hover-chime.mp3'], volume: 0.5 });
  window.introSound = new Howl({ src: ['assets/audio/intro.mp3'], volume: 0.7 });
  
  // Set hover sound effects
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!APP_STATE.audioMuted) {
        hoverSound.play();
      }
    });
  });
  
  audioToggle.addEventListener('click', toggleAudio);
}

function toggleAudio() {
  APP_STATE.audioMuted = !APP_STATE.audioMuted;
  Howler.mute(APP_STATE.audioMuted);
  
  const audioToggle = document.getElementById('audioToggle');
  audioToggle.textContent = APP_STATE.audioMuted ? '🔇' : '🔊';
}

// Splash Screen
function initializeSplashScreen() {
  const splash = document.getElementById('splash');
  
  // Skip splash if reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hideSplash();
    return;
  }
  
  // Initialize particles for splash
  particlesJS('splashParticles', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffd700' },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    retina_detect: true
  });
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (!APP_STATE.splashComplete) {
      hideSplash();
    }
  }, 3000);
}

function hideSplash() {
  const splash = document.getElementById('splash');
  splash.classList.add('fade-out');
  APP_STATE.splashComplete = true;
  
  setTimeout(() => {
    splash.style.display = 'none';
    introSound.play();
  }, 1000);
}

// Particles for welcome section
function initializeParticles() {
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#ffd700' },
      shape: { type: 'circle' },
      opacity: { value: 0.3, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: false }
      }
    },
    retina_detect: true
  });
}

// Typewriter Effect
function initializeTypewriter() {
  const line1 = document.getElementById('typeLine1');
  const line2 = document.getElementById('typeLine2');
  
  if (line1 && line2) {
    typewriterEffect(line1, 'Welcome to My Portfolio', 0);
    setTimeout(() => {
      typewriterEffect(line2, 'Exploring the Intersection of Tech & Creativity', 0);
    }, 3500);
  }
}

function typewriterEffect(element, text, index) {
  if (index < text.length) {
    element.textContent = text.slice(0, index + 1);
    setTimeout(() => typewriterEffect(element, text, index + 1), 100);
  }
}

// Navigation
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const enterBtn = document.getElementById('enterBtn');
  
  // Hamburger menu
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  
  // Navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('open');
      }
    });
  });
  
  // Enter button
  enterBtn.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  // Highlight active nav link
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// Contact Form
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
  });
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  field.classList.remove('valid', 'invalid');
  
  switch (field.type) {
    case 'email':
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      break;
    case 'text':
      isValid = value.length >= 2;
      break;
    default:
      isValid = value.length >= 5;
  }
  
  if (field.hasAttribute('required')) {
    isValid = isValid && value.length > 0;
  }
  
  field.classList.add(isValid ? 'valid' : 'invalid');
  return isValid;
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Validate all fields
  const inputs = form.querySelectorAll('input, textarea');
  let allValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      allValid = false;
    }
  });
  
  if (allValid) {
    // Construct email
    const subject = "Contact from Portfolio";
    const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0AMessage: ${data.message}`;
    
    // Open email client
    window.location.href = `mailto:rayhanhameed5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Show success message
    showFormSuccess();
  } else {
    showFormError('Please fill in all fields correctly');
  }
}

function showFormSuccess() {
  const form = document.getElementById('contactForm');
  const message = document.createElement('div');
  message.className = 'form-message success';
  message.textContent = 'Message sent successfully! I will get back to you soon.';
  message.style.color = 'var(--clr-accent-gold)';
  message.style.textAlign = 'center';
  message.style.marginTop = '1rem';
  
  // Remove existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  form.appendChild(message);
  form.reset();
  
  setTimeout(() => message.remove(), 5000);
}

function showFormError(text) {
  const form = document.getElementById('contactForm');
  const message = document.createElement('div');
  message.className = 'form-message error';
  message.textContent = text;
  message.style.color = 'var(--clr-accent-red)';
  message.style.textAlign = 'center';
  message.style.marginTop = '1rem';
  
  // Remove existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  form.appendChild(message);
  setTimeout(() => message.remove(), 5000);
}

// Quote Rotation
function initializeQuoteRotation() {
  const quoteElement = document.getElementById('quoteRotator');
  if (!quoteElement) return;
  
  let currentQuoteIndex = 0;
  
  setInterval(() => {
    quoteElement.style.opacity = '0';
    
    setTimeout(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
      quoteElement.textContent = QUOTES[currentQuoteIndex];
      quoteElement.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Project Modals
function initializeProjectModals() {
  const detailsBtns = document.querySelectorAll('.detailsBtn');
  
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p').textContent;
      const tools = card.querySelector('.tools').textContent;
      
      showProjectModal({
        title,
        description,
        tools
      });
    });
  });
}

function showProjectModal(project) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <p><strong>Tools:</strong> ${project.tools}</p>
      <div class="modal-actions">
        <button class="modal-close-btn primaryBtn">Close</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.opacity = '0';
  
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
  
  // Close handlers
  const closeBtn = modal.querySelector('.modal-close');
  const closeBtn2 = modal.querySelector('.modal-close-btn');
  
  closeBtn.addEventListener('click', () => closeModal(modal));
  closeBtn2.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal(modal);
  });
}

function closeModal(modal) {
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.remove();
  }, 300);
}

// Resume Button
function initializeResumeButton() {
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn.addEventListener('click', () => {
    window.open('assets/resume.pdf', '_blank');
  });
}

// Scroll Animations
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.3s ease;
  }
  
  .modal-content {
    background: var(--clr-bg-dark-alt);
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
    border: 1px solid var(--clr-glass-border);
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--clr-text-main);
    cursor: pointer;
  }
  
  .modal-actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }
  
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  section.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  input.valid, textarea.valid {
    border-color: var(--clr-accent-gold);
  }
  
  input.invalid, textarea.invalid {
    border-color: var(--clr-accent-red);
  }
`;
document.head.appendChild(style);
