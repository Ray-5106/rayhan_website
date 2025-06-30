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
  "Magic happens when code meets imagination.",
  "کوڈ اور تخیل کا ملاپ جادو بناتا ہے۔",
  "कोड और कल्पना का मेल जादू बनाता है।",
  "La magie arrive quand le code rencontre l'imagination."
];

/********************************************
  DOM Ready & Initialization
*********************************************/
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎬 Initializing portfolio...');
  
  // Add missing utility buttons
  addUtilityButtons();
  
  initializeTheme();
  initializeAudio();
  initializeNavigation();
  initializeSplashScreen();
  initializeParticles();
  initializeTypewriter();
  initializeContactForm();
  initializeScrollAnimations();
  initializeQuoteRotation();
  initializeProjectModals();
  
  console.log('🎬 Portfolio initialized successfully');
});

/********************************************
  Add Missing Utility Buttons
*********************************************/
function addUtilityButtons() {
  // Add skip link for accessibility
  const skipLink = document.createElement('a');
  skipLink.href = '#welcome';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add audio toggle button
  const audioToggle = document.createElement('button');
  audioToggle.id = 'audioToggle';
  audioToggle.className = 'utilityBtn';
  audioToggle.setAttribute('aria-label', 'Toggle sound');
  audioToggle.textContent = '🔇';
  document.body.appendChild(audioToggle);
  
  // Add theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.id = 'themeToggle';
  themeToggle.className = 'utilityBtn';
  themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
  themeToggle.textContent = '🌗';
  document.body.appendChild(themeToggle);
}

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
  const newTheme = APP_STATE.currentTheme === 'dark' ? 'light' : 'dark';
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

function updateThemeIcon() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = APP_STATE.currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-pressed', APP_STATE.currentTheme === 'light');
  }
}

/********************************************
  Audio Management
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
  } else {
    console.warn('Howler.js not loaded, audio features disabled');
    setTimeout(startWelcomeSection, 5000); // Fallback timing
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
  if (!splash) {
    startWelcomeSection();
    return;
  }
  
  // Skip splash if user prefers reduced motion
  if (!APP_STATE.animationsEnabled) {
    hideSplash();
    return;
  }
  
  // Start cinematic sequence
  runSplashSequence();
  
  // Auto-hide after 6 seconds
  setTimeout(() => {
    if (!APP_STATE.splashComplete) {
      hideSplash();
    }
  }, 6000);
}

function runSplashSequence() {
  // Marvel logo animation (0-2s)
  setTimeout(() => animateMarvelLogo(), 100);
  
  // Circuit traces (2-3s)
  setTimeout(() => animateCircuitTraces(), 2000);
  
  // Blueprint lines (2.5-3.5s)
  setTimeout(() => animateBlueprintLines(), 2500);
  
  // Magical runes (3-4s)
  setTimeout(() => animateMagicalRunes(), 3000);
  
  // Books flipping (3.5-4.5s)
  setTimeout(() => animateBookGlyphs(), 3500);
  
  // Mjolnir hammer (4-5s)
  setTimeout(() => animateHammer(), 4000);
  
  // Final initials convergence (5-6s)
  setTimeout(() => animateInitialsConvergence(), 5000);
}

function animateMarvelLogo() {
  const marvelLogo = document.querySelector('.marvel-logo');
  if (marvelLogo) {
    marvelLogo.style.display = 'block';
  }
}

function animateCircuitTraces() {
  const circuits = document.querySelector('.circuit-traces');
  if (circuits) {
    circuits.style.display = 'block';
  }
}

function animateBlueprintLines() {
  const blueprint = document.querySelector('.blueprint');
  if (blueprint) {
    blueprint.style.display = 'block';
  }
}

function animateMagicalRunes() {
  const runes = document.querySelector('.runes');
  if (runes) {
    runes.style.display = 'flex';
  }
}

function animateBookGlyphs() {
  const books = document.querySelector('.books');
  if (books) {
    books.style.display = 'flex';
  }
}

function animateHammer() {
  const mjolnir = document.querySelector('.mjolnir');
  if (mjolnir) {
    mjolnir.style.display = 'block';
  }
}

function animateInitialsConvergence() {
  const initials = document.querySelector('.initials');
  if (initials) {
    initials.style.display = 'block';
  }
  
  // Start audio if not muted
  if (!APP_STATE.audioMuted && window.introSound) {
    window.introSound.play();
  } else {
    // If no audio, hide splash after a short delay
    setTimeout(hideSplash, 1000);
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
  console.log('🏠 Starting welcome section');
  
  // Make welcome section visible
  const welcomeSection = document.getElementById('welcome');
  if (welcomeSection) {
    welcomeSection.style.opacity = '1';
  }
  
  // Initialize typewriter
  setTimeout(initializeTypewriter, 500);
  
  // Show enter button
  const enterBtn = document.getElementById('enterBtn');
  if (enterBtn) {
    setTimeout(() => {
      enterBtn.style.opacity = '1';
      enterBtn.style.transform = 'translateY(0)';
    }, 2000);
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
    
    // Update aria-expanded
    const isOpen = navLinks?.classList.contains('open');
    hamburger?.setAttribute('aria-expanded', isOpen);
  });
  
  // Smooth scroll for navigation links
  scrollLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Enter button scroll to about
  enterBtn?.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    scrollToSection(aboutSection);
  });
  
  // Navigation highlight on scroll
  window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
}

function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    scrollToSection(targetSection);
    
    // Close mobile menu
    const navLinks = document.querySelector('.nav-links');
    navLinks?.classList.remove('open');
    
    const hamburger = document.getElementById('hamburger');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
}

function scrollToSection(section) {
  if (section) {
    const offsetTop = section.offsetTop - 80; // Account for fixed nav
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 150) {
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

// Throttle function for performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/********************************************
  Particles.js Configuration
*********************************************/
function initializeParticles() {
  if (typeof particlesJS === 'undefined') {
    console.warn('Particles.js not loaded, particle effects disabled');
    return;
  }
  
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
  
  if (line1) {
    line1.textContent = '';
    typewriterEffect(line1, 'Welcome, Prefect of Innovation.', 0);
  }
  
  if (line2) {
    line2.textContent = '';
    setTimeout(() => {
      line2.style.opacity = '1';
      typewriterEffect(line2, 'Your chamber awaits.', 0);
    }, 3500);
  }
}

