/* =====================================================================
   industries-data.js
   ---------------------------------------------------------------------
   Single source of truth for the whole "Industries" demo platform.

   Every industry the company serves is described ONCE here as a plain
   object.  The navbar dropdown, the explorer page (index.html), the demo
   website (demo-website.html) and the demo ERP dashboard (demo-erp.html)
   are ALL generated dynamically from this array — there are no 40
   hand-coded pages.

   Each industry object:
     slug     : url-safe id  ->  demo-website.html?industry=<slug>
     name     : display name (matches the navbar label)
     icon     : Tabler-icon class (ti ti-...)
     color    : primary theme colour for that industry's demos
     tagline  : hero headline used on the demo website
     blurb    : short paragraph used on the demo website / about
     services : 4 service cards shown on the demo website
     modules  : ERP modules (name + icon) shown in the ERP dashboard
   ===================================================================== */

(function (global) {
  "use strict";

  /* Helper so every consumer slugifies names the exact same way. */
  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /* A small reusable set of ERP modules most businesses share.            */
  /* Industries add their own specialised module on top of these.          */
  const CORE = [
    { name: "Dashboard",  icon: "ti ti-layout-dashboard" },
    { name: "Inventory",  icon: "ti ti-packages" },
    { name: "Sales",      icon: "ti ti-shopping-cart" },
    { name: "Purchase",   icon: "ti ti-truck-loading" },
    { name: "Accounting", icon: "ti ti-calculator" },
    { name: "Reports",    icon: "ti ti-chart-bar" },
  ];

  /* Build a module list = CORE + the industry-specific extras passed in. */
  function modules(extra) {
    return CORE.concat(extra || []);
  }

  /* ------------------------------------------------------------------ */
  /*  THE 40 INDUSTRIES                                                  */
  /* ------------------------------------------------------------------ */
  const RAW = [
    {
      name: "Retail & E-Commerce", icon: "ti ti-shopping-bag", color: "#ff5a8a",
      tagline: "Sell Everywhere, Manage From One Place",
      blurb: "An omni-channel retail platform that unifies your online store, point-of-sale and stockroom into a single, real-time system.",
      services: ["Online Store Setup", "POS Integration", "Loyalty Programs", "Order Fulfilment"],
      modules: modules([{ name: "POS Terminal", icon: "ti ti-cash-register" }, { name: "Promotions", icon: "ti ti-discount-2" }]),
    },
    {
      name: "Healthcare & Medical", icon: "ti ti-stethoscope", color: "#1fb6b0",
      tagline: "Better Care Through Smarter Systems",
      blurb: "A HIPAA-minded platform connecting patients, doctors and pharmacies with secure records and effortless appointment booking.",
      services: ["Appointment Booking", "Patient Records", "Telemedicine", "Lab Integration"],
      modules: modules([{ name: "Patients", icon: "ti ti-users" }, { name: "Appointments", icon: "ti ti-calendar-heart" }]),
    },
    {
      name: "Real Estate & Property", icon: "ti ti-home", color: "#8a6cff",
      tagline: "Close More Deals, Manage Every Property",
      blurb: "List, market and manage properties end-to-end — from lead capture to lease, tenant and maintenance management.",
      services: ["Property Listings", "Lead Management", "Lease Tracking", "Virtual Tours"],
      modules: modules([{ name: "Listings", icon: "ti ti-building-estate" }, { name: "Leases", icon: "ti ti-file-description" }]),
    },
    {
      name: "Finance & Banking", icon: "ti ti-building-bank", color: "#3b82f6",
      tagline: "Modern Banking, Built on Trust",
      blurb: "Secure core-banking, lending and wealth tools that keep regulators happy and customers loyal.",
      services: ["Account Management", "Loan Origination", "Risk & Compliance", "Mobile Banking"],
      modules: modules([{ name: "Accounts", icon: "ti ti-wallet" }, { name: "Loans", icon: "ti ti-cash" }]),
    },
    {
      name: "Education & E-Learning", icon: "ti ti-school", color: "#f59e0b",
      tagline: "Learning Without Limits",
      blurb: "A complete campus and e-learning suite covering admissions, classes, grading and online courses.",
      services: ["Course Builder", "Live Classes", "Assessments", "Student Portal"],
      modules: modules([{ name: "Students", icon: "ti ti-user-check" }, { name: "Courses", icon: "ti ti-book" }]),
    },
    {
      name: "Manufacturing & Production", icon: "ti ti-tools", color: "#f97316",
      tagline: "From Raw Material to Finished Goods",
      blurb: "Plan, schedule and track every step of production with real-time shop-floor visibility.",
      services: ["Production Planning", "Bill of Materials", "Quality Control", "Machine Maintenance"],
      modules: modules([{ name: "Production", icon: "ti ti-building-factory-2" }, { name: "BOM", icon: "ti ti-sitemap" }]),
    },
    {
      name: "Logistics & Supply Chain", icon: "ti ti-truck", color: "#0ea5e9",
      tagline: "Move Goods Smarter and Faster",
      blurb: "Track shipments, optimise routes and manage warehouses across your entire supply chain.",
      services: ["Fleet Tracking", "Route Optimisation", "Warehouse Management", "Freight Billing"],
      modules: modules([{ name: "Shipments", icon: "ti ti-package" }, { name: "Fleet", icon: "ti ti-truck-delivery" }]),
    },
    {
      name: "Restaurant & Food", icon: "ti ti-chef-hat", color: "#ef4444",
      tagline: "Serve Faster, Waste Less",
      blurb: "Run dine-in, takeaway and delivery from one kitchen-display-driven system with live menu control.",
      services: ["Table Booking", "Online Ordering", "Kitchen Display", "Menu Management"],
      modules: modules([{ name: "Orders", icon: "ti ti-receipt" }, { name: "Menu", icon: "ti ti-tools-kitchen-2" }]),
    },
    {
      name: "Gold & Jewelry Trading", icon: "ti ti-diamond", color: "#d4af37",
      tagline: "Every Carat, Perfectly Accounted For",
      blurb: "Track ornaments by weight, purity and making-charges with live gold-rate based pricing.",
      services: ["Rate-Based Pricing", "Karat Inventory", "Old-Gold Exchange", "Certification"],
      modules: modules([{ name: "Ornaments", icon: "ti ti-diamond" }, { name: "Gold Rates", icon: "ti ti-coin" }]),
    },
    {
      name: "Hotel & Hospitality", icon: "ti ti-bed", color: "#a855f7",
      tagline: "Delight Every Guest, Every Stay",
      blurb: "Manage rooms, reservations, housekeeping and billing from a single front-desk dashboard.",
      services: ["Room Booking", "Front Desk", "Housekeeping", "Guest Billing"],
      modules: modules([{ name: "Reservations", icon: "ti ti-calendar" }, { name: "Rooms", icon: "ti ti-door" }]),
    },
    {
      name: "Construction & Engineering", icon: "ti ti-crane", color: "#eab308",
      tagline: "Build On Time and On Budget",
      blurb: "Plan projects, control costs and manage labour, materials and equipment from site to office.",
      services: ["Project Planning", "Cost Estimation", "Site Management", "Equipment Tracking"],
      modules: modules([{ name: "Projects", icon: "ti ti-blueprint" }, { name: "Equipment", icon: "ti ti-bulldozer" }]),
    },
    {
      name: "HR & Recruitment", icon: "ti ti-users", color: "#14b8a6",
      tagline: "Hire Great People, Keep Them Happy",
      blurb: "An end-to-end HRMS covering hiring, onboarding, attendance, payroll and performance.",
      services: ["Applicant Tracking", "Onboarding", "Payroll", "Performance Reviews"],
      modules: modules([{ name: "Employees", icon: "ti ti-id-badge-2" }, { name: "Payroll", icon: "ti ti-coins" }]),
    },
    {
      name: "Legal & Law Firms", icon: "ti ti-gavel", color: "#6366f1",
      tagline: "Win Cases, Not Paperwork",
      blurb: "Manage cases, clients, documents and billable hours in one secure practice-management suite.",
      services: ["Case Management", "Document Vault", "Time & Billing", "Client Portal"],
      modules: modules([{ name: "Cases", icon: "ti ti-folder" }, { name: "Documents", icon: "ti ti-file-text" }]),
    },
    {
      name: "Non-Profit & NGO", icon: "ti ti-heart", color: "#ec4899",
      tagline: "Maximise Impact, Minimise Overhead",
      blurb: "Track donations, grants, volunteers and programs with transparent fund accounting.",
      services: ["Donation Management", "Volunteer Hub", "Grant Tracking", "Impact Reporting"],
      modules: modules([{ name: "Donors", icon: "ti ti-heart-handshake" }, { name: "Programs", icon: "ti ti-target-arrow" }]),
    },
    {
      name: "Government & Public Sector", icon: "ti ti-building", color: "#0d9488",
      tagline: "Public Service, Digitally Delivered",
      blurb: "Citizen services, permits and records management built for transparency and scale.",
      services: ["Citizen Services", "Permit Processing", "Records Management", "e-Governance"],
      modules: modules([{ name: "Citizens", icon: "ti ti-users-group" }, { name: "Permits", icon: "ti ti-license" }]),
    },
    {
      name: "Insurance", icon: "ti ti-shield", color: "#2563eb",
      tagline: "Underwrite Smarter, Settle Faster",
      blurb: "Manage policies, claims and renewals with automated underwriting and fraud checks.",
      services: ["Policy Management", "Claims Processing", "Underwriting", "Renewals"],
      modules: modules([{ name: "Policies", icon: "ti ti-file-certificate" }, { name: "Claims", icon: "ti ti-clipboard-check" }]),
    },
    {
      name: "Automotive", icon: "ti ti-car", color: "#dc2626",
      tagline: "Drive Your Dealership Forward",
      blurb: "Showroom sales, service workshop and spare-parts inventory in one connected platform.",
      services: ["Vehicle Sales", "Service Workshop", "Spare Parts", "Test-Drive Booking"],
      modules: modules([{ name: "Vehicles", icon: "ti ti-car" }, { name: "Workshop", icon: "ti ti-settings" }]),
    },
    {
      name: "Agriculture & Farming", icon: "ti ti-plant", color: "#65a30d",
      tagline: "Grow More With Data-Driven Farming",
      blurb: "Plan crops, track yields, manage livestock and monitor inputs from seed to sale.",
      services: ["Crop Planning", "Livestock Records", "Yield Tracking", "Equipment Rental"],
      modules: modules([{ name: "Crops", icon: "ti ti-plant-2" }, { name: "Livestock", icon: "ti ti-cow" }]),
    },
    {
      name: "Fitness & Wellness", icon: "ti ti-barbell", color: "#f43f5e",
      tagline: "Members In, Results Out",
      blurb: "Manage memberships, class schedules, trainers and progress tracking effortlessly.",
      services: ["Membership Plans", "Class Scheduling", "Trainer Management", "Progress Tracking"],
      modules: modules([{ name: "Members", icon: "ti ti-user-heart" }, { name: "Classes", icon: "ti ti-calendar-event" }]),
    },
    {
      name: "Media & Entertainment", icon: "ti ti-movie", color: "#9333ea",
      tagline: "Create, Distribute, Monetise",
      blurb: "Manage content libraries, rights, subscriptions and ad campaigns in one studio platform.",
      services: ["Content Library", "Rights Management", "Subscriptions", "Ad Campaigns"],
      modules: modules([{ name: "Content", icon: "ti ti-photo-video" }, { name: "Subscribers", icon: "ti ti-users" }]),
    },
    {
      name: "Telecom & IT", icon: "ti ti-wifi", color: "#06b6d4",
      tagline: "Keep the World Connected",
      blurb: "Provision services, bill subscribers and track network assets and support tickets.",
      services: ["Subscriber Billing", "Network Assets", "Service Provisioning", "Support Desk"],
      modules: modules([{ name: "Subscribers", icon: "ti ti-device-mobile" }, { name: "Network", icon: "ti ti-router" }]),
    },
    {
      name: "Oil & Gas", icon: "ti ti-flame", color: "#ea580c",
      tagline: "Power Operations From Well to Wallet",
      blurb: "Monitor exploration, production, distribution and HSE compliance across assets.",
      services: ["Production Tracking", "Asset Maintenance", "HSE Compliance", "Distribution"],
      modules: modules([{ name: "Wells", icon: "ti ti-droplet" }, { name: "Safety", icon: "ti ti-shield-check" }]),
    },
    {
      name: "Textile & Apparel", icon: "ti ti-shirt", color: "#db2777",
      tagline: "From Fibre to Fashion",
      blurb: "Manage yarn, fabric and garment production with style, size and colour matrices.",
      services: ["Fabric Inventory", "Production Cycle", "Style Catalogue", "Export Orders"],
      modules: modules([{ name: "Styles", icon: "ti ti-shirt" }, { name: "Production", icon: "ti ti-needle-thread" }]),
    },
    {
      name: "Pharmacy & Drug Store", icon: "ti ti-pill", color: "#10b981",
      tagline: "Right Medicine, Right Time",
      blurb: "Batch and expiry-aware inventory with prescription handling and supplier reordering.",
      services: ["Prescription Sales", "Batch & Expiry", "Supplier Orders", "Drug Database"],
      modules: modules([{ name: "Medicines", icon: "ti ti-pill" }, { name: "Prescriptions", icon: "ti ti-prescription" }]),
    },
    {
      name: "Beauty & Salon", icon: "ti ti-sparkles", color: "#e879a6",
      tagline: "Look Good, Run Smooth",
      blurb: "Online booking, stylist scheduling, packages and product retail in one salon suite.",
      services: ["Online Booking", "Stylist Schedule", "Packages", "Product Retail"],
      modules: modules([{ name: "Appointments", icon: "ti ti-calendar" }, { name: "Stylists", icon: "ti ti-user-star" }]),
    },
    {
      name: "Travel & Tourism", icon: "ti ti-plane", color: "#0891b2",
      tagline: "Plan Journeys, Delight Travellers",
      blurb: "Build packages, book flights and hotels, and manage itineraries and payments.",
      services: ["Package Builder", "Bookings", "Itinerary Planner", "Visa Assistance"],
      modules: modules([{ name: "Bookings", icon: "ti ti-ticket" }, { name: "Packages", icon: "ti ti-map-2" }]),
    },
    {
      name: "Event Management", icon: "ti ti-confetti", color: "#7c3aed",
      tagline: "Flawless Events, Every Time",
      blurb: "Manage venues, vendors, ticketing and guest lists from planning to wrap-up.",
      services: ["Venue Booking", "Vendor Management", "Ticketing", "Guest Lists"],
      modules: modules([{ name: "Events", icon: "ti ti-confetti" }, { name: "Tickets", icon: "ti ti-ticket" }]),
    },
    {
      name: "Security & Surveillance", icon: "ti ti-camera", color: "#475569",
      tagline: "Always Watching, Always Ready",
      blurb: "Manage guards, patrols, devices and incident reports across every protected site.",
      services: ["Guard Scheduling", "Patrol Tracking", "Device Inventory", "Incident Reports"],
      modules: modules([{ name: "Sites", icon: "ti ti-building-warehouse" }, { name: "Incidents", icon: "ti ti-alert-triangle" }]),
    },
    {
      name: "Printing & Publishing", icon: "ti ti-printer", color: "#0284c7",
      tagline: "Press Ready, Profit Ready",
      blurb: "Quote jobs, manage prepress, track print runs and bill clients with ease.",
      services: ["Job Estimation", "Prepress", "Print Tracking", "Client Billing"],
      modules: modules([{ name: "Print Jobs", icon: "ti ti-printer" }, { name: "Materials", icon: "ti ti-stack-2" }]),
    },
    {
      name: "Interior Design & Architecture", icon: "ti ti-ruler", color: "#b45309",
      tagline: "Design It, Deliver It",
      blurb: "Manage projects, mood-boards, BOQs and client approvals from concept to handover.",
      services: ["Project Studio", "Mood Boards", "BOQ & Costing", "Client Approvals"],
      modules: modules([{ name: "Projects", icon: "ti ti-blueprint" }, { name: "Materials", icon: "ti ti-armchair" }]),
    },
    {
      name: "Accounting & Tax Firms", icon: "ti ti-calculator", color: "#15803d",
      tagline: "Books Balanced, Clients Happy",
      blurb: "Manage client books, tax filings, deadlines and document requests in one workspace.",
      services: ["Bookkeeping", "Tax Filing", "Deadline Tracker", "Client Documents"],
      modules: modules([{ name: "Clients", icon: "ti ti-briefcase" }, { name: "Filings", icon: "ti ti-file-invoice" }]),
    },
    {
      name: "Wholesale & Distribution", icon: "ti ti-package", color: "#c2410c",
      tagline: "Distribute at Scale",
      blurb: "Manage bulk inventory, dealer pricing, routes and credit across your distribution network.",
      services: ["Bulk Inventory", "Dealer Pricing", "Route Sales", "Credit Control"],
      modules: modules([{ name: "Dealers", icon: "ti ti-building-store" }, { name: "Warehouses", icon: "ti ti-building-warehouse" }]),
    },
    {
      name: "Import & Export", icon: "ti ti-ship", color: "#1d4ed8",
      tagline: "Trade Across Borders, Seamlessly",
      blurb: "Handle shipments, customs documentation, LCs and multi-currency invoicing.",
      services: ["Shipment Tracking", "Customs Docs", "Letters of Credit", "Multi-Currency"],
      modules: modules([{ name: "Shipments", icon: "ti ti-ship" }, { name: "Customs", icon: "ti ti-file-import" }]),
    },
    {
      name: "Courier & Delivery", icon: "ti ti-bike", color: "#16a34a",
      tagline: "Every Parcel, Perfectly Tracked",
      blurb: "Book pickups, assign riders, track parcels live and manage COD reconciliation.",
      services: ["Parcel Booking", "Rider Dispatch", "Live Tracking", "COD Reconciliation"],
      modules: modules([{ name: "Parcels", icon: "ti ti-package" }, { name: "Riders", icon: "ti ti-motorbike" }]),
    },
    {
      name: "Supermarket & Grocery", icon: "ti ti-basket", color: "#84cc16",
      tagline: "Aisles to Analytics",
      blurb: "Fast checkout, weight-based items, promotions and shelf-level stock control.",
      services: ["Fast Checkout", "Weighing Scale POS", "Promotions", "Shelf Stock"],
      modules: modules([{ name: "POS", icon: "ti ti-cash-register" }, { name: "Shelves", icon: "ti ti-building-store" }]),
    },
    {
      name: "Gym & Sports", icon: "ti ti-run", color: "#f59e0b",
      tagline: "Train Hard, Manage Easy",
      blurb: "Memberships, court bookings, coaching plans and equipment tracking for sports clubs.",
      services: ["Memberships", "Court Booking", "Coaching Plans", "Equipment"],
      modules: modules([{ name: "Members", icon: "ti ti-user-heart" }, { name: "Bookings", icon: "ti ti-ball-football" }]),
    },
    {
      name: "Clinic & Diagnostic Labs", icon: "ti ti-microscope", color: "#0ea5e9",
      tagline: "Accurate Results, Delivered Fast",
      blurb: "Manage test orders, sample tracking, results and reporting across your lab network.",
      services: ["Test Orders", "Sample Tracking", "Result Reporting", "Doctor Referrals"],
      modules: modules([{ name: "Tests", icon: "ti ti-test-pipe" }, { name: "Samples", icon: "ti ti-flask" }]),
    },
    {
      name: "School & University", icon: "ti ti-certificate", color: "#7c3aed",
      tagline: "Educate. Administer. Excel.",
      blurb: "Admissions, timetables, exams, fees and parent communication in one campus system.",
      services: ["Admissions", "Timetabling", "Exams & Grading", "Fee Management"],
      modules: modules([{ name: "Students", icon: "ti ti-user-check" }, { name: "Exams", icon: "ti ti-clipboard-text" }]),
    },
    {
      name: "Car Rental & Fleet", icon: "ti ti-steering-wheel", color: "#0f766e",
      tagline: "Keep the Wheels Turning",
      blurb: "Manage rentals, reservations, maintenance and driver assignments across your fleet.",
      services: ["Rental Booking", "Fleet Maintenance", "Driver Management", "GPS Tracking"],
      modules: modules([{ name: "Vehicles", icon: "ti ti-car" }, { name: "Rentals", icon: "ti ti-key" }]),
    },
    {
      name: "Charity & Social Welfare", icon: "ti ti-hand-heart", color: "#e11d48",
      tagline: "Turning Generosity Into Action",
      blurb: "Manage beneficiaries, campaigns, donations and field distribution with full transparency.",
      services: ["Beneficiary Records", "Campaigns", "Donation Drives", "Field Distribution"],
      modules: modules([{ name: "Beneficiaries", icon: "ti ti-users" }, { name: "Campaigns", icon: "ti ti-speakerphone" }]),
    },
  ];

  /* Attach a slug to every industry and freeze the list. */
  const INDUSTRIES = RAW.map(function (ind) {
    return Object.assign({ slug: slugify(ind.name) }, ind);
  });

  /* Quick lookup by slug — used by the demo pages. */
  function getIndustry(slug) {
    return INDUSTRIES.find(function (i) { return i.slug === slug; }) || null;
  }

  /* Expose globally (no module bundler in this vanilla project). */
  global.INDUSTRIES = INDUSTRIES;
  global.getIndustry = getIndustry;
  global.slugifyIndustry = slugify;
})(window);
