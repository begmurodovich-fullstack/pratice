document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  
  initCursor();
  initPreloader();
  initThemeToggle();
  initMobileMenu();
  initNavbar();
  initTyping();
  initParticles();
  initScrollAnimations();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initHoverEffects();
});

function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  
  if (window.innerWidth < 768) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-item');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

function initPreloader() {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  
  setTimeout(() => {
    preloader.classList.add('hide');
    document.body.style.overflow = 'auto';
    
    gsap.from('.hero-badge', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3
    });
    
    gsap.from('.title-line', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.5
    });
    
    gsap.from('.title-name', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.7
    });
    
    gsap.from('.hero-typing', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.9
    });
    
    gsap.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1.1
    });
    
    gsap.from('.hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 1.3
    });
  }, 1500);
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.setAttribute('data-theme', 'dark');
  }
  
  toggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    gsap.to(toggle, {
      rotation: '+=360',
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

function initTyping() {
  const typingElement = document.getElementById('typing');
  const words = [
    'Full-Stack Developer',
    'Frontend Specialist',
    'React Expert',
    'Flutter Developer',
    'Problem Solver',
    'Creative Coder'
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;
  
  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  setTimeout(type, 2000);
}

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let animationId;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  function init() {
    particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function connectParticles() {
    const maxDistance = 150;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.2;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    connectParticles();
    animationId = requestAnimationFrame(animate);
  }
  
  init();
  animate();
  
  window.addEventListener('resize', () => {
    setTimeout(init, 100);
  });
}

function initScrollAnimations() {
  gsap.from('.section-header', {
    scrollTrigger: {
      trigger: '.section-header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.about-text', {
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.about-image', {
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.skill-card', {
    scrollTrigger: {
      trigger: '.skills-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  });
  
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '.contact-content',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });
}

function initSkillBars() {
  const skillBars = document.querySelectorAll('.bar-fill');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(bar, {
          width: width + '%',
          duration: 1.5,
          ease: 'power3.out'
        });
      }
    });
  });
}

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            display: 'block',
            ease: 'power3.out'
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            display: 'none',
            ease: 'power3.out'
          });
        }
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.btn-submit');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitBtn.innerHTML = '<span>Sending...</span>';
    
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span> ✓';
      submitBtn.style.background = '#22c55e';
      
      form.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        `;
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
  
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      gsap.to(input.parentElement, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    input.addEventListener('blur', () => {
      gsap.to(input.parentElement, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

function initHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .skill-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
  
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelector('.contact-icon'), {
        scale: 1.2,
        rotate: 10,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelector('.contact-icon'), {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}