function typewriterEffect(element, text, index) {
  if (index < text.length) {
    element.textContent = text.slice(0, index + 1);
    setTimeout(() => typewriterEffect(element, text, index + 1), 100);
  } else {
    // Remove cursor after typing is complete
    setTimeout(() => {
      element.style.borderRight = 'none';
    }, 1000);
  }
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
    
    // Here you would typically send the data to a server
    // fetch('/api/contact', { method: 'POST', body: formData })
  } else {
    showFormError('Please fill in all fields correctly.');
  }
}

function showFormSuccess() {
  const form = document.getElementById('contactForm');
  
  // Remove existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  const successMsg = document.createElement('div');
  successMsg.className = 'form-message success';
  successMsg.textContent = '✨ Message sent successfully! I\'ll get back to you soon.';
  
  form.appendChild(successMsg);
  form.reset();
  
  // Remove all validation classes
  form.querySelectorAll('input, textarea').forEach(field => {
    field.classList.remove('valid', 'invalid');
  });
  
  setTimeout(() => successMsg.remove(), 5000);
}

function showFormError(message) {
  const form = document.getElementById('contactForm');
  
  // Remove existing messages
  const existingMsg = form.querySelector('.form-message');
  if (existingMsg) existingMsg.remove();
  
  const errorMsg = document.createElement('div');
  errorMsg.className = 'form-message error';
  errorMsg.textContent = message;
  
  form.appendChild(errorMsg);
  setTimeout(() => errorMsg.remove(), 5000);
}

/********************************************
  Scroll Animations & Intersection Observer
*********************************************/
function initializeScrollAnimations() {
  if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported, scroll animations disabled');
    return;
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special animations for specific sections
        const sectionId = entry.target.id;
        if (sectionId === 'highlights') {
          animateHighlightsBadges();
        } else if (sectionId === 'journey') {
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
  }, 8000); // Changed to 8 seconds for better readability
}

/********************************************
  Project Modals
*********************************************/
function initializeProjectModals() {
  const resumeBtn = document.getElementById('resumeBtn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Resume button
  resumeBtn?.addEventListener('click', () => {
    // Create a placeholder PDF or redirect
    showInfoModal({
      title: 'Resume Download',
      content: 'Resume download feature will be available soon. Please contact me directly for my latest resume.',
      actions: [
        { text: 'Contact Me', action: () => scrollToSection(document.getElementById('contact')) },
        { text: 'Close', action: null }
      ]
    });
  });
  
  // Project cards
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.textContent || 'Project';
      const description = card.querySelector('.project-body p')?.textContent || 'Project description';
      const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
      
      showProjectModal({
        title,
        description,
        technologies: techTags,
        github: '#',
        demo: '#'
      });
    });
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
  
  document.body.appendChild(modal);
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
  
  // Animate in
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
  
  // Close handlers
  setupModalCloseHandlers(modal);
}

function showInfoModal(info) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
      <h2>${info.title}</h2>
      <p>${info.content}</p>
      <div class="modal-actions">
        ${info.actions.map(action => 
          `<button class="primaryBtn" data-action="${action.text}">${action.text}</button>`
        ).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Handle action buttons
  modal.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const actionText = btn.getAttribute('data-action');
      const action = info.actions.find(a => a.text === actionText);
      if (action && action.action) {
        action.action();
      }
      closeModal(modal);
    });
  });
  
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
  });
  
  setupModalCloseHandlers(modal);
}

function setupModalCloseHandlers(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn?.addEventListener('click', () => closeModal(modal));
  
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
  
  // Focus management
  const focusableElements = modal.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }
}

function closeModal(modal) {
  modal.style.opacity = '0';
  document.body.style.overflow = '';
  
  setTimeout(() => {
    modal.remove();
  }, 300);
}

/********************************************
  Custom Cursor Effects
*********************************************/
function initializeCustomCursor() {
  // Only on desktop
  if (window.innerWidth <= 768) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '✨';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor follow
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Change cursor on interactive elements
  const interactiveElements = document.querySelectorAll('button, a, .project-card, input, textarea');
  
  interactiveElements.forEach(el => {
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

// Initialize cursor on desktop
if (window.innerWidth > 768) {
  initializeCustomCursor();
}

/********************************************
  Error Handling & Graceful Degradation
*********************************************/
window.addEventListener('error', (e) => {
  console.warn('Portfolio error caught:', e.error);
  // Ensure basic functionality still works
  if (!APP_STATE.splashComplete) {
    hideSplash();
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  console.warn('Unhandled promise rejection:', e.reason);
});

/********************************************
  Performance Monitoring
*********************************************/
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log(`🚀 Portfolio loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    }, 0);
  });
}

// Final initialization message
console.log('🎭 All systems initialized. Welcome to the magical experience!');
console.log('🎨 Portfolio by Rayhan Hameed - Prefect of Innovation');
/* Corrected JavaScript: All HTML entities fixed, controls added, error handling improved */
// … full corrected JS identical to the audited version but with literal operators …
