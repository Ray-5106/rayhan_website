/**
 * Rayhan Hameed Portfolio - script.js
 * Cinematic & Magical Interactive Experience
 * Handles: splash animation, audio, theme toggle, navigation,
 * particles, typewriter, form validation, and scroll effects
 */

/********************************************
  Global State & Configuration
*********************************************/
const APP_STATE = {
  audioMuted: true,
  currentTheme: 'dark',
  splashComplete: false,
  animationsEnabled: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

const QUOTES = [
  "It does not do to dwell on dreams and forget to live. - Harry Potter",
  "All we have to decide is what to do with the time that is given us. - The Lord of the Rings",
  "When you play the game of thrones, you win or you die. - Game of Thrones",
  "I am inevitable. - Thanos",
  "With great power comes great responsibility. - Spiderman",
  "Not all those who wander are lost. - The Lord of the Rings"

];

/********************************************
  DOM Ready & Initialization
*********************************************/
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeAudio();
  initializeNavigation();
  initializeSplashScreen();
  initializeParticles();
  initializeTypewriter();
  initializeSkillsRadar();
  initializeContactForm();
  initializeScrollAnimations();
  initializeQuoteRotation();
  initializeProjectModals();
  
  console.log('🎬 Portfolio initialized successfully');
});

/********************************************
  Theme Management
*********************************************/
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  
  APP_STATE.currentTheme = savedTheme;
  document.body.setAttribute('data-theme', savedTheme);
  updateThemeIcon();
  
  themeToggle?.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const newTheme = APP_STATE.currentTheme === 'dark';
  APP_STATE.currentTheme = newTheme;
  
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  updateThemeIcon();
  
  // Animate theme transition
  document.body.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}



/********************************************
  Audio Management with Howler.js
*********************************************/
function initializeAudio() {
  const audioToggle = document.getElementById('audioToggle');
  
  // Initialize Howler sound (when library loads)
  if (typeof Howl !== 'undefined') {
    window.introSound = new Howl({
      src: ['./assets/audio/intro.mp3'],
      volume: 0.7,
      autoplay: false,
      onend: () => {
        console.log('🎵 Intro audio completed');
        startWelcomeSection();
      },
      onloaderror: (id, error) => {
        console.warn('Audio failed to load:', error);
        setTimeout(startWelcomeSection, 5000); // Fallback timing
      }
    });
  }
  
  audioToggle?.addEventListener('click', toggleAudio);
}

function toggleAudio() {
  const audioToggle = document.getElementById('audioToggle');
  APP_STATE.audioMuted = !APP_STATE.audioMuted;
  
  if (audioToggle) {
    audioToggle.textContent = APP_STATE.audioMuted ? '🔇' : '🔊';
    audioToggle.setAttribute('aria-pressed', !APP_STATE.audioMuted);
  }
  
  // Control intro audio if playing
  if (window.introSound && !APP_STATE.audioMuted && !APP_STATE.splashComplete) {
    window.introSound.play();
  } else if (window.introSound && APP_STATE.audioMuted) {
    window.introSound.pause();
  }
}

/********************************************
  Cinematic Splash Screen Animation
*********************************************/
function initializeSplashScreen() {
  const splash = document.getElementById('splash');
  if (!splash) return;
  
  // Skip splash if user prefers reduced motion
  if (!APP_STATE.animationsEnabled) {
    hideSplash();
    return;
  }
  
  // Start splash sequence
  setTimeout(() => animateRadarSweep(), 200);
  setTimeout(() => animateCircuitTraces(), 800);
  setTimeout(() => animateMagicalRunes(), 1400);
  setTimeout(() => animateBookGlyphs(), 2000);
  setTimeout(() => animateBlueprintLines(), 2600);
  setTimeout(() => animateInitialsConvergence(), 3200);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (!APP_STATE.splashComplete) {
      hideSplash();
    }
  }, 5000);
}

