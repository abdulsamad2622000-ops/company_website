/* ═══════════════════════════════════════════════════════════
   SERVICE DETAIL PAGE — service-detail.js
   Reads ?service=slug from URL → populates the page
═══════════════════════════════════════════════════════════ */

/* ── Slug helper ── */
function toSlug(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .trim()
    .replace(/\s+/g, '-');
}

/* ═══════════════════════════════════════════════════════════
   ALL SERVICES DATA
═══════════════════════════════════════════════════════════ */
const SERVICES = {

  /* ─── SOFTWARE DEVELOPMENT ─── */
  'custom-software-development': {
    name: 'Custom Software Development',
    category: 'Software Development',
    icon: 'ti ti-code',
    tagline: 'Software built exactly the way your business works.',
    description: 'We design and develop fully tailored software solutions from scratch — no templates, no compromises. Whether you need an internal tool, a client-facing platform, or a complex enterprise system, we engineer it around your exact workflows, goals, and growth plans. Our team handles everything from architecture to deployment and ongoing support.',
    features: [
      'Full requirements analysis & system design',
      'Scalable, cloud-ready architecture',
      'Agile sprints with regular client demos',
      'Custom admin dashboards & reporting',
      'Third-party API & system integrations',
      'Full QA, testing & deployment',
      'Source code ownership — 100% yours',
      'Post-launch support & maintenance',
    ],
    benefits: [
      { icon: 'ti ti-building-skyscraper', title: 'Enterprises', desc: 'Digitize complex workflows and replace legacy systems' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Build your core product with the right architecture' },
      { icon: 'ti ti-briefcase', title: 'SMBs', desc: 'Replace spreadsheets and manual processes with automation' },
    ],
    whyUs: [
      'Battle-tested development process with 150+ delivered projects',
      'Dedicated project manager for every client',
      'Clean, documented, and maintainable codebase',
      'Milestone-based delivery with transparent timelines',
      'NDA-protected — your idea stays confidential',
    ],
  },

  'erp-development': {
    name: 'ERP Development',
    category: 'Software Development',
    icon: 'ti ti-building-factory',
    tagline: 'One system to run your entire business.',
    description: 'We build custom ERP (Enterprise Resource Planning) systems that connect every department in your company — from inventory and procurement to HR, payroll, accounting, and sales. Unlike off-the-shelf ERP software, our solutions are engineered specifically for your business model, industry, and scale.',
    features: [
      'Inventory & warehouse management',
      'Procurement & vendor management',
      'HR, payroll & attendance tracking',
      'Finance, accounting & invoicing',
      'Sales order & CRM module',
      'Production & manufacturing planning',
      'Role-based access control',
      'Real-time dashboards & analytics',
    ],
    benefits: [
      { icon: 'ti ti-tools', title: 'Manufacturers', desc: 'Manage production, materials, and workforce in one place' },
      { icon: 'ti ti-truck', title: 'Distributors', desc: 'Streamline procurement, stock, and delivery operations' },
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Eliminate data silos and unify all business units' },
    ],
    whyUs: [
      'ERP experts with 10+ years of domain experience',
      'Industry-specific configurations for 40+ sectors',
      'Phased rollout to minimise business disruption',
      'Full data migration from your existing systems',
      'Ongoing training and 24/7 support',
    ],
  },

  'crm-development': {
    name: 'CRM Development',
    category: 'Software Development',
    icon: 'ti ti-users',
    tagline: 'Know your customers. Grow your sales.',
    description: 'We build custom CRM (Customer Relationship Management) platforms tailored to your sales pipeline, customer journey, and team structure. Manage leads, automate follow-ups, track deals, and get real-time insights into your sales performance — all in one place built exactly for how you work.',
    features: [
      'Lead capture & pipeline management',
      'Contact & account management',
      'Automated follow-up & email sequences',
      'Deal tracking & sales forecasting',
      'Task assignments & team collaboration',
      'Customer activity timeline',
      'Custom reports & dashboards',
      'Integration with email, WhatsApp & calls',
    ],
    benefits: [
      { icon: 'ti ti-chart-bar', title: 'Sales Teams', desc: 'Close more deals with organised pipelines and automations' },
      { icon: 'ti ti-headset', title: 'Support Teams', desc: 'Track customer issues and reduce resolution time' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Centralise all customer data and eliminate manual tracking' },
    ],
    whyUs: [
      'Fully custom — not a reskinned Salesforce or HubSpot',
      'Workflow automation tailored to your sales process',
      'Mobile-friendly for field sales teams',
      'Seamless WhatsApp & email channel integration',
      'Live training sessions for your entire team',
    ],
  },

  'saas-product-development': {
    name: 'SaaS Product Development',
    category: 'Software Development',
    icon: 'ti ti-cloud',
    tagline: 'Build your SaaS. Scale without limits.',
    description: 'We design and develop multi-tenant SaaS (Software as a Service) products from concept to launch. Whether you are building a B2B platform, a marketplace, or a subscription tool, we architect it for scalability, security, and reliability — ready to handle thousands of users from day one.',
    features: [
      'Multi-tenant architecture design',
      'Subscription billing & payment gateway',
      'User roles, teams & permission management',
      'Onboarding flows & in-app guides',
      'Usage analytics & metrics dashboard',
      'API-first design for integrations',
      'Auto-scaling cloud infrastructure',
      'White-label & reseller support',
    ],
    benefits: [
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Launch fast with a production-grade SaaS MVP' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Productise internal tools and sell them as a service' },
      { icon: 'ti ti-chart-line', title: 'Entrepreneurs', desc: 'Turn your idea into recurring revenue' },
    ],
    whyUs: [
      'SaaS-native architecture from day one — no refactoring needed later',
      'Stripe & PayPal billing integration built in',
      'Designed for 99.9% uptime with load balancing',
      'Security-first: SOC 2, GDPR-ready foundation',
      'Post-launch growth engineering support',
    ],
  },

  'mvp-development': {
    name: 'MVP Development',
    category: 'Software Development',
    icon: 'ti ti-rocket',
    tagline: 'Validate your idea fast. Build smart.',
    description: 'We help startups and entrepreneurs go from idea to a working, user-tested Minimum Viable Product in the shortest time possible. Our MVP process focuses on the core features that matter most — cutting scope without cutting quality — so you can launch, learn, and iterate confidently.',
    features: [
      'Discovery & feature prioritisation workshop',
      'UX wireframes & interactive prototype',
      'Core feature development (lean scope)',
      'User authentication & onboarding',
      'Payment or subscription setup (if needed)',
      'Beta testing with real users',
      'App Store / web launch preparation',
      'Iteration roadmap post-launch',
    ],
    benefits: [
      { icon: 'ti ti-bulb', title: 'Founders', desc: 'Validate product-market fit before full investment' },
      { icon: 'ti ti-chart-pie', title: 'Investors', desc: 'Get a working demo to present to investors and partners' },
      { icon: 'ti ti-users', title: 'Innovators', desc: 'Gather real user feedback to shape the final product' },
    ],
    whyUs: [
      '4–8 week average delivery from kickoff to live MVP',
      'Equity-friendly pricing for early-stage startups',
      'Pitch deck and product demo support',
      'Built to scale — MVP code used in the full product',
      'Helped 30+ startups raise funding with our MVPs',
    ],
  },

  'enterprise-software': {
    name: 'Enterprise Software',
    category: 'Software Development',
    icon: 'ti ti-server',
    tagline: 'Mission-critical software. Enterprise grade.',
    description: 'We build robust, secure, and highly scalable software systems designed for large enterprises with complex operational requirements. From multi-department platforms to high-volume transaction systems, our enterprise solutions handle the demands of real business at scale.',
    features: [
      'High-availability system architecture',
      'Enterprise SSO & Active Directory integration',
      'Compliance-ready (GDPR, HIPAA, ISO 27001)',
      'Custom approval workflows & audit trails',
      'Multi-region cloud deployment',
      'Disaster recovery & backup systems',
      'On-premise or hybrid cloud deployment',
      'SLA-backed 24/7 monitoring',
    ],
    benefits: [
      { icon: 'ti ti-building-skyscraper', title: 'Large Enterprises', desc: 'Unify operations across departments and geographies' },
      { icon: 'ti ti-shield', title: 'Regulated Industries', desc: 'Meet compliance requirements with built-in audit tools' },
      { icon: 'ti ti-users', title: 'Large Teams', desc: 'Support thousands of concurrent users without slowdown' },
    ],
    whyUs: [
      'Fortune 500-class engineering practices',
      'Dedicated DevOps and security team',
      'Zero-downtime deployment pipelines',
      'Full documentation and knowledge transfer',
      'Long-term partnership with dedicated account manager',
    ],
  },

  'business-process-automation': {
    name: 'Business Process Automation',
    category: 'Software Development',
    icon: 'ti ti-robot',
    tagline: 'Automate the routine. Focus on what matters.',
    description: 'We help businesses identify, design, and implement automation for repetitive and time-consuming processes. From document workflows and approvals to data entry, reporting, and communication — we replace manual work with smart, reliable automation that runs 24/7.',
    features: [
      'Process audit & automation opportunity mapping',
      'Workflow design & automation blueprinting',
      'Document generation & e-signature workflows',
      'Approval & notification pipelines',
      'Data extraction & report automation',
      'CRM, ERP & third-party tool integration',
      'Scheduled task & batch job automation',
      'Error alerts & monitoring dashboards',
    ],
    benefits: [
      { icon: 'ti ti-clock', title: 'Operations Teams', desc: 'Save hours of manual work every day' },
      { icon: 'ti ti-coin', title: 'Finance Teams', desc: 'Automate invoicing, reconciliation, and reporting' },
      { icon: 'ti ti-users', title: 'HR Teams', desc: 'Streamline onboarding, leave approval, and payroll' },
    ],
    whyUs: [
      'Automation-first mindset — we identify savings you haven\'t thought of',
      'Works with your existing tools (no migration needed)',
      'Average 60% reduction in manual processing time',
      'Fast ROI — most automations pay for themselves in weeks',
      'Ongoing monitoring to keep automations running perfectly',
    ],
  },

  /* ─── DESIGN ─── */
  'ui-ux-design': {
    name: 'UI/UX Design',
    category: 'Design',
    icon: 'ti ti-palette',
    tagline: 'Design that users love. Interfaces that convert.',
    description: 'We create beautiful, intuitive user interfaces and experiences grounded in real user research. From wireframes and user flows to pixel-perfect UI designs and interactive prototypes, we deliver designs that feel natural, look stunning, and drive measurable results for your business.',
    features: [
      'User research & persona development',
      'Information architecture & user flows',
      'Low-fidelity wireframes',
      'High-fidelity UI design (Figma)',
      'Interactive prototypes for testing',
      'Design system & component library',
      'Responsive design for all devices',
      'Developer handoff with specs & assets',
    ],
    benefits: [
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Launch with a polished product that wins users from day one' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Redesign to reduce churn and increase user satisfaction' },
      { icon: 'ti ti-device-mobile', title: 'App Owners', desc: 'Improve onboarding flows and in-app conversion rates' },
    ],
    whyUs: [
      'Research-backed — every design decision has a reason',
      'Figma-based with full file ownership transferred to you',
      'Consistent design system for long-term scalability',
      'Accessibility-first approach (WCAG 2.1 compliant)',
      'Unlimited revisions until you\'re satisfied',
    ],
  },

  'mobile-app-ui-ux': {
    name: 'Mobile App UI/UX',
    category: 'Design',
    icon: 'ti ti-device-mobile',
    tagline: 'Mobile experiences users can\'t put down.',
    description: 'We specialise in designing mobile-first user interfaces that feel native, intuitive, and delightful on both iOS and Android. From onboarding flows and gesture-based interactions to dark mode and micro-animations, every detail is crafted to maximise engagement and retention.',
    features: [
      'iOS & Android platform-specific design',
      'Native gesture pattern implementation',
      'Onboarding flow & first-run experience',
      'Bottom navigation & tab bar design',
      'Push notification & in-app message design',
      'Dark mode & accessibility variants',
      'Micro-animation & transition specs',
      'App Store screenshot & marketing assets',
    ],
    benefits: [
      { icon: 'ti ti-brand-android', title: 'Android Teams', desc: 'Material Design 3 compliant UI with platform best practices' },
      { icon: 'ti ti-brand-apple', title: 'iOS Teams', desc: 'Human Interface Guidelines-aligned design for App Store approval' },
      { icon: 'ti ti-users', title: 'Product Teams', desc: 'Improve session time and user retention with better UX' },
    ],
    whyUs: [
      'Specialists in both iOS HIG and Material Design guidelines',
      'Tested on real devices before handoff',
      'Figma & Zeplin files for seamless developer handoff',
      'Motion design specs included',
      'Post-launch UX review and improvement cycle',
    ],
  },

  'accessibility-services': {
    name: 'Accessibility Services',
    category: 'Design',
    icon: 'ti ti-accessible',
    tagline: 'Digital products for everyone. No exceptions.',
    description: 'We audit, redesign, and rebuild digital products to meet WCAG 2.1 accessibility standards — ensuring your website or app is usable by people with visual, auditory, motor, and cognitive disabilities. Accessible products reach more users, reduce legal risk, and demonstrate genuine care for inclusivity.',
    features: [
      'WCAG 2.1 (A, AA, AAA) compliance audit',
      'Screen reader compatibility testing',
      'Keyboard navigation optimisation',
      'Colour contrast & visual accessibility fixes',
      'Alt text & ARIA label implementation',
      'Focus management & skip navigation',
      'Captioning & transcript support',
      'Accessibility certification report',
    ],
    benefits: [
      { icon: 'ti ti-building-skyscraper', title: 'Enterprises', desc: 'Meet ADA, EN 301 549, and WCAG legal requirements' },
      { icon: 'ti ti-school', title: 'EdTech & Gov', desc: 'Mandatory compliance for public and educational platforms' },
      { icon: 'ti ti-heart', title: 'Inclusive Brands', desc: 'Reach the 1.3 billion people worldwide with disabilities' },
    ],
    whyUs: [
      'Certified accessibility auditors on the team',
      'Remediation + testing — not just a report',
      'Screen reader tested on NVDA, JAWS, and VoiceOver',
      'Full legal-grade compliance documentation',
      'Ongoing monitoring to catch future accessibility regressions',
    ],
  },

  /* ─── WEB & E-COMMERCE ─── */
  'web-application-development': {
    name: 'Web Application Development',
    category: 'Web & E-Commerce',
    icon: 'ti ti-world',
    tagline: 'Full-stack web apps built to perform at scale.',
    description: 'We build powerful, full-stack web applications using modern technologies like React, Next.js, Node.js, and Django. From single-page applications and customer portals to multi-user SaaS platforms and internal tools, we architect for performance, security, and long-term maintainability.',
    features: [
      'Full-stack architecture (React, Next.js, Vue)',
      'RESTful & GraphQL API development',
      'Authentication, roles & permissions',
      'Real-time features (chat, notifications)',
      'Progressive Web App (PWA) capability',
      'CDN, caching & performance optimisation',
      'Security hardening & penetration testing',
      'CI/CD pipeline & cloud deployment',
    ],
    benefits: [
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Replace manual processes with intelligent web tools' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Launch your web product with a production-ready codebase' },
      { icon: 'ti ti-school', title: 'Institutions', desc: 'Build portals, dashboards, and management platforms' },
    ],
    whyUs: [
      'Full-stack team — no outsourcing or freelancers',
      'SEO-friendly, server-side rendering with Next.js',
      'OWASP top 10 security standards enforced',
      'Automated testing with 90%+ code coverage',
      'Lighthouse performance score 90+ guaranteed',
    ],
  },

  'frontend-development': {
    name: 'Frontend Development',
    category: 'Web & E-Commerce',
    icon: 'ti ti-layout',
    tagline: 'Pixel-perfect. Lightning fast. Fully responsive.',
    description: 'We build beautiful, high-performance frontend interfaces using React, Vue, Angular, and plain HTML/CSS. From converting Figma designs to live code to building complex interactive UIs, our frontend developers produce clean, accessible, and blazing-fast interfaces across all devices.',
    features: [
      'Figma/XD to code conversion',
      'React, Vue 3, Angular, or vanilla JS',
      'Responsive design for all screen sizes',
      'CSS architecture (Tailwind, SCSS, CSS Modules)',
      'Component library development',
      'Animation & interaction design',
      'Cross-browser compatibility (Chrome, Firefox, Safari)',
      'Core Web Vitals & performance optimisation',
    ],
    benefits: [
      { icon: 'ti ti-palette', title: 'Designers', desc: 'Turn your designs into pixel-perfect living interfaces' },
      { icon: 'ti ti-building', title: 'Companies', desc: 'Upgrade your UI without touching backend code' },
      { icon: 'ti ti-rocket', title: 'Product Teams', desc: 'Ship frontend features faster with our specialist team' },
    ],
    whyUs: [
      'Semantic, accessible HTML5 as default',
      'Performance-obsessed — every KB matters',
      'Thorough cross-browser and device testing',
      'Component-driven development for easy maintenance',
      'Clean Git history and documentation',
    ],
  },

  'backend-development': {
    name: 'Backend Development',
    category: 'Web & E-Commerce',
    icon: 'ti ti-database',
    tagline: 'The engine that powers your product.',
    description: 'We build secure, scalable, and high-performance backend systems using Node.js, Python (Django/FastAPI), PHP (Laravel), and .NET. From REST and GraphQL APIs to microservices, databases, and cloud infrastructure, we engineer the server-side foundation your product depends on.',
    features: [
      'RESTful API & GraphQL API design',
      'Microservices & serverless architecture',
      'Database design (PostgreSQL, MySQL, MongoDB)',
      'Authentication, JWT, OAuth 2.0',
      'Background jobs & queue processing',
      'Webhooks & real-time event handling',
      'Cloud deployment (AWS, GCP, Azure)',
      'API documentation (Swagger/OpenAPI)',
    ],
    benefits: [
      { icon: 'ti ti-code', title: 'Frontend Teams', desc: 'Get a reliable, documented API to build on quickly' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Migrate from legacy systems to modern scalable backends' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Launch with an architecture that handles 10x growth' },
    ],
    whyUs: [
      'API-first, documentation-first development process',
      'Automated testing with full unit and integration coverage',
      'Rate limiting, input validation, and security baked in',
      'Database indexing and query performance tuning',
      '99.9% uptime SLA with monitoring alerts',
    ],
  },

  'e-commerce-solutions': {
    name: 'E-Commerce Solutions',
    category: 'Web & E-Commerce',
    icon: 'ti ti-shopping-cart',
    tagline: 'Your online store. Fully custom. High converting.',
    description: 'We design and build fully custom e-commerce stores that are fast, secure, and built to convert visitors into customers. Whether you are starting fresh, migrating from Shopify, or need a complex multi-vendor marketplace, we engineer an online store built exactly for your products and customers.',
    features: [
      'Custom product catalog & search',
      'Shopping cart & checkout flow',
      'Multi-currency & multi-language support',
      'Payment gateway integration (Stripe, PayPal, local)',
      'Order management & fulfilment tracking',
      'Customer accounts & wishlists',
      'Discount codes, coupons & loyalty programs',
      'Inventory management & low-stock alerts',
    ],
    benefits: [
      { icon: 'ti ti-shopping-bag', title: 'Retailers', desc: 'Sell online with a store that reflects your brand' },
      { icon: 'ti ti-building', title: 'Wholesalers', desc: 'B2B e-commerce with bulk ordering and trade pricing' },
      { icon: 'ti ti-globe', title: 'Global Sellers', desc: 'Multi-currency, multi-language store for international sales' },
    ],
    whyUs: [
      'Custom-built — no Shopify fees or template limitations',
      'Conversion-optimised checkout with A/B testing',
      'Mobile-first design with 1-tap checkout',
      'SEO-ready product pages from day one',
      'PCI-DSS compliant payment handling',
    ],
  },

  'api-development-integration': {
    name: 'API Development & Integration',
    category: 'Web & E-Commerce',
    icon: 'ti ti-api',
    tagline: 'Connect everything. Automate everything.',
    description: 'We design, build, and integrate APIs that connect your systems, tools, and third-party services seamlessly. Whether you need a custom REST/GraphQL API, a webhook integration, or to connect multiple SaaS platforms, we make your tech stack work as one unified system.',
    features: [
      'Custom REST & GraphQL API development',
      'Third-party API integration (Stripe, Twilio, etc.)',
      'CRM, ERP & accounting system connectors',
      'Webhook design & event-driven architecture',
      'API versioning & backward compatibility',
      'OAuth 2.0, API key & JWT authentication',
      'Rate limiting, throttling & abuse prevention',
      'Swagger / OpenAPI documentation',
    ],
    benefits: [
      { icon: 'ti ti-plug', title: 'Businesses', desc: 'Connect your existing tools without manual data transfer' },
      { icon: 'ti ti-code', title: 'Developers', desc: 'Get a clean, documented API to build products on top of' },
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Integrate legacy systems with modern cloud services' },
    ],
    whyUs: [
      'Postman collection and Swagger docs delivered with every API',
      'Versioned APIs — update without breaking existing clients',
      'Load tested to handle 10,000+ requests per minute',
      'Monitoring, alerting, and SLA reporting included',
      'Secure by design — OWASP API security top 10 compliant',
    ],
  },

  /* ─── CLOUD & IT OPS ─── */
  'cloud-solutions': {
    name: 'Cloud Solutions',
    category: 'Cloud & IT Ops',
    icon: 'ti ti-cloud-upload',
    tagline: 'Move to the cloud. Scale without limits.',
    description: 'We help businesses migrate to, optimise, and manage cloud infrastructure on AWS, Google Cloud, and Microsoft Azure. Whether you are moving from on-premises servers, optimising costs, or architecting a cloud-native system, we design solutions that are scalable, secure, and cost-efficient.',
    features: [
      'Cloud migration planning & execution',
      'AWS, GCP, and Azure architecture design',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Auto-scaling & load balancing setup',
      'Cloud cost analysis & optimisation',
      'Multi-region & high availability deployments',
      'Cloud security hardening & compliance',
      '24/7 monitoring & incident response',
    ],
    benefits: [
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Migrate legacy infrastructure to modern cloud without downtime' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Launch on scalable cloud from day one' },
      { icon: 'ti ti-coin', title: 'Cost-Conscious Teams', desc: 'Reduce cloud bills with proper sizing and reserved instances' },
    ],
    whyUs: [
      'AWS, GCP, and Azure certified cloud engineers',
      'Average 30% cloud cost reduction for migration clients',
      'Zero-downtime migration strategy for live systems',
      'Disaster recovery and multi-region failover included',
      'Monthly cloud health reports and cost reviews',
    ],
  },

  'devops-services': {
    name: 'DevOps Services',
    category: 'Cloud & IT Ops',
    icon: 'ti ti-settings',
    tagline: 'Ship faster. Deploy confidently. Zero downtime.',
    description: 'We implement DevOps culture, tools, and practices that let your team ship software faster with higher quality and confidence. From CI/CD pipelines and containerisation with Docker/Kubernetes to infrastructure automation and monitoring, we eliminate the gap between development and operations.',
    features: [
      'CI/CD pipeline design & implementation',
      'Docker containerisation & orchestration',
      'Kubernetes cluster management',
      'Infrastructure as Code (Terraform, Ansible)',
      'Automated testing integration in pipelines',
      'Environment management (dev, staging, prod)',
      'Log aggregation & centralised monitoring',
      'Incident management & runbooks',
    ],
    benefits: [
      { icon: 'ti ti-code', title: 'Dev Teams', desc: 'Deploy to production in minutes instead of days' },
      { icon: 'ti ti-building', title: 'CTOs', desc: 'Increase release frequency with zero-downtime deployments' },
      { icon: 'ti ti-chart-line', title: 'Scaling Teams', desc: 'Build the operational foundation for rapid growth' },
    ],
    whyUs: [
      'Kubernetes-certified engineers with production experience',
      'Average 70% reduction in deployment time',
      'GitOps workflow with full audit trail',
      'Security scanning embedded in every pipeline',
      'On-call support and runbook library included',
    ],
  },

  'cybersecurity': {
    name: 'Cybersecurity',
    category: 'Cloud & IT Ops',
    icon: 'ti ti-shield-lock',
    tagline: 'Protect what matters before it\'s too late.',
    description: 'We provide comprehensive cybersecurity services including penetration testing, vulnerability assessments, security audits, and implementation of security controls. Our team identifies risks in your infrastructure, applications, and processes before attackers do — and fixes them.',
    features: [
      'Web & API penetration testing',
      'Network & infrastructure vulnerability assessment',
      'OWASP top 10 security audit',
      'Social engineering & phishing simulation',
      'Security code review',
      'Firewall & intrusion detection setup',
      'Data encryption & key management',
      'Security compliance audit (ISO 27001, GDPR)',
    ],
    benefits: [
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Protect customer data and avoid costly breaches' },
      { icon: 'ti ti-shopping-cart', title: 'E-Commerce', desc: 'PCI-DSS compliance and payment security hardening' },
      { icon: 'ti ti-heart', title: 'Healthcare', desc: 'HIPAA-compliant security controls and data protection' },
    ],
    whyUs: [
      'CEH and OSCP certified ethical hackers',
      'Detailed reports with severity ratings and fix guidance',
      'Re-test after fixes included at no extra cost',
      'NDA-protected — full confidentiality guaranteed',
      'Emergency incident response available 24/7',
    ],
  },

  'infrastructure-design': {
    name: 'Infrastructure Design',
    category: 'Cloud & IT Ops',
    icon: 'ti ti-topology-star',
    tagline: 'Architecture built for scale, reliability, and speed.',
    description: 'We design scalable, fault-tolerant infrastructure architectures for modern applications. Whether you are planning a new system or rearchitecting an existing one, we create infrastructure blueprints that ensure high availability, optimal performance, and the ability to scale with your growth.',
    features: [
      'System architecture design & review',
      'High-availability & fault-tolerance planning',
      'Load balancer & CDN configuration',
      'Database architecture (primary/replica/sharding)',
      'Caching layer design (Redis, Memcached)',
      'Network topology & VPC design',
      'Capacity planning & scaling strategy',
      'Architecture diagrams & documentation',
    ],
    benefits: [
      { icon: 'ti ti-building-skyscraper', title: 'Enterprises', desc: 'Design infrastructure that supports millions of users' },
      { icon: 'ti ti-rocket', title: 'Growing Startups', desc: 'Prevent outages before they happen as you scale' },
      { icon: 'ti ti-code', title: 'Dev Teams', desc: 'Get a clear infrastructure blueprint before you build' },
    ],
    whyUs: [
      'Experience designing infrastructure for 1M+ user systems',
      'Delivered as detailed diagrams + written specifications',
      'Includes cost estimates for every architecture option',
      'Live architecture review sessions with your team',
      'Ongoing consultation as your system evolves',
    ],
  },

  'it-consulting': {
    name: 'IT Consulting',
    category: 'Cloud & IT Ops',
    icon: 'ti ti-headset',
    tagline: 'Strategic tech advice that moves your business forward.',
    description: 'Our IT consultants help businesses make smarter technology decisions. Whether you are choosing between software solutions, planning a digital transformation, evaluating vendors, or building a tech roadmap, we provide objective, experience-backed guidance that aligns your IT with your business goals.',
    features: [
      'Technology roadmap development',
      'Software selection & vendor evaluation',
      'Digital transformation strategy',
      'IT cost reduction analysis',
      'System integration planning',
      'Cloud vs on-premise decision support',
      'CTO-as-a-Service (fractional CTO)',
      'Tech due diligence for investors',
    ],
    benefits: [
      { icon: 'ti ti-building', title: 'SMBs', desc: 'Get enterprise-level tech strategy without a full-time CTO' },
      { icon: 'ti ti-building-skyscraper', title: 'Enterprises', desc: 'Align IT investments with business outcomes' },
      { icon: 'ti ti-chart-line', title: 'Investors', desc: 'Tech due diligence reports before acquisition or funding' },
    ],
    whyUs: [
      'Vendor-neutral advice — we have no referral bias',
      'Experience across 40+ industries and business models',
      'Fractional CTO option for growing startups',
      'Written strategy documents and actionable roadmaps',
      'Monthly advisory retainers available',
    ],
  },

  /* ─── MOBILE APPS ─── */
  'android-app-development': {
    name: 'Android App Development',
    category: 'Mobile Apps',
    icon: 'ti ti-brand-android',
    tagline: 'Native Android apps. Fast. Reliable. Play Store-ready.',
    description: 'We build high-performance native Android applications using Kotlin and Jetpack Compose. From consumer apps to enterprise mobility solutions, our Android apps are optimised for speed, battery efficiency, and compatibility across the full range of Android devices and versions.',
    features: [
      'Native Kotlin / Jetpack Compose development',
      'Material Design 3 UI implementation',
      'Offline-first architecture with local data sync',
      'Firebase, Google Maps & Play Services integration',
      'Push notifications (FCM)',
      'Biometric authentication & secure storage',
      'Google Play Store submission & optimisation',
      'ProGuard & security hardening',
    ],
    benefits: [
      { icon: 'ti ti-users', title: 'Consumer Apps', desc: '2.5B+ Android users ready to download your app' },
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Deploy custom apps on corporate Android device fleets' },
      { icon: 'ti ti-shopping-bag', title: 'Retailers', desc: 'Point-of-sale and inventory apps for Android devices' },
    ],
    whyUs: [
      'Kotlin-first development with modern Android architecture',
      'Tested on 20+ physical Android devices',
      'Play Store listing optimisation (ASO) included',
      '4.5+ star rating strategy built into UX',
      'Post-launch Play Store update management',
    ],
  },

  'ios-app-development': {
    name: 'iOS App Development',
    category: 'Mobile Apps',
    icon: 'ti ti-brand-apple',
    tagline: 'Polished iOS apps. App Store approved. Users love them.',
    description: 'We build native iOS applications using Swift and SwiftUI that meet Apple\'s exacting quality standards. From elegant consumer apps to enterprise iPhone solutions, our iOS apps deliver the premium experience Apple users expect — and pass App Store review first time, every time.',
    features: [
      'Native Swift / SwiftUI development',
      'iOS Human Interface Guidelines compliance',
      'iCloud, Face ID & Apple Pay integration',
      'Core Data & CloudKit synchronisation',
      'Push notifications (APNs)',
      'StoreKit & in-app purchase setup',
      'App Store Connect submission & review guidance',
      'TestFlight beta distribution',
    ],
    benefits: [
      { icon: 'ti ti-users', title: 'Consumer Apps', desc: 'Reach iPhone\'s premium user base with high purchasing power' },
      { icon: 'ti ti-building', title: 'Enterprises', desc: 'Secure, managed iOS apps for corporate iPhone/iPad fleets' },
      { icon: 'ti ti-heart', title: 'Healthcare', desc: 'HealthKit-integrated apps for patient monitoring and wellness' },
    ],
    whyUs: [
      'Apple Developer Program membership and submission handled',
      'First-time App Store approval rate of 98%',
      'SwiftUI animations and transitions that delight users',
      'Accessibility (VoiceOver) and Dark Mode as standard',
      'Post-launch App Store review monitoring and management',
    ],
  },

  'cross-platform-flutter-rn': {
    name: 'Cross-Platform Apps (Flutter / RN)',
    category: 'Mobile Apps',
    icon: 'ti ti-devices',
    tagline: 'One codebase. iOS and Android. No compromise.',
    description: 'We build cross-platform mobile apps using Flutter and React Native that look and perform like native apps on both iOS and Android. Get the best of both worlds — a single shared codebase that dramatically reduces development cost and time, without sacrificing user experience or performance.',
    features: [
      'Flutter (Dart) or React Native development',
      'Shared codebase for iOS & Android',
      'Native-like performance & animations',
      'Platform-specific UI components',
      'State management (Riverpod, Redux, MobX)',
      'Push notifications, camera & sensor access',
      'App Store & Play Store submission',
      'Automated CI/CD for both platforms',
    ],
    benefits: [
      { icon: 'ti ti-coin', title: 'Cost-Conscious Teams', desc: 'Save 40–60% vs. building separate native apps' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Ship to both platforms simultaneously and faster' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Maintain one codebase for consistent cross-platform features' },
    ],
    whyUs: [
      'Flutter specialists — our preferred framework for best results',
      'Pixel-perfect UI matching your design on both platforms',
      'Hot reload development for fast iteration',
      'Published to both stores from a single pipeline',
      '30-day post-launch monitoring and bug-fix guarantee',
    ],
  },

  'enterprise-mobile-apps': {
    name: 'Enterprise Mobile Apps',
    category: 'Mobile Apps',
    icon: 'ti ti-building',
    tagline: 'Enterprise-grade mobile. Secure. Scalable. Integrated.',
    description: 'We develop secure, scalable mobile applications built for enterprise environments. From field service apps and employee tools to customer portals, our enterprise mobile solutions integrate deeply with your backend systems, support MDM deployment, and meet your organisation\'s security requirements.',
    features: [
      'MDM (Mobile Device Management) compatibility',
      'SSO & Active Directory / LDAP integration',
      'Offline mode with background data sync',
      'End-to-end data encryption',
      'Role-based access control',
      'VPN and private API connectivity',
      'Custom enterprise app store distribution',
      'Remote wipe & device policy enforcement',
    ],
    benefits: [
      { icon: 'ti ti-building-skyscraper', title: 'Large Enterprises', desc: 'Deploy secure apps to thousands of employee devices' },
      { icon: 'ti ti-tools', title: 'Field Service Teams', desc: 'Offline-capable apps for workers without reliable internet' },
      { icon: 'ti ti-shield', title: 'Regulated Industries', desc: 'Compliance-ready mobile apps for banking, health, and legal' },
    ],
    whyUs: [
      'Experience with Microsoft Intune, MobileIron & Jamf MDM',
      'Security-first development with enterprise pen testing',
      'Zero-trust architecture for all data in transit',
      'Scalable to 10,000+ concurrent users',
      'Dedicated enterprise support team and SLA contract',
    ],
  },

  'on-demand-service-apps': {
    name: 'On-Demand Service Apps',
    category: 'Mobile Apps',
    icon: 'ti ti-truck-delivery',
    tagline: 'Uber-style apps. Built for your business.',
    description: 'We build complete on-demand service platforms — like Uber, Lyft, or DoorDash — for any service vertical. Our solutions include separate apps for customers, service providers, and drivers, plus a powerful admin dashboard to manage everything in real time.',
    features: [
      'Customer, driver & provider mobile apps',
      'Real-time GPS tracking (Google Maps / Mapbox)',
      'In-app chat and calling',
      'Automated booking & scheduling',
      'In-app payments (Stripe, PayPal, local gateways)',
      'Dynamic pricing & surge control',
      'Ratings & review system',
      'Admin dashboard with live analytics',
    ],
    benefits: [
      { icon: 'ti ti-truck', title: 'Delivery Services', desc: 'Food, grocery, package, and courier delivery platforms' },
      { icon: 'ti ti-car', title: 'Ride-Hailing', desc: 'Full ride-sharing platform for taxi, shuttle, or rentals' },
      { icon: 'ti ti-tools', title: 'Home Services', desc: 'On-demand plumbing, cleaning, repair booking apps' },
    ],
    whyUs: [
      'Complete 3-sided marketplace (customer + provider + admin)',
      'Real-time location tracking with sub-second updates',
      'Surge pricing and availability logic built in',
      'Scalable to millions of bookings per month',
      'Launch-ready in 10–14 weeks',
    ],
  },

  'fintech-banking-apps': {
    name: 'FinTech & Banking Apps',
    category: 'Mobile Apps',
    icon: 'ti ti-coin',
    tagline: 'Secure financial apps. Compliance built in.',
    description: 'We develop highly secure, compliance-ready mobile applications for banks, fintech startups, payment companies, and investment platforms. From digital wallets and money transfer apps to trading platforms and micro-lending solutions, we build financial apps that users trust.',
    features: [
      'PCI-DSS compliant payment handling',
      'Biometric auth (Face ID, fingerprint)',
      'Digital wallet & P2P transfers',
      'Bank account linking (Plaid, Open Banking)',
      'Transaction history & spending analytics',
      'Real-time fraud detection alerts',
      'Currency exchange & crypto integration',
      'KYC / AML verification flow',
    ],
    benefits: [
      { icon: 'ti ti-building-bank', title: 'Banks & NBFIs', desc: 'Mobile banking apps with core banking system integration' },
      { icon: 'ti ti-rocket', title: 'FinTech Startups', desc: 'Wallet, lending, or payments app with compliance baked in' },
      { icon: 'ti ti-chart-line', title: 'Investment Platforms', desc: 'Trading, portfolio, and wealth management applications' },
    ],
    whyUs: [
      'Dedicated FinTech compliance team on board',
      'PCI-DSS Level 1 development practices',
      'End-to-end encryption for all financial data',
      'Integration with 100+ banking and payment APIs',
      'Passed central bank and financial regulator reviews',
    ],
  },

  'healthcare-mobile-apps': {
    name: 'Healthcare Mobile Apps',
    category: 'Mobile Apps',
    icon: 'ti ti-heart-rate-monitor',
    tagline: 'Healthcare apps that patients and providers trust.',
    description: 'We build HIPAA-compliant mobile applications for hospitals, clinics, telehealth providers, and healthtech startups. From patient portals and telemedicine apps to EHR integrations and remote monitoring solutions, we deliver healthcare technology that improves patient outcomes and clinical efficiency.',
    features: [
      'HIPAA-compliant data handling & encryption',
      'Telemedicine video & chat consultation',
      'Appointment booking & reminders',
      'Electronic health record (EHR) integration',
      'Prescription management & e-prescribing',
      'Wearable & IoT device integration',
      'Patient health tracking & dashboards',
      'Insurance claim & billing module',
    ],
    benefits: [
      { icon: 'ti ti-stethoscope', title: 'Hospitals & Clinics', desc: 'Patient portals and clinical workflow mobile tools' },
      { icon: 'ti ti-rocket', title: 'HealthTech Startups', desc: 'Telehealth and wellness platforms with full compliance' },
      { icon: 'ti ti-heart', title: 'Patients', desc: 'Better health management with intuitive mobile tools' },
    ],
    whyUs: [
      'HIPAA-certified development process',
      'HL7 FHIR and EHR integration specialists',
      'FDA-aware development for regulated health apps',
      'Built-in accessibility for elderly and disabled users',
      'Medical-grade data security and audit logging',
    ],
  },

  /* ─── SUPPORT & QUALITY ─── */
  'maintenance-support': {
    name: 'Maintenance & Support',
    category: 'Support & Quality',
    icon: 'ti ti-tool',
    tagline: 'Your product, always healthy. 24/7.',
    description: 'We provide comprehensive maintenance and support services to keep your web or mobile application running smoothly after launch. From proactive monitoring and bug fixes to performance tuning and security patches, we handle everything so you can focus on your business.',
    features: [
      '24/7 uptime monitoring & alert response',
      'Bug fixing & issue resolution',
      'Security patches & dependency updates',
      'Performance monitoring & optimisation',
      'Database maintenance & backups',
      'Monthly health reports & analytics',
      'Feature enhancements & minor updates',
      'Dedicated support ticket system',
    ],
    benefits: [
      { icon: 'ti ti-building', title: 'Business Owners', desc: 'Sleep easy knowing your product is monitored 24/7' },
      { icon: 'ti ti-code', title: 'Dev Teams', desc: 'Offload maintenance so your team can focus on features' },
      { icon: 'ti ti-shopping-cart', title: 'E-Commerce', desc: 'Zero downtime means zero lost sales' },
    ],
    whyUs: [
      'Average response time under 2 hours for critical issues',
      'SLA-backed contracts with uptime guarantees',
      'Monthly detailed health and performance reports',
      'Proactive — we find and fix issues before you notice them',
      'Transparent ticket system with real-time status updates',
    ],
  },

  'qa-testing': {
    name: 'QA & Testing',
    category: 'Support & Quality',
    icon: 'ti ti-checkup-list',
    tagline: 'Ship with confidence. Zero surprises.',
    description: 'We provide comprehensive quality assurance and testing services to ensure your software is bug-free, performant, and ready for real users. Our QA engineers combine manual testing with automated test suites to catch issues before they reach production — protecting your reputation and user experience.',
    features: [
      'Manual functional & regression testing',
      'Automated test suite development (Selenium, Playwright)',
      'API testing (Postman, Rest-Assured)',
      'Performance & load testing (JMeter, k6)',
      'Mobile app testing (iOS & Android)',
      'Cross-browser & cross-device testing',
      'Security vulnerability testing',
      'Bug reporting with detailed reproduction steps',
    ],
    benefits: [
      { icon: 'ti ti-code', title: 'Dev Teams', desc: 'Catch regressions early with automated test coverage' },
      { icon: 'ti ti-building', title: 'Product Managers', desc: 'Ship releases confidently with sign-off from QA specialists' },
      { icon: 'ti ti-rocket', title: 'Startups', desc: 'Build quality in from the start — not bolted on later' },
    ],
    whyUs: [
      'ISTQB-certified QA engineers',
      'Test automation that runs on every code commit (CI/CD)',
      'Load testing to simulate 100,000+ concurrent users',
      'Detailed bug reports with video recordings',
      'Zero-defect go-live policy',
    ],
  },

  'app-store-deployment': {
    name: 'App Store Deployment',
    category: 'Support & Quality',
    icon: 'ti ti-brand-google-play',
    tagline: 'Live on App Store and Play Store. Done right.',
    description: 'We handle the complete process of submitting, optimising, and managing your app on the Apple App Store and Google Play Store. From preparing store assets and metadata to navigating review guidelines and optimising for discoverability (ASO), we ensure your app launches successfully.',
    features: [
      'App Store Connect & Google Play Console setup',
      'App metadata, keywords & description optimisation',
      'Screenshot design & preview video creation',
      'App signing, provisioning & bundle setup',
      'Review guideline compliance check',
      'First-time submission & resubmission management',
      'ASO (App Store Optimisation)',
      'Post-launch rating & review management',
    ],
    benefits: [
      { icon: 'ti ti-rocket', title: 'First-Time Publishers', desc: 'Navigate the complex App Store review process stress-free' },
      { icon: 'ti ti-building', title: 'Businesses', desc: 'Maximise downloads with professional ASO and store presence' },
      { icon: 'ti ti-chart-line', title: 'Growth Teams', desc: 'Improve app ranking and organic discovery' },
    ],
    whyUs: [
      '98% first-submission approval rate on both stores',
      'ASO keyword research with search volume data',
      'Professional screenshot designs that increase install rate',
      'Full-service: we handle the entire submission, start to finish',
      'Post-launch review response management included',
    ],
  },

}; /* END SERVICES */

