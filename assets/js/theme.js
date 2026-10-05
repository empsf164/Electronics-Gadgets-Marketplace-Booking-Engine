/**
 * VOLTARA - Theme Controller (Dark/Light Mode)
 */

(function () {
  const THEME_KEY = 'voltara_theme_preference';
  
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark for high-tech obsidian aesthetic
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // Update theme toggle icons if present
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('aria-label', 'Switch to light theme');
          btn.setAttribute('title', 'Switch to light theme');
        } else {
          icon.className = 'bi bi-moon-stars-fill text-primary';
          btn.setAttribute('aria-label', 'Switch to dark theme');
          btn.setAttribute('title', 'Switch to dark theme');
        }
      }
    });
  }

  // Initial apply immediately to avoid flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // DOM ready hook
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    // Bind all theme toggle buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-toggle-btn');
      if (btn) {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        
        // Optional quick toast if VoltaraToast is available
        if (window.VoltaraToast) {
          window.VoltaraToast.show({
            title: 'Theme Changed',
            message: `Switched to ${nextTheme.toUpperCase()} mode.`,
            type: 'info',
            duration: 2000
          });
        }
      }
    });

    // Listen to system preference changes if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });

  window.VoltaraTheme = {
    getTheme: () => document.documentElement.getAttribute('data-theme') || 'dark',
    setTheme: applyTheme,
    toggle: () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  };
})();
