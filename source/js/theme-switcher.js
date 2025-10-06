/* ========================================
   Theme Switcher
   Switch between modern and retro themes
   ======================================== */

(function() {
  'use strict';

  const THEME_KEY = 'hexo-theme-preference';
  const MODERN_THEME = 'modern';
  const RETRO_THEME = 'retro';

  // Get saved theme preference or default to modern
  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || MODERN_THEME;
  }

  // Save theme preference
  function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply theme by enabling/disabling the modern CSS
  function applyTheme(theme) {
    const modernCSS = document.getElementById('modern-theme-css');
    if (modernCSS) {
      modernCSS.disabled = (theme === RETRO_THEME);
    }

    // Update button text
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.innerHTML = theme === MODERN_THEME
        ? '<i class="fa fa-refresh"></i> Retro Theme'
        : '<i class="fa fa-refresh"></i> Modern Theme';
      toggleBtn.setAttribute('data-theme', theme);
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = getSavedTheme();
    const newTheme = currentTheme === MODERN_THEME ? RETRO_THEME : MODERN_THEME;
    saveTheme(newTheme);
    applyTheme(newTheme);
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // Add click event to toggle button
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
      });
    }
  });

  // Apply theme immediately (before DOMContentLoaded) to prevent flash
  const savedTheme = getSavedTheme();
  if (savedTheme === RETRO_THEME) {
    const modernCSS = document.getElementById('modern-theme-css');
    if (modernCSS) {
      modernCSS.disabled = true;
    }
  }
})();
