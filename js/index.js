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