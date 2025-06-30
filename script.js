/**
 * Rayhan Hameed Portfolio - script.js
 * Cinematic & Magical Interactive Experience
 * Handles: splash animation, audio, theme toggle, navigation,
 * particles, typewriter, form validation, and scroll effects
 */

/********************************************
  Global State & Configuration
*********************************************/
// Global State & Configuration
const APP_STATE = {
  splashComplete: false,
  currentSection: null,
  quotes: [
    "It does not do to dwell on dreams and forget to live. - Albus Dumbledore",
    "All we have to decide is what to do with the time that is given us. - Gandalf",
    "With great power comes great responsibility. - Uncle Ben",
    "Not all those who wander are lost. - J.R.R. Tolkien",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "Magic happens when code meets imagination."
  ],
  currentQuoteIndex: 0
};

// DOM Elements
const splash = document.getElementById('splash');
const welcomeSection = document.getElementById('welcome');
const nav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.getElementById('hamburger');
const navList = document.querySelector('.nav-links');
const typeLine1 = document.getElementById('typeLine1');
const typeLine2 = document.getElementById('typeLine2');
const enterBtn = document.getElementById('enterBtn');
const resumeBtn = document.getElementById('resumeBtn');
const quoteRotator = document.getElementById('quoteRotator');
const timelineItems = document.querySelectorAll('.timeline-item');
const sections = document.querySelectorAll('section');
const scrollLinks = document.querySelectorAll('.scroll');
const form = document.querySelector('.contact-form');

// Initialize the portfolio
function initPortfolio() {
  createParticles();
  setupNavigation();
  setupEventListeners();
  rotateQuotes();
  observeSections();
  
  // Start the Marvel intro sequence
  startMarvelIntro();
  
  console.log('🎬 Portfolio initialized successfully');
}

// Create floating particles
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    container.appendChild(particle);
  }
}

// Set up navigation
function setupNavigation() {
  // Smooth scrolling
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - nav.offsetHeight,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navList.classList.remove('open');
      }
    });
  });
  
  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
}

// Set up event listeners
function setupEventListeners() {
  // Enter button
  enterBtn.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });
  
  // Resume button
  resumeBtn.addEventListener('click', () => {
    // In a real implementation, this would download the PDF
    alert('Resume download would start here. In a real implementation, this would download the PDF.');
  });
  
  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      form.reset();
    });
  }
  
  // Window scroll event
  window.addEventListener('scroll', handleScroll);
}

// Handle scroll events
function handleScroll() {
  // Show/hide navigation
  if (window.scrollY > 100) {
    nav.style.transform = 'translateY(0)';
  } else {
    nav.style.transform = 'translateY(-100%)';
  }
  
  // Update active navigation link
  const scrollPosition = window.scrollY + nav.offsetHeight;
  
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section.offsetTop <= scrollPosition && 
        section.offsetTop + section.offsetHeight > scrollPosition) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Rotate quotes in footer
function rotateQuotes() {
  if (!quoteRotator) return;
  
  setInterval(() => {
    quoteRotator.style.opacity = '0';
    
    setTimeout(() => {
      APP_STATE.currentQuoteIndex = 
        (APP_STATE.currentQuoteIndex + 1) % APP_STATE.quotes.length;
      quoteRotator.textContent = APP_STATE.quotes[APP_STATE.currentQuoteIndex];
      quoteRotator.style.opacity = '1';
    }, 500);
  }, 5000);
}

// Observe sections for animations
function observeSections() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        if (entry.target.id === 'journey') {
          animateTimeline();
        }
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animate timeline items
function animateTimeline() {
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 300);
  });
}

// Start Marvel intro sequence
function startMarvelIntro() {
  // Create particles for splash screen
  const splashOverlay = document.querySelector('.splash-overlay');
  if (splashOverlay) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      splashOverlay.appendChild(particle);
    }
  }
  
  // Hide splash screen after 6 seconds
  setTimeout(() => {
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    splash.style.transition = 'opacity 1s ease-out';
    
    setTimeout(() => {
      splash.style.display = 'none';
      APP_STATE.splashComplete = true;
      
      // Show welcome section
      welcomeSection.style.opacity = '1';
      
      // Start typewriter effect
      startTypewriter();
    }, 1000);
  }, 6000);
}

// Start typewriter effect
function startTypewriter() {
  // First line
  typeLine1.style.opacity = '1';
  typeLine1.style.animation = 'typing 3.5s steps(40, end), blink 0.75s step-end infinite';
  
  // Second line with delay
  setTimeout(() => {
    typeLine2.style.opacity = '1';
    typeLine2.style.animation = 'typing 3.5s steps(40, end), blink 0.75s step-end infinite';
    
    // Show enter button after second line completes
    setTimeout(() => {
      enterBtn.style.opacity = '1';
      enterBtn.style.transform = 'translateY(0)';
      enterBtn.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    }, 3500);
  }, 3500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolio);
