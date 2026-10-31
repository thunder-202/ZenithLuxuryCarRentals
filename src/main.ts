/**
 * Zenith Luxury Car Rentals - Pure Vanilla JavaScript Engine
 * Handles Mobile Nav, Fleet Filtering, Live Melbourne Operating Status,
 * Interactive Price Calculation, and Booking Form Management.
 */

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: 'supercar' | 'sedan' | 'suv' | 'grand-tourer';
  dailyRate: number;
  engine: string;
  acceleration: string;
  topSpeed: string;
  image: string;
  badge?: string;
}

const FLEET_DATA: Vehicle[] = [
  {
    id: 'lambo-huracan',
    name: 'Huracán Evo Spyder',
    brand: 'Lamborghini',
    category: 'supercar',
    dailyRate: 1850,
    engine: '5.2L V10 640HP',
    acceleration: '2.9s',
    topSpeed: '325 km/h',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=900&auto=format&fit=crop',
    badge: 'V10 Naturally Aspirated'
  },
  {
    id: 'rolls-ghost',
    name: 'Ghost Extended Series',
    brand: 'Rolls-Royce',
    category: 'sedan',
    dailyRate: 2400,
    engine: '6.75L Twin-Turbo V12',
    acceleration: '4.8s',
    topSpeed: '250 km/h',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=900&auto=format&fit=crop',
    badge: 'Chauffeured / Self-Drive'
  },
  {
    id: 'porsche-911-gt3',
    name: '911 GT3 RS',
    brand: 'Porsche',
    category: 'supercar',
    dailyRate: 1650,
    engine: '4.0L Boxer-6 525HP',
    acceleration: '3.0s',
    topSpeed: '296 km/h',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=900&auto=format&fit=crop',
    badge: 'Track Heritage'
  },
  {
    id: 'ferrari-f8',
    name: 'F8 Tributo Spider',
    brand: 'Ferrari',
    category: 'supercar',
    dailyRate: 1950,
    engine: '3.9L Twin-Turbo V8',
    acceleration: '2.9s',
    topSpeed: '340 km/h',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=900&auto=format&fit=crop',
    badge: '710 Horsepower'
  },
  {
    id: 'amg-g63',
    name: 'G63 AMG BiTurbo',
    brand: 'Mercedes-AMG',
    category: 'suv',
    dailyRate: 1350,
    engine: '4.0L Handcrafted V8',
    acceleration: '4.5s',
    topSpeed: '240 km/h',
    image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=900&auto=format&fit=crop',
    badge: 'Executive Icon'
  },
  {
    id: 'bentley-continental',
    name: 'Continental GT Speed',
    brand: 'Bentley',
    category: 'grand-tourer',
    dailyRate: 1750,
    engine: '6.0L W12 TSI 650HP',
    acceleration: '3.5s',
    topSpeed: '335 km/h',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=900&auto=format&fit=crop',
    badge: 'Pure British Luxury'
  },
  {
    id: 'mclaren-720s',
    name: '720S Performance',
    brand: 'McLaren',
    category: 'supercar',
    dailyRate: 2100,
    engine: '4.0L Twin-Turbo V8',
    acceleration: '2.8s',
    topSpeed: '341 km/h',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=900&auto=format&fit=crop',
    badge: 'Carbon Monocage'
  },
  {
    id: 'range-rover-sv',
    name: 'Range Rover SV Long Wheelbase',
    brand: 'Land Rover',
    category: 'suv',
    dailyRate: 1450,
    engine: '4.4L Twin-Turbo V8',
    acceleration: '4.6s',
    topSpeed: '261 km/h',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=900&auto=format&fit=crop',
    badge: 'First Class Lounge'
  },
  {
    id: 'aston-db11',
    name: 'DB11 V12 Volante',
    brand: 'Aston Martin',
    category: 'grand-tourer',
    dailyRate: 1600,
    engine: '5.2L Twin-Turbo V12',
    acceleration: '3.9s',
    topSpeed: '322 km/h',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=900&auto=format&fit=crop',
    badge: 'Grand Tourer'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  renderFleetGrid(FLEET_DATA);
  initFleetFiltering();
  initBookingForm();
  updateMelbourneOperatingStatus();
  initSmoothScroll();
});

