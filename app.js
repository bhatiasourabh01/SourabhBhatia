// Author Profile Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initContactForm();
  initBackToTop();
  initSmoothScrolling();
  initAnimations();
  setupYear();
});

// Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  });
}

// Scroll effects for navbar
function initScrollEffects() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(19, 52, 59, 0.98)";
    } else {
      navbar.style.background = "rgba(19, 52, 59, 0.95)";
    }

    // Active section highlighting
    highlightActiveSection();
  });

  // Highlight active section in navigation
  function highlightActiveSection() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
}

// Contact form validation and submission
function initContactForm() {
  const form = document.getElementById("contact-form");
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const subjectField = document.getElementById("subject");
  const messageField = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Validate name
    if (!nameField.value.trim()) {
      showError("name-error", "Name is required");
      isValid = false;
    } else if (nameField.value.trim().length < 2) {
      showError("name-error", "Name must be at least 2 characters");
      isValid = false;
    }

    // Validate email
    if (!emailField.value.trim()) {
      showError("email-error", "Email is required");
      isValid = false;
    } else if (!isValidEmail(emailField.value.trim())) {
      showError("email-error", "Please enter a valid email address");
      isValid = false;
    }

    // Validate subject
    if (!subjectField.value.trim()) {
      showError("subject-error", "Subject is required");
      isValid = false;
    } else if (subjectField.value.trim().length < 3) {
      showError("subject-error", "Subject must be at least 3 characters");
      isValid = false;
    }

    // Validate message
    if (!messageField.value.trim()) {
      showError("message-error", "Message is required");
      isValid = false;
    } else if (messageField.value.trim().length < 10) {
      showError("message-error", "Message must be at least 10 characters");
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      submitForm(form);
    }
  });

  // Real-time validation
  nameField.addEventListener("blur", function () {
    if (this.value.trim() && this.value.trim().length < 2) {
      showError("name-error", "Name must be at least 2 characters");
    } else {
      hideError("name-error");
    }
  });

  emailField.addEventListener("blur", function () {
    if (this.value.trim() && !isValidEmail(this.value.trim())) {
      showError("email-error", "Please enter a valid email address");
    } else {
      hideError("email-error");
    }
  });

  subjectField.addEventListener("blur", function () {
    if (this.value.trim() && this.value.trim().length < 3) {
      showError("subject-error", "Subject must be at least 3 characters");
    } else {
      hideError("subject-error");
    }
  });

  messageField.addEventListener("blur", function () {
    if (this.value.trim() && this.value.trim().length < 10) {
      showError("message-error", "Message must be at least 10 characters");
    } else {
      hideError("message-error");
    }
  });
}

// Form validation helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

function hideError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.classList.remove("show");
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.classList.remove("show");
  });
}

function submitForm(form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  // Show loading state
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    // Reset form
    form.reset();

    // Show success message
    showSuccessMessage();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

function showSuccessMessage() {
  // Create success message
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
    `;
  successDiv.textContent =
    "Message sent successfully! Thank you for reaching out.";

  document.body.appendChild(successDiv);

  // Animate in
  setTimeout(() => {
    successDiv.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    successDiv.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 300);
  }, 5000);
}

// Back to top button functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link");
  const heroButtons = document.querySelectorAll(".hero-buttons a");

  [...navLinks, ...heroButtons].forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const headerOffset = 70;
          const elementPosition = targetSection.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Initialize scroll animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".book-card, .about-content, .contact-content"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // Add stagger delay to book cards
  const bookCards = document.querySelectorAll(".book-card");
  bookCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Escape key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// Add hover effects for book cards
document.querySelectorAll(".book-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effects for buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(function () {
    // Additional scroll-based animations can be added here
  }, 16)
); // ~60fps

// Preload critical images (if we had real images)
function preloadImages() {
  const imageUrls = [
    // Add real image URLs here when available
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
function setupYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.innerHTML = currentYear;
  }
}
// Initialize preloading
preloadImages();