/* ═══════════════════════════════════════════════════════════
   PAGE POPULATION
═══════════════════════════════════════════════════════════ */
function toSlugLocal(name) {
  return name.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').trim().replace(/\s+/g, '-');
}

function loadService() {
  const params = new URLSearchParams(window.location.search);
  const slug   = params.get('service') || '';
  const svc    = SERVICES[slug];

  if (!svc) {
    document.getElementById('heroTitle').textContent = 'Service Not Found';
    document.getElementById('heroDesc').textContent  = 'The service you are looking for does not exist. Please go back and select a service.';
    document.getElementById('breadcrumbService').textContent = 'Not Found';
    document.title = 'Service Not Found – NovaStackhub';
    return;
  }

  /* ── Page meta ── */
  document.title = `${svc.name} – NovaStackhub`;

  /* ── Hero ── */
  document.getElementById('heroIcon').className        = svc.icon;
  document.getElementById('heroCategory').textContent  = svc.category;
  document.getElementById('heroTitle').textContent     = svc.name;
  document.getElementById('heroDesc').textContent      = svc.tagline;
  document.getElementById('breadcrumbService').textContent = svc.name;

  /* ── Full description ── */
  document.getElementById('fullDesc').textContent = svc.description;

  /* ── Features ── */
  const fl = document.getElementById('featuresList');
  fl.innerHTML = svc.features.map(f => `
    <li>
      <span class="sd-feat-dot"><i class="ti ti-check"></i></span>
      ${f}
    </li>`).join('');

  /* ── Benefits ── */
  const bg = document.getElementById('benefitsGrid');
  bg.innerHTML = svc.benefits.map(b => `
    <div class="sd-benefit-item">
      <div class="sd-benefit-icon"><i class="${b.icon}"></i></div>
      <div class="sd-benefit-title">${b.title}</div>
      <div class="sd-benefit-desc">${b.desc}</div>
    </div>`).join('');

  /* ── Why us ── */
  const wl = document.getElementById('whyList');
  wl.innerHTML = svc.whyUs.map(w => `
    <li>
      <span class="sd-why-icon"><i class="ti ti-check"></i></span>
      ${w}
    </li>`).join('');

  /* ── Form: pre-fill service name ── */
  document.getElementById('f-service').value = svc.name;
}