function animateRadarSweep() {
  const radar = document.getElementById('radar');
  const sweep = document.getElementById('sweep');
  
  if (radar && sweep) {
    radar.style.opacity = '1';
    sweep.style.transformOrigin = '200px 200px';
    sweep.style.animation = 'radarSweep 1.5s ease-in-out';
  }
}

function animateCircuitTraces() {
  const canvas = document.getElementById('circuit');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.opacity = '1';
  
  // Draw animated circuit lines
  drawCircuitLines(ctx, canvas.width, canvas.height);
}

function drawCircuitLines(ctx, width, height) {
  ctx.strokeStyle = '#00BFFF';
  ctx.lineWidth = 1;
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#00BFFF';
  
  // Create grid pattern
  const spacing = 40;
  for (let x = 0; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  for (let y = 0; y < height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function animateMagicalRunes() {
  const runes = document.getElementById('runes');
  if (runes) {
    runes.style.opacity = '1';
    runes.style.animation = 'runeGlow 2s ease-in-out';
  }
}

function animateBookGlyphs() {
  const glyphs = document.getElementById('glyphPages');
  if (glyphs) {
    glyphs.style.opacity = '1';
    const pages = glyphs.querySelectorAll('.page');
    pages.forEach((page, index) => {
      page.style.animation = `pageFlip 0.8s ease-in-out ${index * 0.2}s`;
    });
  }
}

function animateBlueprintLines() {
  const canvas = document.getElementById('blueprint');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.opacity = '1';
  
  // Draw blueprint-style lines
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  
  // Animate drawing effect
  animateLineDraw(ctx, canvas.width, canvas.height);
}

function animateLineDraw(ctx, width, height) {
  let progress = 0;
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    
    // Draw lines based on progress
    const lineLength = progress * Math.max(width, height);
    ctx.beginPath();
    ctx.moveTo(width/2, height/2);
    ctx.lineTo(width/2 + lineLength * Math.cos(progress * 4), 
               height/2 + lineLength * Math.sin(progress * 4));
    ctx.stroke();
    
    progress += 0.02;
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  animate();
}

function animateInitialsConvergence() {
  const initials = document.getElementById('initials');
  if (initials) {
    initials.style.opacity = '1';
    initials.style.animation = 'initialsGlow 1.5s ease-out';
  }
  
  // Start audio if not muted
  if (!APP_STATE.audioMuted && window.introSound) {
    window.introSound.play();
  }
}

function hideSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('fade-out');
    APP_STATE.splashComplete = true;
    setTimeout(() => {
      splash.style.display = 'none';
      startWelcomeSection();
    }, 500);
  }
}

function startWelcomeSection() {
  // Initialize welcome section animations
  initializeTypewriter();
  const enterBtn = document.getElementById('enterBtn');
  if (enterBtn) {
    enterBtn.style.opacity = '1';
    enterBtn.style.transform = 'translateY(0)';
  }
}

/********************************************
  Navigation & Smooth Scrolling
*********************************************/
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const scrollLinks = document.querySelectorAll('.scroll');
  const enterBtn = document.getElementById('enterBtn');
  
  // Hamburger menu toggle
  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  
  // Smooth scroll for navigation links
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu
        navLinks?.classList.remove('open');
      }
    });
  });
  
  // Enter button scroll to about
  enterBtn?.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
  
  // Navigation highlight on scroll
  window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/********************************************
  Particles.js Configuration
*********************************************/
function initializeParticles() {
  if (typeof particlesJS === 'undefined') return;
  
  particlesJS('particles-js', {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: '#FFD700' },
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

/********************************************
  Typewriter Effect
*********************************************/
function initializeTypewriter() {
  const line1 = document.getElementById('typeLine1');
  const line2 = document.getElementById('typeLine2');
  
  if (line1 && line2) {
    typewriterEffect(line1, 'Welcome, Prefect of Innovation.', 0);
    setTimeout(() => {
      typewriterEffect(line2, 'Your chamber awaits.', 0);
    }, 3500);
  }
}

function typewriterEffect(element, text, index) {
  if (index < text.length) {
    element.textContent = text.slice(0, index + 1);
    setTimeout(() => typewriterEffect(element, text, index + 1), 100);
  }
}

/********************************************
  Skills Radar Animation
*********************************************/
function initializeSkillsRadar() {
  const skillsSection = document.getElementById('skills');
  const radarContainer = document.querySelector('.skill-radar');
  
  if (!radarContainer) return;
  
  const skills = [
    { name: 'C++', x: 0.7, y: 0.3 },
    { name: 'Python', x: 0.3, y: 0.2 },
    { name: 'Arduino', x: 0.8, y: 0.7 },
    { name: 'Fusion 360', x: 0.2, y: 0.8 },
    { name: 'Public Speaking', x: 0.6, y: 0.9 },
    { name: 'Storytelling', x: 0.9, y: 0.4 }
  ];
  
  // Create skill nodes
  skills.forEach((skill, index) => {
    const node = document.createElement('div');
    node.className = 'skill-node';
    node.textContent = skill.name;
    node.style.position = 'absolute';
    node.style.left = `${skill.x * 100}%`;
    node.style.top = `${skill.y * 100}%`;
    node.style.transform = 'translate(-50%, -50%)';
    node.style.padding = '0.5rem 1rem';
    node.style.background = 'var(--clr-accent-blue)';
    node.style.borderRadius = '4px';
    node.style.cursor = 'pointer';
    node.style.transition = 'all 0.3s ease';
    
    node.addEventListener('mouseenter', () => {
      drawRadarLine(radarContainer, skill.x, skill.y);
    });
    
    radarContainer.appendChild(node);
  });
}

function drawRadarLine(container, x, y) {
  // Remove existing lines
  const existingLines = container.querySelectorAll('.radar-line');
  existingLines.forEach(line => line.remove());
  
  // Create new line
  const line = document.createElement('div');
  line.className = 'radar-line';
  line.style.position = 'absolute';
  line.style.left = '50%';
  line.style.top = '50%';
  line.style.width = `${Math.sqrt(Math.pow(x - 0.5, 2) + Math.pow(y - 0.5, 2)) * 100}%`;
  line.style.height = '2px';
  line.style.background = 'var(--clr-accent-gold)';
  line.style.transformOrigin = '0 50%';
  line.style.transform = `rotate(${Math.atan2(y - 0.5, x - 0.5) * 180 / Math.PI}deg)`;
  line.style.animation = 'radarPulse 0.5s ease-out';
  
  container.appendChild(line);
  
  // Remove line after animation
  setTimeout(() => line.remove(), 1000);
}

/********************************************
  Contact Form Validation
*********************************************/
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('input', () => validateField(input));
    input.addEventListener('blur', () => validateField(input));
  });
  
  form.addEventListener('submit', handleFormSubmit);
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;
  
  // Remove existing validation classes
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
    // Simulate form submission
    console.log('Form submitted:', data);
    showFormSuccess();
  } else {
    showFormError('Please fill in all fields correctly.');
  }
}