/* ==========================================================================
   1. Navbar Scroll Effect
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector<HTMLButtonElement>('.mobile-toggle');
  const overlay = document.querySelector<HTMLElement>('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav-list .nav-link, .mobile-nav-overlay .btn-primary');

  if (!toggleBtn || !overlay) return;

  const toggleMenu = () => {
    const isOpen = overlay.classList.contains('open');
    if (isOpen) {
      overlay.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      overlay.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   3. Render Fleet Grid
   ========================================================================== */
function renderFleetGrid(vehicles: Vehicle[]) {
  const gridContainer = document.getElementById('fleetGrid');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';

  vehicles.forEach((car) => {
    const card = document.createElement('article');
    card.className = 'car-card';
    card.dataset.category = car.category;
    card.dataset.id = car.id;
    card.id = `car-card-${car.id}`;

    card.innerHTML = `
      <div class="card-image-wrapper">
        <span class="card-category-badge">${getCategoryName(car.category)}</span>
        <span class="card-status-badge">Available</span>
        <img 
          src="${car.image}" 
          alt="${car.brand} ${car.name} - Luxury rental Melbourne"
          class="card-car-img"
          loading="lazy"
          referrerpolicy="no-referrer"
        />
      </div>
      <div class="card-body">
        <span class="card-make">${car.brand}</span>
        <h3 class="card-model">${car.name}</h3>
        
        <div class="card-specs-row">
          <div class="spec-item">
            <span class="spec-label">Engine</span>
            <span class="spec-value">${car.engine.split(' ')[0]} ${car.engine.split(' ')[1] || ''}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">0-100 km/h</span>
            <span class="spec-value">${car.acceleration}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Top Speed</span>
            <span class="spec-value">${car.topSpeed}</span>
          </div>
        </div>

        <div class="card-footer">
          <div class="card-rate-wrap">
            <span class="card-rate-label">Daily Rate</span>
            <span class="card-rate-price">$${car.dailyRate.toLocaleString('en-AU')} <span class="card-rate-unit">/ day</span></span>
          </div>
          <button 
            type="button" 
            class="btn-primary btn-sm rent-now-btn" 
            data-car-id="${car.id}"
            data-category="${car.category}"
            data-model="${car.brand} ${car.name}"
            data-rate="${car.dailyRate}"
            aria-label="Rent ${car.brand} ${car.name}"
          >
            Rent Now
          </button>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });

  // Attach Rent Now click listeners
  attachRentNowListeners();
}

function getCategoryName(category: string): string {
  switch (category) {
    case 'supercar': return 'Supercar';
    case 'sedan': return 'Luxury Sedan';
    case 'suv': return 'Prestige SUV';
    case 'grand-tourer': return 'Grand Tourer';
    default: return 'Exclusive Fleet';
  }
}

/* ==========================================================================
   4. Fleet Filtering
   ========================================================================== */
function initFleetFiltering() {
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
  const gridContainer = document.getElementById('fleetGrid');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter || 'all';

      if (!gridContainer) return;
      const cards = gridContainer.querySelectorAll<HTMLElement>('.car-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Rent Now Button Handlers (Auto-selects car in booking form)
   ========================================================================== */
function attachRentNowListeners() {
  const rentButtons = document.querySelectorAll<HTMLButtonElement>('.rent-now-btn');
  const categorySelect = document.getElementById('carCategory') as HTMLSelectElement | null;
  const modelSelect = document.getElementById('carModel') as HTMLSelectElement | null;
  const bookingSection = document.getElementById('booking');

  rentButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const carId = btn.dataset.carId;
      const category = btn.dataset.category;

      if (categorySelect && category) {
        categorySelect.value = category;
        populateModelDropdown(category);
      }

      if (modelSelect && carId) {
        modelSelect.value = carId;
      }

      updateLiveEstimate();

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        // Pulse highlight booking panel
        const formPanel = document.querySelector<HTMLElement>('.booking-form-panel');
        if (formPanel) {
          formPanel.style.boxShadow = '0 0 40px rgba(197, 168, 128, 0.4)';
          setTimeout(() => {
            formPanel.style.boxShadow = '';
          }, 1500);
        }
      }
    });
  });
}

/* ==========================================================================
   6. Interactive Booking Form & Live Price Calculator
   ========================================================================== */
function initBookingForm() {
  const categorySelect = document.getElementById('carCategory') as HTMLSelectElement | null;
  const modelSelect = document.getElementById('carModel') as HTMLSelectElement | null;
  const pickupDateInput = document.getElementById('pickupDate') as HTMLInputElement | null;
  const dropoffDateInput = document.getElementById('dropoffDate') as HTMLInputElement | null;
  const bookingForm = document.getElementById('bookingForm') as HTMLFormElement | null;
  const insuranceSelect = document.getElementById('insuranceOption') as HTMLSelectElement | null;

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  if (pickupDateInput && dropoffDateInput) {
    pickupDateInput.min = formatDate(today);
    pickupDateInput.value = formatDate(tomorrow);
    dropoffDateInput.min = formatDate(tomorrow);
    dropoffDateInput.value = formatDate(dayAfter);

    pickupDateInput.addEventListener('change', () => {
      if (pickupDateInput.value) {
        const nextDay = new Date(pickupDateInput.value);
        nextDay.setDate(nextDay.getDate() + 1);
        dropoffDateInput.min = formatDate(nextDay);
        if (dropoffDateInput.value <= pickupDateInput.value) {
          dropoffDateInput.value = formatDate(nextDay);
        }
      }
      updateLiveEstimate();
    });

    dropoffDateInput.addEventListener('change', () => {
      updateLiveEstimate();
    });
  }

  // Populate models initially
  if (categorySelect) {
    populateModelDropdown(categorySelect.value || 'all');
    categorySelect.addEventListener('change', () => {
      populateModelDropdown(categorySelect.value);
      updateLiveEstimate();
    });
  }

  if (modelSelect) {
    modelSelect.addEventListener('change', updateLiveEstimate);
  }

  if (insuranceSelect) {
    insuranceSelect.addEventListener('change', updateLiveEstimate);
  }

  updateLiveEstimate();

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingSubmit();
    });
  }

  // Modal close handlers
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('bookingModal');
  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }
}

function populateModelDropdown(category: string) {
  const modelSelect = document.getElementById('carModel') as HTMLSelectElement | null;
  if (!modelSelect) return;

  const filtered = category === 'all' || !category 
    ? FLEET_DATA 
    : FLEET_DATA.filter(car => car.category === category);

  modelSelect.innerHTML = '';
  filtered.forEach(car => {
    const opt = document.createElement('option');
    opt.value = car.id;
    opt.textContent = `${car.brand} ${car.name} ($${car.dailyRate}/day)`;
    modelSelect.appendChild(opt);
  });
}

function updateLiveEstimate() {
  const modelSelect = document.getElementById('carModel') as HTMLSelectElement | null;
  const pickupDateInput = document.getElementById('pickupDate') as HTMLInputElement | null;
  const dropoffDateInput = document.getElementById('dropoffDate') as HTMLInputElement | null;
  const insuranceSelect = document.getElementById('insuranceOption') as HTMLSelectElement | null;

  const estimateDaysEl = document.getElementById('estimateDays');
  const estimateRateEl = document.getElementById('estimateRate');
  const estimateTotalEl = document.getElementById('estimateTotal');

  if (!modelSelect || !pickupDateInput || !dropoffDateInput) return;

  const selectedCar = FLEET_DATA.find(c => c.id === modelSelect.value) || FLEET_DATA[0];
  const rate = selectedCar.dailyRate;

  let days = 2;
  if (pickupDateInput.value && dropoffDateInput.value) {
    const start = new Date(pickupDateInput.value).getTime();
    const end = new Date(dropoffDateInput.value).getTime();
    const diff = Math.ceil((end - start) / (1000 * 3600 * 24));
    days = diff > 0 ? diff : 1;
  }

  let insurancePerDay = 0;
  if (insuranceSelect) {
    if (insuranceSelect.value === 'vip-elite') insurancePerDay = 180;
    if (insuranceSelect.value === 'chauffeur') insurancePerDay = 450;
  }

  const dailySubtotal = rate + insurancePerDay;
  const total = dailySubtotal * days;

  if (estimateDaysEl) estimateDaysEl.textContent = `${days} ${days === 1 ? 'Day' : 'Days'}`;
  if (estimateRateEl) estimateRateEl.textContent = `$${rate.toLocaleString('en-AU')}/day`;
  if (estimateTotalEl) estimateTotalEl.textContent = `$${total.toLocaleString('en-AU')} AUD`;
}

function handleBookingSubmit() {
  const modelSelect = document.getElementById('carModel') as HTMLSelectElement | null;
  const pickupDateInput = document.getElementById('pickupDate') as HTMLInputElement | null;
  const dropoffDateInput = document.getElementById('dropoffDate') as HTMLInputElement | null;
  const nameInput = document.getElementById('clientName') as HTMLInputElement | null;
  const emailInput = document.getElementById('clientEmail') as HTMLInputElement | null;
  const phoneInput = document.getElementById('clientPhone') as HTMLInputElement | null;
  const locationSelect = document.getElementById('pickupLocation') as HTMLSelectElement | null;
  const modal = document.getElementById('bookingModal');

  if (!modal) return;

  const selectedCar = FLEET_DATA.find(c => c.id === (modelSelect?.value || '')) || FLEET_DATA[0];
  const clientName = nameInput?.value || 'Valued Guest';
  const pickupDate = pickupDateInput?.value || 'Tomorrow';
  const dropoffDate = dropoffDateInput?.value || 'In 2 days';
  const locationName = locationSelect?.options[locationSelect.selectedIndex]?.text || '230 Collins St Showroom';
  const totalText = document.getElementById('estimateTotal')?.textContent || '$3,700 AUD';

  // Random VIP booking reference code
  const refCode = `ZENITH-${Math.floor(1000 + Math.random() * 9000)}-MEL`;

  const modalSummary = document.getElementById('modalSummary');
  if (modalSummary) {
    modalSummary.innerHTML = `
      <div class="modal-summary-row">
        <span>Reservation Ref:</span>
        <span class="text-gold">${refCode}</span>
      </div>
      <div class="modal-summary-row">
        <span>Primary Driver:</span>
        <span>${clientName}</span>
      </div>
      <div class="modal-summary-row">
        <span>Vehicle Reserved:</span>
        <span>${selectedCar.brand} ${selectedCar.name}</span>
      </div>
      <div class="modal-summary-row">
        <span>Hire Duration:</span>
        <span>${pickupDate} to ${dropoffDate}</span>
      </div>
      <div class="modal-summary-row">
        <span>Dispatch Location:</span>
        <span>${locationName}</span>
      </div>
      <div class="modal-summary-row">
        <span>Estimated Hire Total:</span>
        <span class="text-gold" style="font-size: 1.1rem;">${totalText}</span>
      </div>
    `;
  }

  modal.classList.add('active');
}

/* ==========================================================================
   7. Real-Time Melbourne Operating Status
   Hours: Monday to Saturday: 7:00 AM – 11:00 PM. Sunday: Closed.
   ========================================================================== */
function updateMelbourneOperatingStatus() {
  const statusPill = document.getElementById('liveStatusPill');
  const statusText = document.getElementById('liveStatusText');
  if (!statusPill || !statusText) return;

  try {
    // Get current time in Melbourne timezone
    const melbourneFormatter = new Intl.DateTimeFormat('en-AU', {
      timeZone: 'Australia/Melbourne',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      weekday: 'short'
    });

    const parts = melbourneFormatter.formatToParts(new Date());
    let weekday = '';
    let hour = 0;
    let minute = 0;

    parts.forEach(p => {
      if (p.type === 'weekday') weekday = p.value.toLowerCase();
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    });

    const isSunday = weekday.startsWith('sun');
    const isOpenHours = hour >= 7 && hour < 23; // 7:00 AM to 11:00 PM (23:00)

    if (isSunday) {
      statusPill.className = 'live-status-pill closed';
      statusText.textContent = 'Closed (Sunday) • VIP Dispatch On-Call';
    } else if (isOpenHours) {
      statusPill.className = 'live-status-pill open';
      statusText.textContent = 'Showroom Open Now • Mon–Sat until 11:00 PM';
    } else {
      statusPill.className = 'live-status-pill closed';
      statusText.textContent = 'Closed Now • Opens Monday–Saturday at 7:00 AM';
    }
  } catch (err) {
    // Fallback if Intl timeZone fails
    statusPill.className = 'live-status-pill open';
    statusText.textContent = 'Mon–Sat: 7:00 AM – 11:00 PM • Sunday: Closed';
  }
}

/* ==========================================================================
   8. Smooth Scroll Utility
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
