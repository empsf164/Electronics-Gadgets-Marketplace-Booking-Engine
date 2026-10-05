/**
 * VOLTARA - Real-Time Dynamic Calendar & Time Slot Engine
 */

class VoltaraCalendar {
  constructor(options = {}) {
    this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
    this.slotsContainer = typeof options.slotsContainer === 'string' ? document.querySelector(options.slotsContainer) : options.slotsContainer;
    this.onDateSelected = options.onDateSelected || (() => {});
    this.onSlotSelected = options.onSlotSelected || (() => {});
    
    this.today = new Date();
    this.currentMonth = options.initialMonth !== undefined ? options.initialMonth : this.today.getMonth();
    this.currentYear = options.initialYear !== undefined ? options.initialYear : this.today.getFullYear();
    
    this.selectedDate = options.selectedDate ? new Date(options.selectedDate) : new Date(this.today.getTime() + 86400000); // Default tomorrow
    this.selectedSlot = options.selectedSlot || "10:30 AM";
    
    this.monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    this.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    if (this.container) {
      this.init();
    }
  }

  init() {
    this.render();
    if (this.slotsContainer) {
      this.renderTimeSlots(this.selectedDate);
    }
  }

  // Generate realistic availability deterministic per day
  getDayAvailability(year, month, day) {
    const targetDate = new Date(year, month, day);
    const todayMidnight = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    
    if (targetDate < todayMidnight) {
      return { status: 'past', label: 'Past Date', selectable: false };
    }
    
    const dayOfWeek = targetDate.getDay();
    // Sunday is blackout for service labs
    if (dayOfWeek === 0) {
      return { status: 'blackout', label: 'Day Off', selectable: false, slotsCount: 0 };
    }
    
    // Deterministic pseudo-randomness based on date
    const hash = (year * 365 + month * 31 + day * 7) % 10;
    
    if (hash === 2 || hash === 8) {
      return { status: 'full', label: 'Fully Booked', selectable: false, slotsCount: 0 };
    } else if (hash === 1 || hash === 4 || hash === 7) {
      return { status: 'limited', label: 'Limited (2 Left)', selectable: true, slotsCount: 2 };
    } else {
      return { status: 'available', label: 'High Availability', selectable: true, slotsCount: 6 };
    }
  }

  render() {
    if (!this.container) return;

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

    let html = `
      <div class="calendar-header d-flex justify-content-between align-items-center mb-3">
        <button type="button" class="btn btn-sm btn-outline-secondary btn-cal-nav cal-prev-btn" aria-label="Previous Month">
          <i class="bi bi-chevron-left"></i>
        </button>
        <div class="calendar-month-title font-heading fw-bold fs-5">
          ${this.monthNames[this.currentMonth]} ${this.currentYear}
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary btn-cal-nav cal-next-btn" aria-label="Next Month">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <div class="calendar-legend d-flex flex-wrap gap-3 mb-3 py-2 px-3 rounded-2 bg-surface-subtle small">
        <div class="d-flex align-items-center gap-1">
          <span class="legend-dot status-available"></span> Available
        </div>
        <div class="d-flex align-items-center gap-1">
          <span class="legend-dot status-limited"></span> Limited
        </div>
        <div class="d-flex align-items-center gap-1">
          <span class="legend-dot status-full"></span> Booked / Off
        </div>
      </div>

      <div class="calendar-grid">
        <div class="calendar-weekdays d-grid text-center text-muted fw-semibold mb-2">
          ${this.dayNames.map(d => `<div class="weekday-name">${d}</div>`).join('')}
        </div>
        <div class="calendar-days d-grid gap-1 text-center">
    `;

    // Previous month padding days
    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDay = daysInPrevMonth - i;
      html += `<div class="calendar-day day-other-month disabled">${prevDay}</div>`;
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(this.currentYear, this.currentMonth, day);
      const isSelected = this.selectedDate && 
        this.selectedDate.getFullYear() === this.currentYear &&
        this.selectedDate.getMonth() === this.currentMonth &&
        this.selectedDate.getDate() === day;

      const isToday = this.today.getFullYear() === this.currentYear &&
        this.today.getMonth() === this.currentMonth &&
        this.today.getDate() === day;

      const avail = this.getDayAvailability(this.currentYear, this.currentMonth, day);
      const disabledClass = !avail.selectable ? 'disabled' : '';
      const selectedClass = isSelected ? 'selected' : '';
      const todayClass = isToday ? 'is-today' : '';
      const statusClass = `avail-${avail.status}`;

      html += `
        <button type="button" 
          class="calendar-day ${disabledClass} ${selectedClass} ${todayClass} ${statusClass}" 
          data-year="${this.currentYear}" 
          data-month="${this.currentMonth}" 
          data-day="${day}"
          ${!avail.selectable ? 'disabled' : ''}
          title="${this.monthNames[this.currentMonth]} ${day}, ${this.currentYear} - ${avail.label}">
          <span class="day-number">${day}</span>
          <span class="status-indicator"></span>
        </button>
      `;
    }

