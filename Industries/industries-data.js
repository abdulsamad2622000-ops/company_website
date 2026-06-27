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
     icon     : Bootstrap-icon class (bi bi-...)
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
    { name: "Dashboard",  icon: "bi bi-grid" },
    { name: "Inventory",  icon: "bi bi-box-seam" },
    { name: "Sales",      icon: "bi bi-cart" },
    { name: "Purchase",   icon: "bi bi-truck" },
    { name: "Accounting", icon: "bi bi-calculator" },
    { name: "Reports",    icon: "bi bi-bar-chart" },
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
      name: "Retail & E-Commerce", icon: "bi bi-bag", color: "#ff5a8a",
      tagline: "Sell Everywhere, Manage From One Place",
      blurb: "An omni-channel retail platform that unifies your online store, point-of-sale and stockroom into a single, real-time system.",
      services: ["Online Store Setup", "POS Integration", "Loyalty Programs", "Order Fulfilment"],
      modules: modules([{ name: "POS Terminal", icon: "bi bi-receipt-cutoff" }, { name: "Promotions", icon: "bi bi-tag" }]),
    },
    {
      name: "Healthcare & Medical", icon: "bi bi-heart-pulse", color: "#1fb6b0",
      tagline: "Better Care Through Smarter Systems",
      blurb: "A HIPAA-minded platform connecting patients, doctors and pharmacies with secure records and effortless appointment booking.",
      services: ["Appointment Booking", "Patient Records", "Telemedicine", "Lab Integration"],
      modules: modules([{ name: "Patients", icon: "bi bi-people" }, { name: "Appointments", icon: "bi bi-calendar-heart" }]),
    },
    {
      name: "Real Estate & Property", icon: "bi bi-house", color: "#8a6cff",
      tagline: "Close More Deals, Manage Every Property",
      blurb: "List, market and manage properties end-to-end — from lead capture to lease, tenant and maintenance management.",
      services: ["Property Listings", "Lead Management", "Lease Tracking", "Virtual Tours"],
      modules: modules([{ name: "Listings", icon: "bi bi-buildings" }, { name: "Leases", icon: "bi bi-file-text" }]),
    },
    {
      name: "Finance & Banking", icon: "bi bi-bank2", color: "#3b82f6",
      tagline: "Modern Banking, Built on Trust",
      blurb: "Secure core-banking, lending and wealth tools that keep regulators happy and customers loyal.",
      services: ["Account Management", "Loan Origination", "Risk & Compliance", "Mobile Banking"],
      modules: modules([{ name: "Accounts", icon: "bi bi-wallet" }, { name: "Loans", icon: "bi bi-cash" }]),
    },
    {
      name: "Education & E-Learning", icon: "bi bi-mortarboard", color: "#f59e0b",
      tagline: "Learning Without Limits",
      blurb: "A complete campus and e-learning suite covering admissions, classes, grading and online courses.",
      services: ["Course Builder", "Live Classes", "Assessments", "Student Portal"],
      modules: modules([{ name: "Students", icon: "bi bi-person-check" }, { name: "Courses", icon: "bi bi-book" }]),
    },
    {
      name: "Manufacturing & Production", icon: "bi bi-tools", color: "#f97316",
      tagline: "From Raw Material to Finished Goods",
      blurb: "Plan, schedule and track every step of production with real-time shop-floor visibility.",
      services: ["Production Planning", "Bill of Materials", "Quality Control", "Machine Maintenance"],
      modules: modules([{ name: "Production", icon: "bi bi-building" }, { name: "BOM", icon: "bi bi-diagram-3" }]),
    },
    {
      name: "Logistics & Supply Chain", icon: "bi bi-truck-front", color: "#0ea5e9",
      tagline: "Move Goods Smarter and Faster",
      blurb: "Track shipments, optimise routes and manage warehouses across your entire supply chain.",
      services: ["Fleet Tracking", "Route Optimisation", "Warehouse Management", "Freight Billing"],
      modules: modules([{ name: "Shipments", icon: "bi bi-box" }, { name: "Fleet", icon: "bi bi-truck-front" }]),
    },
    {
      name: "Restaurant & Food", icon: "bi bi-cup-hot", color: "#ef4444",
      tagline: "Serve Faster, Waste Less",
      blurb: "Run dine-in, takeaway and delivery from one kitchen-display-driven system with live menu control.",
      services: ["Table Booking", "Online Ordering", "Kitchen Display", "Menu Management"],
      modules: modules([{ name: "Orders", icon: "bi bi-receipt" }, { name: "Menu", icon: "bi bi-cup-hot" }]),
    },
    {
      name: "Gold & Jewelry Trading", icon: "bi bi-gem", color: "#d4af37",
      tagline: "Every Carat, Perfectly Accounted For",
      blurb: "Track ornaments by weight, purity and making-charges with live gold-rate based pricing.",
      services: ["Rate-Based Pricing", "Karat Inventory", "Old-Gold Exchange", "Certification"],
      modules: modules([{ name: "Ornaments", icon: "bi bi-gem" }, { name: "Gold Rates", icon: "bi bi-coin" }]),
    },
    {
      name: "Hotel & Hospitality", icon: "bi bi-house", color: "#a855f7",
      tagline: "Delight Every Guest, Every Stay",
      blurb: "Manage rooms, reservations, housekeeping and billing from a single front-desk dashboard.",
      services: ["Room Booking", "Front Desk", "Housekeeping", "Guest Billing"],
      modules: modules([{ name: "Reservations", icon: "bi bi-calendar" }, { name: "Rooms", icon: "bi bi-door-open" }]),
    },
    {
      name: "Construction & Engineering", icon: "bi bi-building", color: "#eab308",
      tagline: "Build On Time and On Budget",
      blurb: "Plan projects, control costs and manage labour, materials and equipment from site to office.",
      services: ["Project Planning", "Cost Estimation", "Site Management", "Equipment Tracking"],
      modules: modules([{ name: "Projects", icon: "bi bi-file-earmark-ruled" }, { name: "Equipment", icon: "bi bi-truck" }]),
    },
    {
      name: "HR & Recruitment", icon: "bi bi-people", color: "#14b8a6",
      tagline: "Hire Great People, Keep Them Happy",
      blurb: "An end-to-end HRMS covering hiring, onboarding, attendance, payroll and performance.",
      services: ["Applicant Tracking", "Onboarding", "Payroll", "Performance Reviews"],
      modules: modules([{ name: "Employees", icon: "bi bi-person-badge" }, { name: "Payroll", icon: "bi bi-coin" }]),
    },
    {
      name: "Legal & Law Firms", icon: "bi bi-hammer", color: "#6366f1",
      tagline: "Win Cases, Not Paperwork",
      blurb: "Manage cases, clients, documents and billable hours in one secure practice-management suite.",
      services: ["Case Management", "Document Vault", "Time & Billing", "Client Portal"],
      modules: modules([{ name: "Cases", icon: "bi bi-folder" }, { name: "Documents", icon: "bi bi-file-text" }]),
    },
    {
      name: "Non-Profit & NGO", icon: "bi bi-heart", color: "#ec4899",
      tagline: "Maximise Impact, Minimise Overhead",
      blurb: "Track donations, grants, volunteers and programs with transparent fund accounting.",
      services: ["Donation Management", "Volunteer Hub", "Grant Tracking", "Impact Reporting"],
      modules: modules([{ name: "Donors", icon: "bi bi-handshake" }, { name: "Programs", icon: "bi bi-bullseye" }]),
    },
    {
      name: "Government & Public Sector", icon: "bi bi-building", color: "#0d9488",
      tagline: "Public Service, Digitally Delivered",
      blurb: "Citizen services, permits and records management built for transparency and scale.",
      services: ["Citizen Services", "Permit Processing", "Records Management", "e-Governance"],
      modules: modules([{ name: "Citizens", icon: "bi bi-people-fill" }, { name: "Permits", icon: "bi bi-file-earmark-check" }]),
    },
    {
      name: "Insurance", icon: "bi bi-shield", color: "#2563eb",
      tagline: "Underwrite Smarter, Settle Faster",
      blurb: "Manage policies, claims and renewals with automated underwriting and fraud checks.",
      services: ["Policy Management", "Claims Processing", "Underwriting", "Renewals"],
      modules: modules([{ name: "Policies", icon: "bi bi-file-earmark-text" }, { name: "Claims", icon: "bi bi-clipboard-check" }]),
    },
    {
      name: "Automotive", icon: "bi bi-car-front", color: "#dc2626",
      tagline: "Drive Your Dealership Forward",
      blurb: "Showroom sales, service workshop and spare-parts inventory in one connected platform.",
      services: ["Vehicle Sales", "Service Workshop", "Spare Parts", "Test-Drive Booking"],
      modules: modules([{ name: "Vehicles", icon: "bi bi-car-front" }, { name: "Workshop", icon: "bi bi-gear" }]),
    },
    {
      name: "Agriculture & Farming", icon: "bi bi-flower1", color: "#65a30d",
      tagline: "Grow More With Data-Driven Farming",
      blurb: "Plan crops, track yields, manage livestock and monitor inputs from seed to sale.",
      services: ["Crop Planning", "Livestock Records", "Yield Tracking", "Equipment Rental"],
      modules: modules([{ name: "Crops", icon: "bi bi-tree" }, { name: "Livestock", icon: "bi bi-piggy-bank" }]),
    },
    {
      name: "Fitness & Wellness", icon: "bi bi-activity", color: "#f43f5e",
      tagline: "Members In, Results Out",
      blurb: "Manage memberships, class schedules, trainers and progress tracking effortlessly.",
      services: ["Membership Plans", "Class Scheduling", "Trainer Management", "Progress Tracking"],
      modules: modules([{ name: "Members", icon: "bi bi-person-heart" }, { name: "Classes", icon: "bi bi-calendar-event" }]),
    },
    {
      name: "Media & Entertainment", icon: "bi bi-film", color: "#9333ea",
      tagline: "Create, Distribute, Monetise",
      blurb: "Manage content libraries, rights, subscriptions and ad campaigns in one studio platform.",
      services: ["Content Library", "Rights Management", "Subscriptions", "Ad Campaigns"],
      modules: modules([{ name: "Content", icon: "bi bi-collection-play" }, { name: "Subscribers", icon: "bi bi-people" }]),
    },
    {
      name: "Telecom & IT", icon: "bi bi-wifi", color: "#06b6d4",
      tagline: "Keep the World Connected",
      blurb: "Provision services, bill subscribers and track network assets and support tickets.",
      services: ["Subscriber Billing", "Network Assets", "Service Provisioning", "Support Desk"],
      modules: modules([{ name: "Subscribers", icon: "bi bi-phone" }, { name: "Network", icon: "bi bi-router" }]),
    },
    {
      name: "Oil & Gas", icon: "bi bi-fire", color: "#ea580c",
      tagline: "Power Operations From Well to Wallet",
      blurb: "Monitor exploration, production, distribution and HSE compliance across assets.",
      services: ["Production Tracking", "Asset Maintenance", "HSE Compliance", "Distribution"],
      modules: modules([{ name: "Wells", icon: "bi bi-droplet" }, { name: "Safety", icon: "bi bi-shield-check" }]),
    },
    {
      name: "Textile & Apparel", icon: "bi bi-bag", color: "#db2777",
      tagline: "From Fibre to Fashion",
      blurb: "Manage yarn, fabric and garment production with style, size and colour matrices.",
      services: ["Fabric Inventory", "Production Cycle", "Style Catalogue", "Export Orders"],
      modules: modules([{ name: "Styles", icon: "bi bi-bag" }, { name: "Production", icon: "bi bi-scissors" }]),
    },
    {
      name: "Pharmacy & Drug Store", icon: "bi bi-capsule", color: "#10b981",
      tagline: "Right Medicine, Right Time",
      blurb: "Batch and expiry-aware inventory with prescription handling and supplier reordering.",
      services: ["Prescription Sales", "Batch & Expiry", "Supplier Orders", "Drug Database"],
      modules: modules([{ name: "Medicines", icon: "bi bi-capsule" }, { name: "Prescriptions", icon: "bi bi-file-medical" }]),
    },
    {
      name: "Beauty & Salon", icon: "bi bi-stars", color: "#e879a6",
      tagline: "Look Good, Run Smooth",
      blurb: "Online booking, stylist scheduling, packages and product retail in one salon suite.",
      services: ["Online Booking", "Stylist Schedule", "Packages", "Product Retail"],
      modules: modules([{ name: "Appointments", icon: "bi bi-calendar" }, { name: "Stylists", icon: "bi bi-person-badge" }]),
    },
    {
      name: "Travel & Tourism", icon: "bi bi-airplane", color: "#0891b2",
      tagline: "Plan Journeys, Delight Travellers",
      blurb: "Build packages, book flights and hotels, and manage itineraries and payments.",
      services: ["Package Builder", "Bookings", "Itinerary Planner", "Visa Assistance"],
      modules: modules([{ name: "Bookings", icon: "bi bi-ticket" }, { name: "Packages", icon: "bi bi-map" }]),
    },
    {
      name: "Event Management", icon: "bi bi-balloon", color: "#7c3aed",
      tagline: "Flawless Events, Every Time",
      blurb: "Manage venues, vendors, ticketing and guest lists from planning to wrap-up.",
      services: ["Venue Booking", "Vendor Management", "Ticketing", "Guest Lists"],
      modules: modules([{ name: "Events", icon: "bi bi-balloon" }, { name: "Tickets", icon: "bi bi-ticket" }]),
    },
    {
      name: "Security & Surveillance", icon: "bi bi-camera", color: "#475569",
      tagline: "Always Watching, Always Ready",
      blurb: "Manage guards, patrols, devices and incident reports across every protected site.",
      services: ["Guard Scheduling", "Patrol Tracking", "Device Inventory", "Incident Reports"],
      modules: modules([{ name: "Sites", icon: "bi bi-building-fill" }, { name: "Incidents", icon: "bi bi-exclamation-triangle" }]),
    },
    {
      name: "Printing & Publishing", icon: "bi bi-printer", color: "#0284c7",
      tagline: "Press Ready, Profit Ready",
      blurb: "Quote jobs, manage prepress, track print runs and bill clients with ease.",
      services: ["Job Estimation", "Prepress", "Print Tracking", "Client Billing"],
      modules: modules([{ name: "Print Jobs", icon: "bi bi-printer" }, { name: "Materials", icon: "bi bi-stack" }]),
    },
    {
      name: "Interior Design & Architecture", icon: "bi bi-rulers", color: "#b45309",
      tagline: "Design It, Deliver It",
      blurb: "Manage projects, mood-boards, BOQs and client approvals from concept to handover.",
      services: ["Project Studio", "Mood Boards", "BOQ & Costing", "Client Approvals"],
      modules: modules([{ name: "Projects", icon: "bi bi-file-earmark-ruled" }, { name: "Materials", icon: "bi bi-display" }]),
    },
    {
      name: "Accounting & Tax Firms", icon: "bi bi-calculator", color: "#15803d",
      tagline: "Books Balanced, Clients Happy",
      blurb: "Manage client books, tax filings, deadlines and document requests in one workspace.",
      services: ["Bookkeeping", "Tax Filing", "Deadline Tracker", "Client Documents"],
      modules: modules([{ name: "Clients", icon: "bi bi-briefcase" }, { name: "Filings", icon: "bi bi-file-earmark-text" }]),
    },
    {
      name: "Wholesale & Distribution", icon: "bi bi-box", color: "#c2410c",
      tagline: "Distribute at Scale",
      blurb: "Manage bulk inventory, dealer pricing, routes and credit across your distribution network.",
      services: ["Bulk Inventory", "Dealer Pricing", "Route Sales", "Credit Control"],
      modules: modules([{ name: "Dealers", icon: "bi bi-shop" }, { name: "Warehouses", icon: "bi bi-building-fill" }]),
    },
    {
      name: "Import & Export", icon: "bi bi-water", color: "#1d4ed8",
      tagline: "Trade Across Borders, Seamlessly",
      blurb: "Handle shipments, customs documentation, LCs and multi-currency invoicing.",
      services: ["Shipment Tracking", "Customs Docs", "Letters of Credit", "Multi-Currency"],
      modules: modules([{ name: "Shipments", icon: "bi bi-water" }, { name: "Customs", icon: "bi bi-file-earmark-arrow-down" }]),
    },
    {
      name: "Courier & Delivery", icon: "bi bi-bicycle", color: "#16a34a",
      tagline: "Every Parcel, Perfectly Tracked",
      blurb: "Book pickups, assign riders, track parcels live and manage COD reconciliation.",
      services: ["Parcel Booking", "Rider Dispatch", "Live Tracking", "COD Reconciliation"],
      modules: modules([{ name: "Parcels", icon: "bi bi-box" }, { name: "Riders", icon: "bi bi-bicycle" }]),
    },
    {
      name: "Supermarket & Grocery", icon: "bi bi-basket", color: "#84cc16",
      tagline: "Aisles to Analytics",
      blurb: "Fast checkout, weight-based items, promotions and shelf-level stock control.",
      services: ["Fast Checkout", "Weighing Scale POS", "Promotions", "Shelf Stock"],
      modules: modules([{ name: "POS", icon: "bi bi-receipt-cutoff" }, { name: "Shelves", icon: "bi bi-shop" }]),
    },
    {
      name: "Gym & Sports", icon: "bi bi-person-walking", color: "#f59e0b",
      tagline: "Train Hard, Manage Easy",
      blurb: "Memberships, court bookings, coaching plans and equipment tracking for sports clubs.",
      services: ["Memberships", "Court Booking", "Coaching Plans", "Equipment"],
      modules: modules([{ name: "Members", icon: "bi bi-person-heart" }, { name: "Bookings", icon: "bi bi-dribbble" }]),
    },
    {
      name: "Clinic & Diagnostic Labs", icon: "bi bi-binoculars", color: "#0ea5e9",
      tagline: "Accurate Results, Delivered Fast",
      blurb: "Manage test orders, sample tracking, results and reporting across your lab network.",
      services: ["Test Orders", "Sample Tracking", "Result Reporting", "Doctor Referrals"],
      modules: modules([{ name: "Tests", icon: "bi bi-beaker" }, { name: "Samples", icon: "bi bi-flask" }]),
    },
    {
      name: "School & University", icon: "bi bi-award", color: "#7c3aed",
      tagline: "Educate. Administer. Excel.",
      blurb: "Admissions, timetables, exams, fees and parent communication in one campus system.",
      services: ["Admissions", "Timetabling", "Exams & Grading", "Fee Management"],
      modules: modules([{ name: "Students", icon: "bi bi-person-check" }, { name: "Exams", icon: "bi bi-clipboard" }]),
    },
    {
      name: "Car Rental & Fleet", icon: "bi bi-car-front-fill", color: "#0f766e",
      tagline: "Keep the Wheels Turning",
      blurb: "Manage rentals, reservations, maintenance and driver assignments across your fleet.",
      services: ["Rental Booking", "Fleet Maintenance", "Driver Management", "GPS Tracking"],
      modules: modules([{ name: "Vehicles", icon: "bi bi-car-front" }, { name: "Rentals", icon: "bi bi-key" }]),
    },
    {
      name: "Charity & Social Welfare", icon: "bi bi-hand-thumbs-up", color: "#e11d48",
      tagline: "Turning Generosity Into Action",
      blurb: "Manage beneficiaries, campaigns, donations and field distribution with full transparency.",
      services: ["Beneficiary Records", "Campaigns", "Donation Drives", "Field Distribution"],
      modules: modules([{ name: "Beneficiaries", icon: "bi bi-people" }, { name: "Campaigns", icon: "bi bi-megaphone" }]),
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
