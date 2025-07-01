// ========================= Theme Management =========================
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupEventListeners();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateThemeToggle();
  }

  updateThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.theme === 'dark' ? '🌙' : '☀️';
    }
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  setupEventListeners() {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => this.toggle());
  }
}

// ========================= Navigation Management =========================
class NavigationManager {
  constructor() {
    this.burger = document.getElementById('burger');
    this.nav = document.getElementById('nav');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.highlightCurrentPage();
  }

  setupEventListeners() {
    // Burger menu toggle
    this.burger?.addEventListener('click', () => this.toggle());

    // Close menu on nav link click (mobile)
    this.nav?.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.nav?.contains(e.target) && !this.burger?.contains(e.target)) {
        this.close();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateUI();
  }

  open() {
    this.isOpen = true;
    this.updateUI();
  }

  close() {
    this.isOpen = false;
    this.updateUI();
  }

  updateUI() {
    this.nav?.classList.toggle('open', this.isOpen);
    this.burger?.classList.toggle('active', this.isOpen);
    document.body.classList.toggle('menu-open', this.isOpen);
  }

  highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === currentPath);
    });
  }
}

// ========================= Animation Management =========================
class AnimationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollEffects();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.recognition-item, .project-showcase, .cta-content').forEach(el => {
      observer.observe(el);
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateHeader = () => {
      const header = document.querySelector('.header');
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
  }
}

// ========================= Utilities =========================
class Utils {
  static updateYear() {
    document.querySelectorAll('#year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  static setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  static setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        console.log('Form submitted');
      });
    });
  }

  static setupLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 2000);
      });
    });
  }
}

// ========================= Page-specific functionality =========================
class PageManager {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  init() {
    switch (this.currentPage) {
      case 'index.html':
        this.initHomePage();
        break;
      case 'about.html':
        this.initAboutPage();
        break;
      case 'trajecta.html':
        this.initTrajectaPage();
        break;
      case 'contact.html':
        this.initContactPage();
        break;
      default:
        break;
    }
  }

  initHomePage() {
    // Add typing effect to hero subtitle
    this.setupTypingEffect();
    
    // Add floating cards animation
    this.setupFloatingCards();
  }

  initAboutPage() {
    // Add timeline animation
    this.setupTimelineAnimation();
  }

  initTrajectaPage() {
    // Add demo interactions
    this.setupTrajectaDemo();
  }

  initContactPage() {
    // Enhanced form validation
    this.setupContactForm();
  }

  setupTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  setupFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 2}s`;
    });
  }

  setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    });

    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-50px)';
      item.style.transition = 'all 0.6s ease-out';
      observer.observe(item);
    });
  }

  setupTrajectaDemo() {
    // Interactive demo functionality
    const rankItems = document.querySelectorAll('.rank-item');
    rankItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('expanded');
      });
    });
  }

  setupContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
    });
  }
}

// ========================= Performance Optimization =========================
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.preloadCriticalImages();
    this.setupLazyLoading();
  }

  preloadCriticalImages() {
    const criticalImages = [
      'images/official in a tie and jacket.jpg',
      'images/profile.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ========================= Initialization =========================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  new ThemeManager();
  new NavigationManager();
  new AnimationManager();
  new PageManager();
  new PerformanceManager();

  // Initialize utilities
  Utils.updateYear();
  Utils.setupSmoothScrolling();
  Utils.setupFormEnhancements();
  Utils.setupLoadingStates();

  // Add loaded class to body for CSS transitions
  document.body.classList.add('loaded');
});

// ========================= Error Handling =========================
window.addEventListener('error', (e) => {
  console.warn('JavaScript error:', e.error);
});

// ========================= Export for external use =========================
window.VZWebsite = {
  ThemeManager,
  NavigationManager,
  AnimationManager,
  PageManager,
  Utils
};
