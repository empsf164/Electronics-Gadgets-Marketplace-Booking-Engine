/**
 * VOLTARA - Multi-Step Booking Engine Controller
 * 6-Step Workflow:
 * 01 Service -> 02 Date -> 03 Time Slot -> 04 Quote Review -> 05 Customer Details -> 06 Payment & Confirmation
 */

class VoltaraBookingEngine {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6;

    // Booking State
    this.state = {
      deviceCategory: "smartphones",
      deviceBrand: "Apple",
      deviceModel: "iPhone 15 Pro Max",
      serviceId: "screen-replacement",
      hostId: "apex-lab",
      urgencyId: "standard",
      selectedAddonIds: ["nano-shield"],
      selectedDate: null,
      selectedDateFormatted: "",
      selectedSlot: "10:30 AM",
      customer: {
        fullName: "",
        email: "",
        phone: "",
        serialNumber: "",
        notes: "",
        photos: []
      },
      paymentMethod: "card",
      quote: {}
    };

    this.calendarInstance = null;
    this.init();
  }

  init() {
    this.parseURLParams();
    this.setupStepNavigation();
    this.setupServiceSelectionUI();
    this.setupAddonCheckboxes();
    this.setupUrgencyRadios();
    this.setupCalendar();
    this.setupCustomerFormValidation();
    this.setupPaymentMethodTabs();
    this.setupPaymentSubmit();
    this.recalculateAndSyncUI();
  }

  // 1. Parse Pre-selected params from URL (e.g., from explore.html or service-details.html or host-profile.html)
  parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('service')) {
      const s = VoltaraDB.getServiceById(params.get('service'));
      if (s) this.state.serviceId = s.id;
    }
    if (params.get('host')) {
      const h = VoltaraDB.getHostById(params.get('host'));
      if (h) this.state.hostId = h.id;
    }
    if (params.get('device')) {
      const g = VoltaraDB.getGadgetById(params.get('device'));
      if (g) {
        this.state.deviceCategory = g.category;
        this.state.deviceBrand = g.brand;
        this.state.deviceModel = g.name;
      }
    }
  }

  // 2. Step Navigation Control
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;

    // Validate current step before advancing
    if (stepNumber > this.currentStep && !this.validateCurrentStep()) {
      return;
    }

    this.currentStep = stepNumber;

    // Update Step Indicator Stepper UI
    document.querySelectorAll('.booking-step-item').forEach((item, index) => {
      const stepIdx = index + 1;
      item.classList.remove('active', 'completed');
      if (stepIdx === this.currentStep) {
        item.classList.add('active');
      } else if (stepIdx < this.currentStep) {
        item.classList.add('completed');
      }
    });

    // Update Step Panels
    document.querySelectorAll('.booking-panel-step').forEach((panel) => {
      const panelStep = parseInt(panel.dataset.step);
      if (panelStep === this.currentStep) {
        panel.classList.add('active');
        // Scroll smoothly to top of booking container
        const bookingCard = document.querySelector('.booking-card-wrapper');
        if (bookingCard) {
          bookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        panel.classList.remove('active');
      }
    });

    // Step-specific initializers
    if (this.currentStep === 2 || this.currentStep === 3) {
      if (!this.calendarInstance) {
        this.setupCalendar();
      }
    }

    if (this.currentStep === 4) {
      this.renderQuoteSummaryCard();
    }

    if (this.currentStep === 6) {
      this.renderFinalPaymentBreakdown();
    }

    this.recalculateAndSyncUI();
  }

  validateCurrentStep() {
    if (this.currentStep === 1) {
      if (!this.state.serviceId) {
        VoltaraToast.show({ title: "Selection Required", message: "Please choose a service to proceed.", type: "warning" });
        return false;
      }
      return true;
    }

    if (this.currentStep === 2) {
      if (!this.state.selectedDate) {
        // Fallback default tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.state.selectedDate = tomorrow;
        this.state.selectedDateFormatted = this.calendarInstance ? this.calendarInstance.formatDate(tomorrow) : tomorrow.toDateString();
      }
      return true;
    }

    if (this.currentStep === 3) {
      if (!this.state.selectedSlot) {
        VoltaraToast.show({ title: "Slot Required", message: "Please select an appointment time slot.", type: "warning" });
        return false;
      }
      return true;
    }

    if (this.currentStep === 5) {
      const nameInput = document.getElementById('customerFullName');
      const emailInput = document.getElementById('customerEmail');
      const phoneInput = document.getElementById('customerPhone');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim()) {
        VoltaraToast.show({ title: "Missing Contact Details", message: "Please complete your name, email, and phone number.", type: "warning" });
        if (nameInput) nameInput.focus();
        return false;
      }

      this.state.customer.fullName = nameInput.value.trim();
      this.state.customer.email = emailInput.value.trim();
      this.state.customer.phone = phoneInput.value.trim();
      this.state.customer.serialNumber = (document.getElementById('customerSerial') || {}).value || "";
      this.state.customer.notes = (document.getElementById('customerNotes') || {}).value || "";
      return true;
    }

    return true;
  }

  setupStepNavigation() {
    // Next button clicks
    document.querySelectorAll('.btn-booking-next').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToStep(this.currentStep + 1);
      });
    });

    // Previous button clicks
    document.querySelectorAll('.btn-booking-prev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToStep(this.currentStep - 1);
      });
    });

    // Stepper header clickable for visited steps
    document.querySelectorAll('.booking-step-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        const targetStep = index + 1;
        if (targetStep < this.currentStep) {
          this.goToStep(targetStep);
        }
      });
    });
  }

  // 3. Service & Device Options Setup
  setupServiceSelectionUI() {
    const serviceSelect = document.getElementById('bookingServiceSelect');
    const deviceCategorySelect = document.getElementById('bookingDeviceCategory');
    const deviceModelInput = document.getElementById('bookingDeviceModel');
    const hostSelect = document.getElementById('bookingHostSelect');

    if (serviceSelect) {
      serviceSelect.value = this.state.serviceId;
      serviceSelect.addEventListener('change', (e) => {
        this.state.serviceId = e.target.value;
        this.renderAddonList();
        this.recalculateAndSyncUI();
      });
    }

    if (deviceCategorySelect) {
      deviceCategorySelect.value = this.state.deviceCategory;
      deviceCategorySelect.addEventListener('change', (e) => {
        this.state.deviceCategory = e.target.value;
        this.recalculateAndSyncUI();
      });
    }

    if (deviceModelInput) {
      deviceModelInput.value = this.state.deviceModel;
      deviceModelInput.addEventListener('input', (e) => {
        this.state.deviceModel = e.target.value;
        this.recalculateAndSyncUI();
      });
    }

    if (hostSelect) {
      hostSelect.value = this.state.hostId;
      hostSelect.addEventListener('change', (e) => {
        this.state.hostId = e.target.value;
        this.updateHostDetailsCard();
        this.recalculateAndSyncUI();
      });
    }

    this.renderAddonList();
    this.updateHostDetailsCard();
  }

  renderAddonList() {
    const container = document.getElementById('bookingAddonsContainer');
    if (!container) return;

    const service = VoltaraDB.getServiceById(this.state.serviceId);
    if (!service.addons || service.addons.length === 0) {
      container.innerHTML = `<div class="text-muted small py-2">No optional add-ons for this service.</div>`;
      return;
    }

    let html = '';
    service.addons.forEach(addon => {
      const isChecked = this.state.selectedAddonIds.includes(addon.id) || addon.checked;
      html += `
        <label class="addon-option-item d-flex align-items-center justify-content-between p-3 rounded-3 mb-2 border border-subtle cursor-pointer ${isChecked ? 'selected' : ''}">
          <div class="d-flex align-items-center gap-3">
            <input type="checkbox" class="form-check-input custom-check addon-checkbox" value="${addon.id}" ${isChecked ? 'checked' : ''}>
            <div>
              <div class="fw-semibold text-primary-emphasis">${addon.label}</div>
              <div class="small text-muted">Recommended for complete protection</div>
            </div>
          </div>
          <div class="fw-bold text-primary">+${VoltaraDB.formatCurrency(addon.price)}</div>
        </label>
      `;
    });

    container.innerHTML = html;
    this.setupAddonCheckboxes();
  }

  setupAddonCheckboxes() {
    const checkboxes = document.querySelectorAll('.addon-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const selected = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(c => {
          selected.push(c.value);
        });
        this.state.selectedAddonIds = selected;
        
        // Toggle parent selected class
        document.querySelectorAll('.addon-option-item').forEach(item => {
          const chk = item.querySelector('.addon-checkbox');
          if (chk && chk.checked) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });

        this.recalculateAndSyncUI();
      });
    });
  }

  setupUrgencyRadios() {
    const urgencyRadios = document.querySelectorAll('input[name="bookingUrgency"]');
    urgencyRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.state.urgencyId = e.target.value;
        this.recalculateAndSyncUI();
      });
    });
  }

  // 4. Setup Dynamic Calendar & Slots
  setupCalendar() {
    const calEl = document.getElementById('bookingCalendarContainer');
    const slotsEl = document.getElementById('bookingSlotsContainer');
    
    if (calEl && slotsEl) {
      this.calendarInstance = new VoltaraCalendar({
        container: calEl,
        slotsContainer: slotsEl,
        onDateSelected: (date, formatted) => {
          this.state.selectedDate = date;
          this.state.selectedDateFormatted = formatted;
          this.updateDateDisplaySummary();
        },
        onSlotSelected: (slot) => {
          this.state.selectedSlot = slot;
          this.updateDateDisplaySummary();
        }
      });

      // Default tomorrow if not yet selected
      if (!this.state.selectedDate) {
        this.state.selectedDate = this.calendarInstance.selectedDate;
        this.state.selectedDateFormatted = this.calendarInstance.formatDate(this.state.selectedDate);
      }
      this.updateDateDisplaySummary();
    }
  }

  updateDateDisplaySummary() {
    const target = document.getElementById('selectedDateTimeSummary');
    if (target) {
      target.innerHTML = `
        <span class="text-primary fw-bold">${this.state.selectedDateFormatted || 'Tomorrow'}</span> at 
        <span class="badge bg-primary text-white px-2 py-1">${this.state.selectedSlot || '10:30 AM'}</span>
      `;
    }
  }

  updateHostDetailsCard() {
    const host = VoltaraDB.getHostById(this.state.hostId);
    const hostCard = document.getElementById('bookingSelectedHostPreview');
    if (hostCard && host) {
      hostCard.innerHTML = `
        <div class="d-flex align-items-center gap-3">
          <img src="${host.avatar}" class="rounded-circle" width="48" height="48" alt="${host.name}">
          <div>
            <div class="fw-bold text-primary-emphasis">${host.name} <i class="bi bi-patch-check-fill text-primary small"></i></div>
            <div class="small text-muted">${host.typeLabel} • ${host.location}</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2 mt-2 pt-2 border-top border-subtle small">
          <span class="badge bg-success-subtle text-success">${host.rating} ★ (${host.reviewsCount} reviews)</span>
          <span class="text-muted">Turnaround: ${host.turnaroundAvg}</span>
        </div>
      `;
    }
  }

  // 5. Customer Form Validation & Photo Drop mock
  setupCustomerFormValidation() {
    const dropZone = document.getElementById('devicePhotoDropzone');
    const fileInput = document.getElementById('devicePhotoInput');
    const previewContainer = document.getElementById('devicePhotoPreviews');

    if (dropZone && fileInput && previewContainer) {
      dropZone.addEventListener('click', () => fileInput.click());
      
      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (re) => {
              const preview = document.createElement('div');
              preview.className = 'photo-preview-item position-relative';
              preview.innerHTML = `
                <img src="${re.target.result}" class="rounded-2" width="70" height="70" style="object-fit: cover;" alt="Device Photo">
                <button type="button" class="btn-remove-photo btn btn-sm btn-danger position-absolute top-0 end-0 p-0 rounded-circle" style="width: 20px; height: 20px; font-size: 10px;">&times;</button>
              `;
              preview.querySelector('.btn-remove-photo').addEventListener('click', (ev) => {
                ev.stopPropagation();
                preview.remove();
              });
              previewContainer.appendChild(preview);
            };
            reader.readAsDataURL(file);
          }
        });
      });
    }
  }

  // 6. Payment Tabs & Method Switcher
  setupPaymentMethodTabs() {
    const paymentTabs = document.querySelectorAll('.payment-method-selector');
    paymentTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        paymentTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.state.paymentMethod = tab.dataset.method;

        // Show/hide payment sections
        document.querySelectorAll('.payment-method-view').forEach(view => {
          if (view.dataset.method === this.state.paymentMethod) {
            view.classList.remove('d-none');
          } else {
            view.classList.add('d-none');
          }
        });
      });
    });
  }

  // 7. Recalculate Live Quote
  recalculateAndSyncUI() {
    const quote = VoltaraPricing.calculateQuote({
      serviceId: this.state.serviceId,
      deviceCategory: this.state.deviceCategory,
      deviceModel: this.state.deviceModel,
      urgencyId: this.state.urgencyId,
      selectedAddonIds: this.state.selectedAddonIds,
      hostId: this.state.hostId
    });

    this.state.quote = quote;

    // Update Floating Sticky Price Bar & Sidebar Widgets
    document.querySelectorAll('.live-quote-base').forEach(el => el.textContent = VoltaraDB.formatCurrency(quote.adjustedBasePrice));
    document.querySelectorAll('.live-quote-urgency').forEach(el => el.textContent = quote.urgencyFee > 0 ? `+${VoltaraDB.formatCurrency(quote.urgencyFee)}` : 'Free');
    document.querySelectorAll('.live-quote-addons').forEach(el => el.textContent = `+${VoltaraDB.formatCurrency(quote.addonsTotal)}`);
    document.querySelectorAll('.live-quote-fee').forEach(el => el.textContent = `+${VoltaraDB.formatCurrency(quote.convenienceFee)}`);
    document.querySelectorAll('.live-quote-tax').forEach(el => el.textContent = `+${VoltaraDB.formatCurrency(quote.taxAmount)}`);
    document.querySelectorAll('.live-quote-total').forEach(el => el.textContent = quote.formattedGrandTotal);
    document.querySelectorAll('.live-quote-deposit').forEach(el => el.textContent = quote.formattedDeposit);
    document.querySelectorAll('.live-quote-remaining').forEach(el => el.textContent = quote.formattedRemaining);
    document.querySelectorAll('.live-deposit-pct').forEach(el => el.textContent = `${quote.depositPercentage}%`);
  }

  // 8. Render Quote Summary Card in Step 4
  renderQuoteSummaryCard() {
    const target = document.getElementById('step4QuoteBreakdown');
    if (!target) return;

    const q = this.state.quote;
    const service = VoltaraDB.getServiceById(this.state.serviceId);
    const host = VoltaraDB.getHostById(this.state.hostId);

    target.innerHTML = `
      <div class="card p-4 bg-surface-elevated border border-subtle rounded-3 mb-4">
        <div class="d-flex justify-content-between align-items-start mb-3 pb-3 border-bottom border-subtle">
          <div>
            <div class="badge bg-primary-subtle text-primary mb-1">${service.categoryLabel}</div>
            <h4 class="font-heading fw-bold mb-1">${service.title}</h4>
            <div class="text-secondary small">Device: <strong class="text-primary-emphasis">${this.state.deviceModel}</strong></div>
          </div>
          <div class="text-end">
            <span class="badge bg-success-subtle text-success"><i class="bi bi-shield-check me-1"></i> ${service.warranty}</span>
          </div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-sm-6">
            <div class="p-3 rounded-2 bg-surface-subtle border border-subtle">
              <div class="text-muted small mb-1"><i class="bi bi-shop me-1"></i> Assigned Host Lab</div>
              <div class="fw-bold text-primary-emphasis">${host.name}</div>
              <div class="small text-secondary">${host.location}</div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="p-3 rounded-2 bg-surface-subtle border border-subtle">
              <div class="text-muted small mb-1"><i class="bi bi-calendar-event me-1"></i> Scheduled Intake</div>
              <div class="fw-bold text-primary-emphasis">${this.state.selectedDateFormatted || 'Tomorrow'}</div>
              <div class="small text-primary fw-semibold">${this.state.selectedSlot} (Bench Slot)</div>
            </div>
          </div>
        </div>

        <div class="price-breakdown-table">
          <div class="d-flex justify-content-between py-2 border-bottom border-subtle">
            <span class="text-secondary">Base Diagnostic & Repair</span>
            <span class="fw-semibold">${VoltaraDB.formatCurrency(q.adjustedBasePrice)}</span>
          </div>
          <div class="d-flex justify-content-between py-2 border-bottom border-subtle">
            <span class="text-secondary">Turnaround Level (${q.urgencyLabel})</span>
            <span class="fw-semibold">${q.urgencyFee > 0 ? `+${VoltaraDB.formatCurrency(q.urgencyFee)}` : 'Included'}</span>
          </div>
          ${q.itemizedAddons.map(a => `
            <div class="d-flex justify-content-between py-2 border-bottom border-subtle">
              <span class="text-secondary">+ ${a.label}</span>
              <span class="fw-semibold">+${VoltaraDB.formatCurrency(a.price)}</span>
            </div>
          `).join('')}
          <div class="d-flex justify-content-between py-2 border-bottom border-subtle">
            <span class="text-secondary">Voltara Secure Escrow & Platform Fee</span>
            <span class="fw-semibold">+${VoltaraDB.formatCurrency(q.convenienceFee)}</span>
          </div>
          <div class="d-flex justify-content-between py-2 border-bottom border-subtle">
            <span class="text-secondary">GST / Regulatory Tech Tax (18%)</span>
            <span class="fw-semibold">+${VoltaraDB.formatCurrency(q.taxAmount)}</span>
          </div>
          <div class="d-flex justify-content-between py-3 border-bottom border-subtle fs-5 fw-bold">
            <span>Total Estimated Service</span>
            <span class="text-primary-emphasis">${q.formattedGrandTotal}</span>
          </div>
        </div>

        <div class="deposit-highlight-card mt-3 p-3 rounded-3 bg-primary-subtle border border-primary-subtle d-flex justify-content-between align-items-center">
          <div>
            <div class="fw-bold text-primary fs-5">Deposit Due Today: ${q.formattedDeposit} (${q.depositPercentage}%)</div>
            <div class="small text-secondary">Remaining balance (${q.formattedRemaining}) is paid strictly after service completion.</div>
          </div>
          <i class="bi bi-shield-lock-fill text-primary fs-2"></i>
        </div>
      </div>
    `;
  }

  // 9. Render Final Payment Breakdown in Step 6
  renderFinalPaymentBreakdown() {
    const target = document.getElementById('step6DepositAmountText');
    if (target) {
      target.textContent = this.state.quote.formattedDeposit;
    }
  }

  // 10. Handle Final Deposit Payment Simulation & Submission
  setupPaymentSubmit() {
    const payBtn = document.getElementById('btnSubmitDepositPayment');
    if (!payBtn) return;

    payBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // UI Loading state
      const originalText = payBtn.innerHTML;
      payBtn.disabled = true;
      payBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authorizing Secure Escrow Deposit...`;

      setTimeout(() => {
        // Generate Unique Booking ID
        const bookingId = `VLT-${Math.floor(100000 + Math.random() * 900000)}-X`;
        
        const bookingRecord = {
          bookingId: bookingId,
          createdAt: new Date().toISOString(),
          deviceModel: this.state.deviceModel,
          deviceCategory: this.state.deviceCategory,
          service: VoltaraDB.getServiceById(this.state.serviceId),
          host: VoltaraDB.getHostById(this.state.hostId),
          date: this.state.selectedDateFormatted || "Tomorrow",
          timeSlot: this.state.selectedSlot,
          customer: this.state.customer,
          quote: this.state.quote,
          paymentMethod: this.state.paymentMethod,
          depositStatus: "PAID_IN_ESCROW",
          paymentTxnId: `TXN_VOLT_${Date.now()}`
        };

        // Save into localStorage for confirmation page
        localStorage.setItem('voltara_latest_booking', JSON.stringify(bookingRecord));

        // Toast feedback
        VoltaraToast.show({
          title: "Deposit Authorized!",
          message: `Booking #${bookingId} confirmed. Redirecting to receipt...`,
          type: "success",
          duration: 3000
        });

        // Navigate to confirmation
        setTimeout(() => {
          window.location.href = `booking-confirmation.html?id=${bookingId}`;
        }, 1200);

      }, 1600);
    });
  }
}

// Instantiate on DOMContentLoaded if on booking page
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.booking-engine-root')) {
    window.voltaraBookingInstance = new VoltaraBookingEngine();
  }
});
