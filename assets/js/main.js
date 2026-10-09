/**
 * VOLTARA - Core Global Scripts & UI Handlers
 */

// Global Toast Notification Utility
const VoltaraToast = {
  container: null,

  init: function() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'voltara-toast-container';
      document.body.appendChild(this.container);
    }
  },

  show: function(options) {
    this.init();
    const {
      title = "Notification",
      message = "",
      type = "info", // info, success, warning, danger
      duration = 4000
    } = options;

    const iconMap = {
      info: "bi-info-circle-fill text-info",
      success: "bi-check-circle-fill text-success",
      warning: "bi-exclamation-triangle-fill text-warning",
      danger: "bi-x-circle-fill text-danger"
    };

    const toast = document.createElement('div');
    toast.className = `voltara-toast toast-${type} animate-fade-in`;
    toast.innerHTML = `
      <div class="toast-icon">
        <i class="bi ${iconMap[type] || iconMap.info} fs-5"></i>
      </div>
      <div class="toast-content flex-grow-1">
        <div class="toast-title fw-bold">${title}</div>
        <div class="toast-message small text-secondary">${message}</div>
      </div>
      <button type="button" class="toast-close btn-close-custom" aria-label="Close">
        <i class="bi bi-x"></i>
      </button>
    `;

    this.container.appendChild(toast);

    const removeToast = () => {
      toast.classList.add('toast-hiding');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', removeToast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  }
};

window.VoltaraToast = VoltaraToast;

// Global App Initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const navbar = document.querySelector('.voltara-navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Drawer Navigation Controller
  const mobileToggleBtn = document.querySelector('.navbar-mobile-toggle');
  const mobileDrawer = document.querySelector('.voltara-mobile-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');

  const openMobileMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      if (drawerBackdrop) drawerBackdrop.classList.add('open');
      document.body.classList.add('menu-open-scroll-lock');
    }
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      if (drawerBackdrop) drawerBackdrop.classList.remove('open');
      document.body.classList.remove('menu-open-scroll-lock');
    }
  };

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openMobileMenu();
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Mobile accordion submenu toggles
  const mobileSubmenuToggles = document.querySelectorAll('.mobile-nav-toggle-sub');
  mobileSubmenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.mobile-nav-item');
      if (parent) {
        parent.classList.toggle('submenu-open');
        const icon = toggle.querySelector('.bi-chevron-down');
        if (icon) {
          icon.style.transform = parent.classList.contains('submenu-open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // 3. Global Search Modal Controller
  const searchTriggers = document.querySelectorAll('.nav-search-trigger');
  const searchModal = document.getElementById('voltaraSearchModal');
  const searchInput = document.getElementById('globalSearchInput');
  const searchResultsContainer = document.getElementById('globalSearchResults');

  if (searchModal && searchInput && searchResultsContainer) {
    const handleGlobalSearch = (query) => {
      const q = (query || "").toLowerCase().trim();
      if (!q) {
        searchResultsContainer.innerHTML = `
          <div class="search-empty-state text-center py-4 text-muted">
            <i class="bi bi-search fs-2 mb-2 d-block opacity-50"></i>
            <p class="mb-0">Type to search gadgets, services, verified hosts, or diagnostic guides...</p>
          </div>
        `;
        return;
      }

      // Query across data
      const matchedGadgets = VOLTARA_DATA.gadgets.filter(g => g.name.toLowerCase().includes(q) || g.category.toLowerCase().includes(q));
      const matchedServices = VOLTARA_DATA.services.filter(s => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
      const matchedHosts = VOLTARA_DATA.hosts.filter(h => h.name.toLowerCase().includes(q) || h.specialties.some(sp => sp.toLowerCase().includes(q)));
      const matchedGuides = VOLTARA_DATA.guides.filter(g => g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q));

      const totalCount = matchedGadgets.length + matchedServices.length + matchedHosts.length + matchedGuides.length;

      if (totalCount === 0) {
        searchResultsContainer.innerHTML = `
          <div class="search-no-results text-center py-4 text-muted">
            <i class="bi bi-emoji-neutral fs-2 mb-2 d-block opacity-50"></i>
            <p class="mb-0">No matches found for "<strong>${query}</strong>". Try searching for "iPhone", "Screen", "Apex", or "Thermal".</p>
          </div>
        `;
        return;
      }

      let html = `<div class="search-results-list d-flex flex-column gap-3">`;

      if (matchedServices.length > 0) {
        html += `
          <div class="search-group">
            <div class="search-group-header small text-uppercase text-muted fw-bold mb-2">Services (${matchedServices.length})</div>
            <div class="d-flex flex-column gap-2">
              ${matchedServices.map(s => `
                <a href="service-details.html?service=${s.id}" class="search-result-item d-flex align-items-center justify-content-between p-2 rounded-2 text-decoration-none">
                  <div class="d-flex align-items-center gap-2">
                    <div class="service-icon-sm bg-primary-subtle text-primary p-2 rounded"><i class="bi ${s.icon}"></i></div>
                    <div>
                      <div class="fw-semibold text-primary-emphasis">${s.title}</div>
                      <div class="small text-muted">${s.categoryLabel} • From ${VoltaraDB.formatCurrency(s.basePrice)}</div>
                    </div>
                  </div>
                  <i class="bi bi-arrow-right text-muted"></i>
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      if (matchedHosts.length > 0) {
        html += `
          <div class="search-group">
            <div class="search-group-header small text-uppercase text-muted fw-bold mb-2">Verified Hosts (${matchedHosts.length})</div>
            <div class="d-flex flex-column gap-2">
              ${matchedHosts.map(h => `
                <a href="host-profile.html?host=${h.id}" class="search-result-item d-flex align-items-center justify-content-between p-2 rounded-2 text-decoration-none">
                  <div class="d-flex align-items-center gap-2">
                    <img src="${h.avatar}" class="rounded-circle" width="36" height="36" alt="${h.name}">
                    <div>
                      <div class="fw-semibold text-primary-emphasis">${h.name} <i class="bi bi-patch-check-fill text-primary small"></i></div>
                      <div class="small text-muted">${h.typeLabel} • ${h.rating} ★ (${h.reviewsCount})</div>
                    </div>
                  </div>
                  <i class="bi bi-arrow-right text-muted"></i>
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      if (matchedGadgets.length > 0) {
        html += `
          <div class="search-group">
            <div class="search-group-header small text-uppercase text-muted fw-bold mb-2">Gadgets (${matchedGadgets.length})</div>
            <div class="d-flex flex-column gap-2">
              ${matchedGadgets.map(g => `
                <a href="explore.html?gadget=${g.id}" class="search-result-item d-flex align-items-center justify-content-between p-2 rounded-2 text-decoration-none">
                  <div class="d-flex align-items-center gap-2">
                    <img src="${g.image}" class="rounded" width="36" height="36" style="object-fit: cover;" alt="${g.name}">
                    <div>
                      <div class="fw-semibold text-primary-emphasis">${g.name}</div>
                      <div class="small text-muted">${g.categoryLabel} • Services from ${VoltaraDB.formatCurrency(g.startingServicePrice)}</div>
                    </div>
                  </div>
                  <i class="bi bi-arrow-right text-muted"></i>
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      if (matchedGuides.length > 0) {
        html += `
          <div class="search-group">
            <div class="search-group-header small text-uppercase text-muted fw-bold mb-2">Guides (${matchedGuides.length})</div>
            <div class="d-flex flex-column gap-2">
              ${matchedGuides.map(g => `
                <a href="guides.html#${g.id}" class="search-result-item d-flex align-items-center justify-content-between p-2 rounded-2 text-decoration-none">
                  <div class="d-flex align-items-center gap-2">
                    <div class="guide-icon-sm bg-info-subtle text-info p-2 rounded"><i class="bi bi-journal-text"></i></div>
                    <div>
                      <div class="fw-semibold text-primary-emphasis">${g.title}</div>
                      <div class="small text-muted">${g.category} • ${g.readTime}</div>
                    </div>
                  </div>
                  <i class="bi bi-arrow-right text-muted"></i>
                </a>
              `).join('')}
            </div>
          </div>
        `;
      }

      html += `</div>`;
      searchResultsContainer.innerHTML = html;
    };

    searchInput.addEventListener('input', (e) => {
      handleGlobalSearch(e.target.value);
    });

    // Keyboard shortcut CMD+K or CTRL+K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const modal = bootstrap.Modal.getOrCreateInstance(searchModal);
        modal.show();
        setTimeout(() => searchInput.focus(), 250);
      }
    });

    searchModal.addEventListener('shown.bs.modal', () => {
      searchInput.focus();
    });
  }

  // 4. Broken Image Fallback Safeguard (High Reliability SVG Data URI)
  const svgFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23141A27'/%3E%3Cpath d='M200 80a35 35 0 0 1 35 35v10a35 35 0 0 1-70 0v-10a35 35 0 0 1 35-35zm-50 90h100c15 0 25 10 25 25v15H125v-15c0-15 10-25 25-25z' fill='%230066FF' opacity='0.4'/%3E%3Ctext x='50%25' y='82%25' font-family='sans-serif' font-size='14' fill='%2394A3B8' text-anchor='middle' font-weight='600'%3EVOLTARA VERIFIED TECH%3C/text%3E%3C/svg%3E";
  
  const setupImageFallback = () => {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function() {
        if (!this.getAttribute('data-failed')) {
          this.setAttribute('data-failed', 'true');
          this.src = svgFallback;
        }
      });
      // In case image failed before listener attached
      if (img.complete && img.naturalWidth === 0) {
        img.src = svgFallback;
      }
    });
  };
  setupImageFallback();

  // 4b. Universal Back to Top Button Controller
  let backToTopBtn = document.querySelector('.voltara-back-to-top');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'voltara-back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    backToTopBtn.innerHTML = '<i class="bi bi-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  const toggleBackToTop = () => {
    if (window.scrollY > 280) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 5. GSAP Entrance and Scroll Trigger Animations (if gsap is loaded)
  if (typeof gsap !== 'undefined') {
    // Reveal animated items
    const revealElements = document.querySelectorAll('.gsap-reveal');
    if (revealElements.length > 0) {
      gsap.from(revealElements, {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out"
      });
    }

    const heroElements = document.querySelectorAll('.gsap-hero-anim');
    if (heroElements.length > 0) {
      gsap.from(heroElements, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out"
      });
    }
  }

  // 6. Contact Form Demo Handler
  const contactForm = document.getElementById('voltaraContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Dispatching Ticket...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        VoltaraToast.show({
          title: "Message Dispatched",
          message: "Our engineering concierge will respond within 15 minutes to your inquiry.",
          type: "success",
          duration: 5000
        });
      }, 1000);
    });
  }

  // 7. Newsletter Demo Handlers
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value) {
        VoltaraToast.show({
          title: "Subscribed to Voltara Dispatch",
          message: "You will receive exclusive early service slots and diagnostic tear-downs.",
          type: "success"
        });
        form.reset();
      }
    });
  });
});
