/**
 * VOLTARA - Electronics Gadgets Marketplace & Booking Engine
 * Master Data Store & Initial State
 */

const VOLTARA_DATA = {
  // Brand Metadata
  brand: {
    name: "VOLTARA",
    tagline: "Discover Better Tech. Book Smarter Service.",
    currency: "₹",
    currencyCode: "INR",
    supportEmail: "support@voltara.tech",
    supportPhone: "+1 (800) 865-8272",
    headquarters: "450 Silicon Boulevard, Tech District"
  },

  // Gadgets Catalog
  gadgets: [
    {
      id: "iphone-15-pro-max",
      name: "Apple iPhone 15 Pro Max",
      category: "smartphones",
      categoryLabel: "Smartphone",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      description: "Titanium design with A17 Pro chip and 48MP periscope telephoto system.",
      serviceAvailability: "High (12+ Verified Hosts)",
      startingServicePrice: 1899,
      popularServices: ["Screen Replacement", "Battery Upgrade", "Camera Calibration", "Diagnostics"]
    },
    {
      id: "macbook-pro-m3",
      name: "Apple MacBook Pro 16\" (M3 Max)",
      category: "laptops",
      categoryLabel: "Laptop",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      description: "Liquid Retina XDR display with extreme workstation compute architecture.",
      serviceAvailability: "Immediate (8 Specialists)",
      startingServicePrice: 2499,
      popularServices: ["Thermal Paste Overhaul", "Liquid Damage Ultrasonic", "Logic Board Repair", "SSD Migration"]
    },
    {
      id: "galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      category: "smartphones",
      categoryLabel: "Smartphone",
      brand: "Samsung",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      description: "Galaxy AI powerhouse with 200MP Quad Tele System and integrated S Pen.",
      serviceAvailability: "High (14+ Verified Hosts)",
      startingServicePrice: 1799,
      popularServices: ["OLED Panel Replacement", "Motherboard Micro-Soldering", "S-Pen Sensor Calib", "Battery Swap"]
    },
    {
      id: "sony-a7-iv",
      name: "Sony Alpha A7 IV Full-Frame",
      category: "cameras",
      categoryLabel: "Camera",
      brand: "Sony",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
      description: "33MP Exmor R CMOS sensor with BIONZ XR processing and 4K 60p 10-bit recording.",
      serviceAvailability: "Specialist Only (5 Pro Labs)",
      startingServicePrice: 2999,
      popularServices: ["Cleanroom Sensor Clean", "Shutter Replacement", "IBIS Alignment", "Firmware Rig Setup"]
    },
    {
      id: "ps5-slim-pro",
      name: "Sony PlayStation 5 Slim",
      category: "gaming",
      categoryLabel: "Gaming Console",
      brand: "Sony",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      description: "Ultra-high speed SSD with liquid metal thermal dissipation and Ray Tracing.",
      serviceAvailability: "High (9 Verified Hosts)",
      startingServicePrice: 1499,
      popularServices: ["Liquid Metal Re-Application", "HDMI Port Micro-Soldering", "Optical Drive Fix", "SSD Expansion"]
    },
    {
      id: "rog-zephyrus-g16",
      name: "ASUS ROG Zephyrus G16 (OLED)",
      category: "laptops",
      categoryLabel: "Gaming Laptop",
      brand: "ASUS",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      description: "Nebula OLED display with Intel Core Ultra 9 and RTX 4090 vapor chamber cooling.",
      serviceAvailability: "High (11 Verified Hosts)",
      startingServicePrice: 2199,
      popularServices: ["Vapor Chamber Service", "OLED Screen Repair", "RAM/SSD Upgrade", "Fan De-Dusting"]
    },
    {
      id: "ipad-pro-m2",
      name: "iPad Pro 12.9\" Liquid Retina XDR",
      category: "tablets",
      categoryLabel: "Tablet",
      brand: "Apple",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      description: "Mini-LED backlight system with Apple Pencil Hover and Thunderbolt port.",
      serviceAvailability: "High (10 Verified Hosts)",
      startingServicePrice: 1999,
      popularServices: ["Digitizer Replacement", "USB-C Port Replacement", "Battery Optimization", "Data Recovery"]
    },
    {
      id: "sonos-era-300",
      name: "Sonos Era 300 Spatial Audio System",
      category: "smarthome",
      categoryLabel: "Smart Home & Audio",
      brand: "Sonos",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      description: "Dolby Atmos acoustic architecture with Trueplay tuning and multi-room WiFi integration.",
      serviceAvailability: "Certified Techs (6 Hosts)",
      startingServicePrice: 1599,
      popularServices: ["Multi-Room Calibration", "Trueplay Acoustic Tune", "Mesh Network Linking", "Driver Diagnostic"]
    }
  ],

  // Services Catalog
  services: [
    {
      id: "screen-replacement",
      title: "Ultra Retina & LTPO OLED Screen Assembly Replacement",
      category: "repairs",
      categoryLabel: "Hardware Repair",
      targetDevices: ["Smartphones", "Laptops", "Tablets"],
      basePrice: 3899,
      turnaround: "2 - 4 Hours",
      rating: 4.96,
      reviewsCount: 428,
      description: "Factory-grade precision display assembly swap with TrueTone and HDR calibration. Includes dust-free laminar flow bench installation.",
      included: [
        "OEM-grade OLED/Retina panel with original color gamut",
        "Factory water-resistance gasket resealing",
        "TrueTone / Ambient light sensor EEPROM reprogramming",
        "Digitizer touch sampling & dead pixel calibration",
        "365-Day Voltara Shield Warranty"
      ],
      notIncluded: [
        "Logic board trace repair (if damaged by drop impact)",
        "Rear housing replacement"
      ],
      warranty: "12 Months Comprehensive Coverage",
      badge: "Most Popular",
      icon: "bi-display",
      urgencyLevels: [
        { id: "standard", label: "Standard (Within 24 Hours)", fee: 0 },
        { id: "express", label: "Express Turnaround (Under 4 Hours)", fee: 499 },
        { id: "rush", label: "Immediate Priority Bench (60-90 Mins)", fee: 999 }
      ],
      addons: [
        { id: "nano-shield", label: "9H+ Hydrophobic Nano Glass Shield", price: 449, checked: true },
        { id: "extended-warranty", label: "Voltara Care+ Extra 12 Months Warranty", price: 899, checked: false },
        { id: "battery-bundle", label: "Discounted OEM Battery Swap (Bundle Saver)", price: 1499, checked: false }
      ],
      faqs: [
        { q: "Will my Face ID / Fingerprint sensor continue working?", a: "Yes. Our certified hosts transfer the secure biometrics module using calibrated micro-soldering tools to retain full biometric functionality." },
        { q: "Is the screen identical to factory original?", a: "We only use Tier-1 OEM Grade assemblies with full color gamut (DCI-P3), high refresh rate support (120Hz ProMotion/LTPO), and original peak nit brightness." },
        { q: "How does the deposit payment work?", a: "You pay a small 25% deposit today to secure your host's time slot and bench queue. The remainder is only settled after thorough testing and handover." }
      ]
    },
    {
      id: "battery-replacement",
      title: "High-Capacity OEM Battery Replacement & Health Calibration",
      category: "maintenance",
      categoryLabel: "Battery & Power",
      targetDevices: ["Smartphones", "Laptops", "Tablets", "Smartwatches"],
      basePrice: 1999,
      turnaround: "45 - 90 Mins",
      rating: 4.94,
      reviewsCount: 312,
      description: "Zero-cycle high density lithium-ion cell installation with cycle count reset, battery health calibration, and thermal adhesive bonding.",
      included: [
        "100% Brand new zero-cycle high-purity battery cell",
        "Full internal decontamination and thermal strip refresh",
        "Battery health telemetry calibration (100% health report)",
        "Overheat and surge protection multi-meter stress test",
        "6-Month No-Degradation Warranty"
      ],
      notIncluded: [
        "Charging port micro-solder repair"
      ],
      warranty: "6 Months / 500-Cycle Health Guarantee",
      badge: "Instant Service",
      icon: "bi-battery-charging",
      urgencyLevels: [
        { id: "standard", label: "Standard (Same Day)", fee: 0 },
        { id: "express", label: "Express While-You-Wait (45 Mins)", fee: 399 }
      ],
      addons: [
        { id: "thermal-tune", label: "SoC Thermal Graphite Strip Repasting", price: 299, checked: true },
        { id: "charging-port-clean", label: "USB-C/Lightning Port Ultrasonic Cleanse", price: 199, checked: true }
      ],
      faqs: [
        { q: "Will I get the 'Unknown Part' warning on iOS?", a: "Our hosts perform BMS (Battery Management System) micro-welding on compatible devices to avoid non-genuine notifications." },
        { q: "How long does the replacement take?", a: "Most mobile and laptop batteries are replaced within 45 to 60 minutes." }
      ]
    },
    {
      id: "laptop-thermal-overhaul",
      title: "Liquid Metal & Honeywell PTM7950 Phase-Change Thermal Overhaul",
      category: "performance",
      categoryLabel: "PC & Laptop Tuning",
      targetDevices: ["Laptops", "Gaming Rigs", "Consoles"],
      basePrice: 1799,
      turnaround: "2 - 3 Hours",
      rating: 4.98,
      reviewsCount: 267,
      description: "Total thermal bottleneck elimination. Removal of crusty factory paste, ultrasonic fan de-dusting, and application of Honeywell PTM7950 phase-change or Conductonaut liquid metal.",
      included: [
        "Complete disassembly and high-pressure ultrasonic fin cleaning",
        "Application of Honeywell PTM7950 or TG Conductonaut",
        "K5 Pro high-viscosity thermal putty on VRMs & VRAM",
        "Pre & Post Cinebench/3DMark stress delta temperature test",
        "Fan bearing high-speed lubricant application"
      ],
      notIncluded: [
        "Vapor chamber replacement if factory warped"
      ],
      warranty: "6 Months Thermal Stability Guarantee",
      badge: "Pro Performance",
      icon: "bi-fan",
      urgencyLevels: [
        { id: "standard", label: "Standard 24h Bench", fee: 0 },
        { id: "express", label: "Priority 3-Hour Bench", fee: 449 }
      ],
      addons: [
        { id: "nvme-heatsink", label: "Copper Vapor M.2 NVMe Thermal Shield", price: 399, checked: false },
        { id: "bios-undervolt", label: "Custom BIOS Curve Optimizer & Undervolt", price: 599, checked: false }
      ],
      faqs: [
        { q: "How much temperature drop can I expect?", a: "Clients routinely see 8°C to 18°C drops under heavy sustained gaming/render workloads, eliminating thermal throttling." }
      ]
    },
    {
      id: "device-diagnostics",
      title: "Full-Spectrum 72-Point Hardware Diagnostic",
      category: "diagnostics",
      categoryLabel: "Diagnostics",
      targetDevices: ["All Electronics", "Phones", "Laptops", "Consoles", "Cameras"],
      basePrice: 499,
      turnaround: "1 Hour",
      rating: 4.92,
      reviewsCount: 520,
      description: "Oscilloscope voltage rail inspection, battery impedance testing, thermal imaging camera scan for PCB micro-shorts, and detailed repair roadmap.",
      included: [
        "FLIR Thermal infrared scan for shorted power ICs",
        "SMD power rail multi-meter continuity check",
        "Battery internal resistance & capacity audit",
        "Full digital diagnostic report with itemized repair quote",
        "100% Diagnostic Fee Waiver if you proceed with repair"
      ],
      notIncluded: [
        "Component-level replacement parts"
      ],
      warranty: "100% Diagnostic Accuracy Guarantee",
      badge: "Low Cost",
      icon: "bi-search",
      urgencyLevels: [
        { id: "standard", label: "Standard Bench (Same Day)", fee: 0 },
        { id: "rush", label: "Priority Live Bench (30 Mins)", fee: 299 }
      ],
      addons: [
        { id: "data-safety-check", label: "Storage Health & Bit-Rot Integrity Scan", price: 299, checked: true }
      ],
      faqs: [
        { q: "Do I pay for diagnosis if I choose to repair?", a: "No! 100% of your diagnostic fee is credited directly toward your repair cost." }
      ]
    },
    {
      id: "liquid-damage-ultrasonic",
      title: "Ultrasonic PCB De-Corrosion & Micro-Soldering",
      category: "repairs",
      categoryLabel: "Micro-Soldering",
      targetDevices: ["Smartphones", "MacBooks", "Laptops", "Cameras"],
      basePrice: 3499,
      turnaround: "24 - 48 Hours",
      rating: 4.97,
      reviewsCount: 198,
      description: "Specialized rescue procedure for drowned or spilled electronics. Includes 40kHz ultrasonic chemical tank wash, infrared drying, and component reballing.",
      included: [
        "Multi-stage Branson 40kHz ultrasonic solvent wash",
        "Microscopic inspection of corroded solder joints",
        "Replacement of blown filter capacitors & back-light diodes",
        "Conformal coating application on vulnerable circuitry",
        "Data recovery preservation priority"
      ],
      notIncluded: [
        "New motherboard replacement if CPU silicon shorted"
      ],
      warranty: "90 Days Water Rescue Warranty",
      badge: "High Tech",
      icon: "bi-moisture",
      urgencyLevels: [
        { id: "standard", label: "Standard Ultrasonic Soak (24-48h)", fee: 0 },
        { id: "express", label: "Emergency Rapid De-Hydration (12h)", fee: 899 }
      ],
      addons: [
        { id: "emergency-clone", label: "Instant Full Bitstream Raw SSD Clone", price: 999, checked: true }
      ],
      faqs: [
        { q: "What should I do right now before sending my wet device?", a: "Turn it OFF immediately. Do NOT plug in a charger. Do NOT put it in rice (rice dust causes short-circuits). Bring it in ASAP!" }
      ]
    },
    {
      id: "console-hdmi-repair",
      title: "PS5 / Xbox Series X HDMI 2.1 Micro-Soldering",
      category: "gaming",
      categoryLabel: "Console Service",
      targetDevices: ["PS5", "Xbox Series X/S", "Nintendo Switch"],
      basePrice: 2899,
      turnaround: "2 Hours",
      rating: 4.95,
      reviewsCount: 241,
      description: "Precision microscope replacement of bent or torn 4K@120Hz HDMI 2.1 ports with reinforced solder anchor pads.",
      included: [
        "Reinforced heavy-duty Gold-Plated OEM HDMI 2.1 Port",
        "Microscopic 24-pin pad trace restoration if pads were ripped",
        "Panasonic HDMI encoder IC inspection and diode check",
        "Full 4K/120Hz HDR VRR handshake verification test",
        "180-Day Solder Pad Guarantee"
      ],
      notIncluded: [
        "APU Reballing"
      ],
      warranty: "6 Months Solid-Joint Warranty",
      badge: "Specialized",
      icon: "bi-controller",
      urgencyLevels: [
        { id: "standard", label: "Standard Same-Day Bench", fee: 0 },
        { id: "express", label: "Fast-Track 1-Hour Repair", fee: 499 }
      ],
      addons: [
        { id: "power-supply-clean", label: "Internal PSU De-clog & Thermal Test", price: 349, checked: true }
      ],
      faqs: [
        { q: "Why did my HDMI port fail?", a: "Tripping over cables or inserting cords at an angle bends the internal plastic tongue. Our replacement uses reinforced anchors." }
      ]
    },
    {
      id: "camera-sensor-calibration",
      title: "Cleanroom Sensor De-Speckle & AF Calibration",
      category: "cameras",
      categoryLabel: "Pro Imaging",
      targetDevices: ["DSLRs", "Mirrorless Cameras", "Cinema Rigs"],
      basePrice: 2499,
      turnaround: "3 Hours",
      rating: 4.99,
      reviewsCount: 165,
      description: "Class 100 laminar cleanroom sensor wet cleaning, anti-static coating, and laser-assisted autofocus back-focus/front-focus micro-adjustment.",
      included: [
        "HEPA-filtered Class 100 laminar flow chamber service",
        "Sensor IR-cut filter non-abrasive static solvent swipe",
        "Lens mount flange distance depth-micrometer check",
        "Autofocus phase-detect calibration target tuning",
        "High f/22 test image verification"
      ],
      notIncluded: [
        "Scratched low-pass filter glass replacement"
      ],
      warranty: "Zero-Dust Post-Service Guarantee",
      badge: "Pro Imaging",
      icon: "bi-camera",
      urgencyLevels: [
        { id: "standard", label: "Standard 24-Hour Service", fee: 0 },
        { id: "express", label: "Pre-Shoot Express (2 Hours)", fee: 599 }
      ],
      addons: [
        { id: "lens-element-clean", label: "Front/Rear Lens Element Fungus Check", price: 499, checked: true }
      ],
      faqs: [
        { q: "Can sensor cleaning fix scratches?", a: "Wet cleaning removes oil, pollen, and dust specks. If the glass has physical scratch marks, low-pass filter replacement is required." }
      ]
    },
    {
      id: "smart-home-thread-setup",
      title: "Matter & Thread Smart Home Ecosystem Integration",
      category: "smarthome",
      categoryLabel: "Smart Home",
      targetDevices: ["Smart Home Hubs", "Sonos", "HomeKit", "Zigbee/Matter Nodes"],
      basePrice: 2999,
      turnaround: "On-Site (3-4 Hours)",
      rating: 4.93,
      reviewsCount: 142,
      description: "Professional network topology optimization, Thread Border Router pairing, local-only offline automation setup, and high-fidelity multi-room audio alignment.",
      included: [
        "Dual-band/Tri-band WiFi channel segregation and QoS setup",
        "Thread mesh border router mesh strengthening",
        "Apple Home / Google Home / Home Assistant bridge linking",
        "Automated scene programming and voice assistant calibration",
        "30-Day Network Stability Guarantee"
      ],
      notIncluded: [
        "In-wall electrical conduit rewiring"
      ],
      warranty: "30-Day On-Site Support Included",
      badge: "On-Site Service",
      icon: "bi-house-gear",
      urgencyLevels: [
        { id: "standard", label: "Scheduled Appointment", fee: 0 },
        { id: "weekend", label: "Weekend / Evening Slot", fee: 499 }
      ],
      addons: [
        { id: "ups-backup-setup", label: "Network Gateway Mini-UPS Integration", price: 799, checked: false }
      ],
      faqs: [
        { q: "Will this work if my internet goes down?", a: "Yes! We specialize in Matter local IP routing so your lights and automations function even during internet outages." }
      ]
    }
  ],

  // Verified Hosts & Service Providers
  hosts: [
    {
      id: "apex-lab",
      name: "Apex Precision Tech Labs",
      tagline: "Master Micro-Soldering & Tier-1 Cleanroom Facility",
      avatar: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      isVerified: true,
      tier: "Master Certified Lab",
      tierBadge: "Master Certified",
      rating: 4.98,
      reviewsCount: 342,
      completedBookings: 1840,
      location: "Tech Quarter, Silicon Boulevard (Hub #4)",
      city: "Metro Tech District",
      type: "service-center",
      typeLabel: "Service Center Lab",
      turnaroundAvg: "2.4 Hours",
      responseTime: "< 8 Mins",
      successRate: "99.4%",
      experienceYears: 9,
      workingHours: "Mon - Sat: 08:30 AM - 07:30 PM",
      slotDurationMins: 60,
      depositPercentage: 25,
      specialties: ["Micro-Soldering", "OLED Refurbishment", "Liquid Damage Rescue", "MacBook Logic Boards"],
      about: "Apex Precision Tech Labs is a specialized high-density electronics service center equipped with Class 100 laminar benches, Weller micro-soldering stations, and FLIR thermal analyzers. With over 9 years of precision micro-repair, our certified engineers handle motherboard diagnostics that other shops turn away.",
      certifications: ["IPC-7711/7721 Certified Rework", "Apple Certified ACiT", "ESD Cleanroom Certified"],
      servicesOffered: [
        { serviceId: "screen-replacement", customPrice: 3899, duration: "2 Hours" },
        { serviceId: "battery-replacement", customPrice: 1999, duration: "45 Mins" },
        { serviceId: "laptop-thermal-overhaul", customPrice: 1799, duration: "2 Hours" },
        { serviceId: "device-diagnostics", customPrice: 499, duration: "45 Mins" },
        { serviceId: "liquid-damage-ultrasonic", customPrice: 3499, duration: "24 Hours" }
      ],
      reviewsList: [
        {
          author: "Devon Vance",
          role: "Hardware Architect",
          rating: 5,
          date: "3 days ago",
          service: "Liquid Damage Ultrasonic & Logic Board Repair",
          comment: "My MacBook M3 Max suffered a severe coffee spill. Apple quoted ₹90,000 for full board swap. Apex rescued the board within 24 hours, replaced 3 corroded power FETs, and saved all my uncommitted code. Absolute masters."
        },
        {
          author: "Elena Rostova",
          role: "Mobile App Lead",
          rating: 5,
          date: "1 week ago",
          service: "Screen Replacement",
          comment: "Flawless OEM screen swap on my 15 Pro Max. TrueTone intact, 120Hz butter smooth, and finished in exactly 90 minutes while I worked from their clean waiting lounge."
        }
      ]
    },
    {
      id: "volt-fix-mobile",
      name: "VoltFix Rapid Mobile Techs",
      tagline: "On-Demand Van Service — We Come To Your Doorstep",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      isVerified: true,
      tier: "Top Rated Mobile Fleet",
      tierBadge: "Mobile Specialist",
      rating: 4.95,
      reviewsCount: 218,
      completedBookings: 1120,
      location: "On-Demand Mobile Coverage (15km Radius)",
      city: "Metro Region (Doorstep)",
      type: "mobile-tech",
      typeLabel: "Mobile Van Tech",
      turnaroundAvg: "45 Mins (On-Site)",
      responseTime: "< 5 Mins",
      successRate: "99.1%",
      experienceYears: 6,
      workingHours: "Mon - Sun: 08:00 AM - 09:00 PM",
      slotDurationMins: 45,
      depositPercentage: 20,
      specialties: ["Doorstep Screen Repair", "Express Battery Swap", "Workstation Cleaning", "Data Migration"],
      about: "VoltFix operates custom-engineered mobile repair vans fitted with battery-isolated workstations, static-safe ESD surfaces, and complete parts inventories. You never have to leave your desk—our technician completes your service right outside your home or office.",
      certifications: ["Mobile ESD Standards Council", "Samsung Certified Mobile Expert"],
      servicesOffered: [
        { serviceId: "screen-replacement", customPrice: 3999, duration: "45 Mins" },
        { serviceId: "battery-replacement", customPrice: 1899, duration: "35 Mins" },
        { serviceId: "device-diagnostics", customPrice: 499, duration: "30 Mins" }
      ],
      reviewsList: [
        {
          author: "Marcus Brody",
          role: "Creative Director",
          rating: 5,
          date: "2 days ago",
          service: "High-Capacity Battery Replacement",
          comment: "The technician pulled up to my studio in their mobile van. Within 35 minutes my phone battery was at 100% capacity with zero hassle. Seamless experience!"
        }
      ]
    },
    {
      id: "silicon-craft",
      name: "SiliconCraft Rig & Console Studio",
      tagline: "Bespoke Thermal Engineering, Overclocking & Console Specialists",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      isVerified: true,
      tier: "Performance Master",
      tierBadge: "Rig & Console Studio",
      rating: 4.99,
      reviewsCount: 410,
      completedBookings: 2350,
      location: "Hardware Hub, Cyber Square #12",
      city: "Metro East Hub",
      type: "independent-specialist",
      typeLabel: "Independent Specialist",
      turnaroundAvg: "2.0 Hours",
      responseTime: "< 10 Mins",
      successRate: "99.8%",
      experienceYears: 11,
      workingHours: "Tue - Sun: 10:00 AM - 08:30 PM",
      slotDurationMins: 60,
      depositPercentage: 25,
      specialties: ["PS5 HDMI Micro-Soldering", "Honeywell PTM7950 Repasting", "Liquid Cooling Loops", "GPU VRAM Reballing"],
      about: "SiliconCraft is founded by seasoned PC enthusiasts and console technicians. From complex HDMI 2.1 pad reconstruction to custom phase-change thermal overhauls, we treat every gaming machine like a championship rig.",
      certifications: ["Sony Console Specialist Guild", "Advanced BGA Micro-Rework Cert"],
      servicesOffered: [
        { serviceId: "console-hdmi-repair", customPrice: 2899, duration: "2 Hours" },
        { serviceId: "laptop-thermal-overhaul", customPrice: 1799, duration: "2 Hours" },
        { serviceId: "device-diagnostics", customPrice: 499, duration: "45 Mins" }
      ],
      reviewsList: [
        {
          author: "Siddharth Nair",
          role: "Esports Competitor",
          rating: 5,
          date: "5 days ago",
          service: "PS5 HDMI Repair & PTM7950 Repaste",
          comment: "My PS5 ripped its HDMI port after getting pulled off a shelf. SiliconCraft reconstructed the trace pads with micro-jumpers and repasted the liquid metal. Runs quieter than day one!"
        }
      ]
    },
    {
      id: "optic-zenith",
      name: "Zenith Optics & Sensor Works",
      tagline: "Cleanroom Calibration for Cinema Cameras & Pro Glass",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80",
      isVerified: true,
      tier: "Cinema & Optical Guild",
      tierBadge: "Pro Imaging Lab",
      rating: 4.97,
      reviewsCount: 184,
      completedBookings: 890,
      location: "Studio Arts Corridor, Lens House #8",
      city: "Metro Arts Hub",
      type: "service-center",
      typeLabel: "Optics Laboratory",
      turnaroundAvg: "3.5 Hours",
      responseTime: "< 15 Mins",
      successRate: "99.5%",
      experienceYears: 14,
      workingHours: "Mon - Fri: 09:00 AM - 06:00 PM",
      slotDurationMins: 90,
      depositPercentage: 30,
      specialties: ["Sensor Cleanroom De-dusting", "Autofocus Micro-Calibration", "Flange Depth Alignment", "Lens De-Fungus"],
      about: "Zenith Optics serves professional cinematographers, fashion photographers, and camera rental houses. Our HEPA Class 100 cleanroom guarantees spotless sensors with zero micro-abrasions.",
      certifications: ["Certified Optical Lens Technician", "Sony & Canon Cinema Body Accredited"],
      servicesOffered: [
        { serviceId: "camera-sensor-calibration", customPrice: 2499, duration: "3 Hours" },
        { serviceId: "device-diagnostics", customPrice: 499, duration: "1 Hour" }
      ],
      reviewsList: [
        {
          author: "Chloe Dubois",
          role: "Commercial DP",
          rating: 5,
          date: "1 week ago",
          service: "Cleanroom Sensor Calibration",
          comment: "I had stubborn oil specks on my FX6 sensor before a major commercial shoot. Zenith did a same-day cleanroom sweep and autofocus alignment. Spotless at f/22."
        }
      ]
    },
    {
      id: "nexus-home",
      name: "Nexus Smart Home & IoT Integrators",
      tagline: "Certified Thread & Matter On-Site Automation Engineers",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      coverImage: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
      isVerified: true,
      tier: "Smart Home Authority",
      tierBadge: "On-Site IoT Specialist",
      rating: 4.93,
      reviewsCount: 156,
      completedBookings: 670,
      location: "Metro Smart District & Greater Suburbs",
      city: "On-Site Residential",
      type: "mobile-tech",
      typeLabel: "On-Site Engineer",
      turnaroundAvg: "3.5 Hours (On-Site)",
      responseTime: "< 12 Mins",
      successRate: "98.9%",
      experienceYears: 7,
      workingHours: "Mon - Sat: 09:00 AM - 07:00 PM",
      slotDurationMins: 120,
      depositPercentage: 20,
      specialties: ["Matter/Thread Optimization", "Sonos Multi-Room Tuning", "Local Smart Lighting", "Zero-Lag HomeKit"],
      about: "Nexus builds bulletproof smart homes that never lag or disconnect. We solve complex Wi-Fi congestion, configure local-first Thread mesh networks, and integrate high-end multi-room audio.",
      certifications: ["Connectivity Standards Alliance (CSA) Matter Certified", "CEDIA Smart Home Professional"],
      servicesOffered: [
        { serviceId: "smart-home-thread-setup", customPrice: 2999, duration: "3 Hours" },
        { serviceId: "device-diagnostics", customPrice: 499, duration: "1 Hour" }
      ],
      reviewsList: [
        {
          author: "Karan Singhania",
          role: "Tech Executive",
          rating: 5,
          date: "4 days ago",
          service: "Matter & Thread Ecosystem Integration",
          comment: "Nexus sorted out 45 rogue Zigbee/Matter switches and calibrated our Sonos surround system in one afternoon. Fast, clean, and everything works offline instantly."
        }
      ]
    }
  ],

  // Guides & Technical Resources
  guides: [
    {
      id: "thermal-throttling-2026",
      title: "The 2026 Thermal Throttling Survival Guide: Liquid Metal vs PTM7950",
      category: "Performance",
      categorySlug: "performance",
      readTime: "6 min read",
      author: "Alex Rivera, Lead Thermal Specialist",
      date: "Oct 2, 2026",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      excerpt: "Why modern thin-and-light workstations throttle within 18 months, and how phase-change Honeywell PTM7950 solves pump-out degradation permanently.",
      content: "Modern high-wattage CPUs spike past 95°C in milliseconds. Factory paste degrades due to pump-out effects within 6-12 months. In this deep dive, we explore thermal conductivity deltas, safety barrier conformal coatings for liquid metal, and why phase change pads are revolutionizing portable computing."
    },
    {
      id: "water-damage-first-60-mins",
      title: "Water Damage Protocol: The Golden 60 Minutes Before Ultrasonic De-Corrosion",
      category: "Troubleshooting",
      categorySlug: "troubleshooting",
      readTime: "4 min read",
      author: "Samira Patel, Micro-Soldering Lead",
      date: "Sep 28, 2026",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      excerpt: "Step-by-step triage when electronics get drenched: Why the rice myth destroys motherboards and how galvanic corrosion works under DC voltage.",
      content: "When water meets active DC voltage on a logic board, galvanic electrolysis eats through copper traces in minutes. Learn the exact immediate emergency shutdown steps, capacitor isolation, and why only ultrasonic solvent cavitation can prevent latent component failure."
    },
    {
      id: "oled-burn-in-checklist",
      title: "OLED Degradation vs Image Retention: Diagnostic Checklist for Creators",
      category: "Display & Screen",
      categorySlug: "display",
      readTime: "5 min read",
      author: "David Chen, Display Calibration Engineer",
      date: "Sep 20, 2026",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
      excerpt: "How to distinguish temporary pixel persistence from irreversible sub-pixel emitter burnout on modern OLED and mini-LED panels.",
      content: "With high-nit HDR displays becoming ubiquitous across tablets and laptops, pixel refresh cycles and uniform thermal dissipation have never been more critical. Here is how to test color uniformity at 5% gray."
    },
    {
      id: "matter-thread-smart-home",
      title: "Matter 1.3 & Thread: Building a Zero-Latency Offline-First Smart Home",
      category: "Smart Home",
      categorySlug: "smarthome",
      readTime: "7 min read",
      author: "Elena Rostova, IoT Systems Architect",
      date: "Sep 15, 2026",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      excerpt: "Banish the cloud lag. How IPv6-based Thread mesh border routers create self-healing home networks that trigger in under 15 milliseconds.",
      content: "Tired of smart lights taking 3 seconds to turn on? Discover how Thread Border Routers remove proprietary bridge bottlenecks and keep your home operating seamlessly even during complete ISP fiber cuts."
    }
  ]
};

// Helper Utilities for Lookup
const VoltaraDB = {
  getAllServices: () => VOLTARA_DATA.services,
  getServiceById: (id) => VOLTARA_DATA.services.find(s => s.id === id) || VOLTARA_DATA.services[0],
  getAllHosts: () => VOLTARA_DATA.hosts,
  getHostById: (id) => VOLTARA_DATA.hosts.find(h => h.id === id) || VOLTARA_DATA.hosts[0],
  getAllGadgets: () => VOLTARA_DATA.gadgets,
  getGadgetById: (id) => VOLTARA_DATA.gadgets.find(g => g.id === id) || VOLTARA_DATA.gadgets[0],
  getAllGuides: () => VOLTARA_DATA.guides,
  getGuideById: (id) => VOLTARA_DATA.guides.find(g => g.id === id) || VOLTARA_DATA.guides[0],

  // Formatter helper
  formatCurrency: (amount) => {
    return `${VOLTARA_DATA.brand.currency}${Number(amount).toLocaleString('en-IN')}`;
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.VOLTARA_DATA = VOLTARA_DATA;
  window.VoltaraDB = VoltaraDB;
}