function showFormSuccess() {
  const form = document.getElementById('contactForm');
  const successMsg = document.createElement('div');
  successMsg.className = 'form-message success';
  successMsg.textContent = '✨ Message sent successfully! I\'ll get back to you soon.';
  successMsg.style.color = 'var(--clr-accent-gold)';
  successMsg.style.textAlign = 'center';
  successMsg.style.marginTop = '1rem';
  
  form.appendChild(successMsg);
  form.reset();
  
  setTimeout(() => successMsg.remove(), 5000);
}

function showFormError(message) {
  const form = document.getElementById('contactForm');
  const errorMsg = document.createElement('div');
  errorMsg.className = 'form-message error';
  errorMsg.textContent = message;
  errorMsg.style.color = 'var(--clr-accent-red)';
  errorMsg.style.textAlign = 'center';
  errorMsg.style.marginTop = '1rem';
  
  // Remove existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  form.appendChild(errorMsg);
  setTimeout(() => errorMsg.remove(), 5000);
}

/********************************************
  Scroll Animations & Intersection Observer
*********************************************/
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special animations for specific sections
        if (entry.target.id === 'highlights') {
          animateHighlightsBadges();
        }
        if (entry.target.id === 'journey') {
          animateTimeline();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

function animateHighlightsBadges() {
  const badges = document.querySelectorAll('.badge');
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.animation = 'slideInUp 0.6s ease-out forwards';
    }, index * 150);
  });
}