    html += `
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.bindEvents();
  }

  bindEvents() {
    const prevBtn = this.container.querySelector('.cal-prev-btn');
    const nextBtn = this.container.querySelector('.cal-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
        this.render();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.currentMonth === 11) {
          this.currentMonth = 0;
          this.currentYear++;
        } else {
          this.currentMonth++;
        }
        this.render();
      });
    }

    const dayBtns = this.container.querySelectorAll('.calendar-day:not(.disabled)');
    dayBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const year = parseInt(btn.dataset.year);
        const month = parseInt(btn.dataset.month);
        const day = parseInt(btn.dataset.day);
        
        this.selectedDate = new Date(year, month, day);
        
        // Update UI selection
        this.container.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        btn.classList.add('selected');

        // Render slots
        if (this.slotsContainer) {
          this.renderTimeSlots(this.selectedDate);
        }

        this.onDateSelected(this.selectedDate, this.formatDate(this.selectedDate));
      });
    });
  }

  renderTimeSlots(date) {
    if (!this.slotsContainer) return;

    const dateStr = this.formatDate(date);
    const daySeed = date.getDate();

    // Slot groupings
    const slots = [
      { period: "Morning Slots (Bench Queue 1)", items: [
        { time: "09:00 AM", status: daySeed % 3 === 0 ? "booked" : "available", badge: "Standard" },
        { time: "10:30 AM", status: "available", badge: "Fast-Track" },
        { time: "11:45 AM", status: daySeed % 2 === 0 ? "urgent" : "available", badge: daySeed % 2 === 0 ? "1 Slot Left" : "Available" }
      ]},
      { period: "Afternoon Slots (Bench Queue 2)", items: [
        { time: "01:30 PM", status: "available", badge: "Available" },
        { time: "02:45 PM", status: daySeed % 4 === 0 ? "booked" : "urgent", badge: daySeed % 4 === 0 ? "Booked" : "1 Slot Left" },
        { time: "04:00 PM", status: "available", badge: "Priority" },
        { time: "05:15 PM", status: "available", badge: "Available" }
      ]},
      { period: "Evening Slots (Bench Queue 3)", items: [
        { time: "06:30 PM", status: "available", badge: "Evening Express" },
        { time: "07:15 PM", status: daySeed % 2 === 1 ? "booked" : "available", badge: "Late Intake" }
      ]}
    ];

    let html = `
      <div class="slots-header mb-3 d-flex justify-content-between align-items-center">
        <div>
          <span class="text-secondary small">Slots for:</span>
          <span class="fw-bold text-primary ms-1">${dateStr}</span>
        </div>
        <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
          <i class="bi bi-clock-history me-1"></i> Live Real-Time Availability
        </span>
      </div>
    `;

    slots.forEach(group => {
      html += `
        <div class="slot-group mb-3">
          <div class="slot-group-title text-muted small fw-semibold mb-2 text-uppercase letter-spacing-1">
            ${group.period}
          </div>
          <div class="slot-grid d-flex flex-wrap gap-2">
      `;

      group.items.forEach(slot => {
        const isBooked = slot.status === 'booked';
        const isSelected = this.selectedSlot === slot.time && !isBooked;
        const statusBadgeClass = slot.status === 'urgent' ? 'badge-urgent' : slot.badge === 'Fast-Track' ? 'badge-fast' : 'badge-norm';

        html += `
          <button type="button" 
            class="time-slot-btn ${isBooked ? 'disabled' : ''} ${isSelected ? 'selected' : ''}" 
            data-time="${slot.time}"
            ${isBooked ? 'disabled' : ''}>
            <span class="slot-time fw-semibold">${slot.time}</span>
            <span class="slot-tag ${statusBadgeClass}">${slot.status === 'booked' ? 'Booked' : slot.badge}</span>
          </button>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    this.slotsContainer.innerHTML = html;
    this.bindSlotEvents();
  }

  bindSlotEvents() {
    const slotBtns = this.slotsContainer.querySelectorAll('.time-slot-btn:not(.disabled)');
    slotBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectedSlot = btn.dataset.time;
        this.slotsContainer.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.onSlotSelected(this.selectedSlot);
      });
    });
  }

  formatDate(date) {
    if (!date) return "";
    const day = date.getDate();
    const month = this.monthNames[date.getMonth()];
    const year = date.getFullYear();
    const weekday = this.dayNames[date.getDay()];
    return `${weekday}, ${month} ${day}, ${year}`;
  }

  formatDateISO(date) {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

// Export to window
if (typeof window !== 'undefined') {
  window.VoltaraCalendar = VoltaraCalendar;
}
