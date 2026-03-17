// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const htmlElement = document.documentElement;
  const body = document.body;

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    body.classList.add('dark-mode');
    updateToggleIcon(true);
  }

  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDarkModeActive = body.classList.contains('dark-mode');
    
    localStorage.setItem('darkMode', isDarkModeActive);
    
    updateToggleIcon(isDarkModeActive);
  });

  function updateToggleIcon(isDark) {
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    if (isDark) {
      toggleIcon.textContent = '☀️';
    } else {
      toggleIcon.textContent = '🌙';
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
}); 

const words = [
  "Frontend Developer",
  "Full Stack Developer",
  "Flutter Developer"
];
let i = 0;
let j = 0;
let currentWord = '';
let isDeleting = false;

const typingElement = document.getElementById('typing');

function type() {
  currentWord = words[i];

  typingElement.classList.add('typing-active');
  setTimeout(() => {
    typingElement.classList.remove('typing-active');
  }, 900);

  if (!isDeleting) {
    typingElement.textContent = currentWord.substring(0, j + 1);
    j++;
    if (j === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, j - 1);
    j--;
    if (j === 0) {
      isDeleting = false;
      i++;
      if (i === words.length) {
        i = 0;
      }
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}

type();

// Navbar scroll behavior (darken + compact + hide/show)
const navbar = document.querySelector('.navbar');
let lastScrollPos = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (currentScroll > lastScrollPos && currentScroll > 120) {
    navbar.classList.add('hide');
    navbar.classList.remove('show');
  } else {
    navbar.classList.add('show');
    navbar.classList.remove('hide');
  }

  lastScrollPos = Math.max(currentScroll, 0);
});

const modal = document.getElementById('modal');
modal.classList.remove('active'); // ensure hidden on load

function openModal() {
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

window.addEventListener('click', function(e) {
  if (e.target === modal) {
    closeModal();
  }
});