/* ═══════════════════════════════════════════════════════════
   FORM VALIDATION & SUBMISSION
═══════════════════════════════════════════════════════════ */
function validate() {
  let ok = true;

  const fields = [
    { id: 'f-name',    errId: 'err-name',    label: 'Full name is required' },
    { id: 'f-email',   errId: 'err-email',   label: 'Email address is required', type: 'email' },
    { id: 'f-phone',   errId: 'err-phone',   label: 'Phone / WhatsApp number is required', type: 'phone' },
    { id: 'f-message', errId: 'err-message', label: 'Please describe your project' },
  ];

  fields.forEach(({ id, errId, label, type }) => {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    const val = el.value.trim();

    if (!val) {
      err.textContent = label;
      el.classList.add('is-error');
      ok = false;
    } else if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err.textContent = 'Please enter a valid email address';
      el.classList.add('is-error');
      ok = false;
    } else if (type === 'phone' && !/^[\d\s\+\-\(\)]{7,15}$/.test(val)) {
      err.textContent = 'Please enter a valid phone number';
      el.classList.add('is-error');
      ok = false;
    } else {
      err.textContent = '';
      el.classList.remove('is-error');
    }

    el.addEventListener('input', () => {
      err.textContent = '';
      el.classList.remove('is-error');
    }, { once: true });
  });

  return ok;
}