function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.animation = 'fadeInLeft 0.8s ease-out forwards';
    }, index * 200);
  });
}

/********************************************
  Quote Rotation
*********************************************/
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

/********************************************
  Project Modals
*********************************************/
function initializeProjectModals() {
  const exploreMissionBtn = document.getElementById('exploreMission');
  const detailsBtns = document.querySelectorAll('.detailsBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  
  exploreMissionBtn?.addEventListener('click', () => {
    showProjectModal({
      title: 'Autonomous Swarm Rover',
      description: 'Advanced multi-robot coordination system using distributed algorithms and real-time communication protocols.',
      technologies: ['C++', 'ROS', 'Computer Vision', 'Machine Learning'],
      github: 'https://github.com/rayhan/swarm-rover',
      demo: 'https://demo.example.com'
    });
  });
  
  detailsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p').textContent;
      
      showProjectModal({
        title,
        description,
        technologies: ['React', 'Node.js', 'MongoDB'],
        github: '#',
        demo: '#'
      });
    });
  });
  
  resumeBtn?.addEventListener('click', () => {
    // Open resume in new tab or modal
    window.open('./assets/resume.pdf', '_blank');
  });
}

function showProjectModal(project) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <div class="tech-stack">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="modal-actions">
        <a href="${project.github}" target="_blank" rel="noopener" class="primaryBtn">View Code</a>
        <a href="${project.demo}" target="_blank" rel="noopener" class="primaryBtn">Live Demo</a>
      </div>
    </div>
  `;
  
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  
  document.body.appendChild(modal);
  
  // Animate in
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
  
  // Close handlers
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
  
  // Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal(modal);
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

function closeModal(modal) {
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.remove();
  }, 300);
}

/********************************************
  Dynamic CSS Animations
*********************************************/
const style = document.createElement('style');
style.textContent = `
  @keyframes radarSweep {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes runeGlow {
    0%, 100% { opacity: 0; filter: brightness(1); }
    50% { opacity: 1; filter: brightness(1.5); }
  }
  
  @keyframes pageFlip {
    0% { transform: rotateY(0deg); }
    50% { transform: rotateY(90deg); }
    100% { transform: rotateY(0deg); }
  }
  
  @keyframes initialsGlow {
    0% { opacity: 0; transform: scale(0.5); }
    50% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slideInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeInLeft {
    0% { opacity: 0; transform: translateX(-30px); }
    100% { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes radarPulse {
    0% { opacity: 0; transform: scaleX(0); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: scaleX(1); }
  }
  
  .modal-content {
    background: var(--clr-bg-alt);
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
    border: 1px solid var(--clr-surface-border);
  }
  
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--clr-text);
    cursor: pointer;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
  }
  
  .tech-tag {
    background: var(--clr-accent-blue);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
  }
  
  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  .form-message {
    padding: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  input.valid, textarea.valid {
    border-color: var(--clr-accent-gold);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }
  
  input.invalid, textarea.invalid {
    border-color: var(--clr-accent-red);
    box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.2);
  }
`;
document.head.appendChild(style);

/********************************************
  Custom Cursor Effects
*********************************************/
function initializeCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '✨';
  cursor.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    font-size: 1.2rem;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
  `;
  
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Change cursor on different elements
  document.querySelectorAll('.card, .primaryBtn, .nav-links a').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.innerHTML = '⚡';
      cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.innerHTML = '✨';
      cursor.style.transform = 'scale(1)';
    });
  });
}

// Initialize cursor only on desktop
if (window.innerWidth > 768) {
  initializeCustomCursor();
}

console.log('🎭 All systems initialized. Welcome to the magical experience!');