function resetForm() {
  document.getElementById('successBox').style.display = 'none';
  document.getElementById('enquiryForm').style.display = '';
  document.getElementById('enquiryForm').reset();

  const params = new URLSearchParams(window.location.search);
  const svc    = SERVICES[params.get('service') || ''];
  if (svc) document.getElementById('f-service').value = svc.name;
}

document.addEventListener('DOMContentLoaded', function () {
  loadService();

  const form      = document.getElementById('enquiryForm');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    /* ── Loading animation (brief) ── */
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-default-text').style.display = 'none';
    submitBtn.querySelector('.btn-loading-text').style.display = '';

    /* ── Collect form data ── */
    const entry = {
      id:        Date.now(),
      date:      new Date().toLocaleString(),
      service:   document.getElementById('f-service').value,
      name:      document.getElementById('f-name').value.trim(),
      email:     document.getElementById('f-email').value.trim(),
      phone:     document.getElementById('f-phone').value.trim(),
      company:   form.querySelector('[name="company"]').value.trim(),
      budget:    form.querySelector('[name="budget"]').value,
      message:   document.getElementById('f-message').value.trim(),
    };

    /* ── Save to localStorage ── */
    const existing = JSON.parse(localStorage.getItem('novastack_enquiries') || '[]');
    existing.push(entry);
    localStorage.setItem('novastack_enquiries', JSON.stringify(existing));

    /* ── Show success after brief delay ── */
    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-default-text').style.display = '';
      submitBtn.querySelector('.btn-loading-text').style.display = 'none';

      form.style.display = 'none';
      document.getElementById('successBox').style.display = '';
      window.scrollTo({
        top: document.getElementById('enquiry-form').offsetTop - 100,
        behavior: 'smooth',
      });
    }, 900);
  });

  /* Sticky navbar scroll effect */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
});
