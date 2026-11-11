/**
 * Every fact the page states, in one place. Sourced from the owner's resume
 * (Nov 2026) and the previous site copy.
 *
 * Owner rule: the current employer is a property company and is never named.
 * It shows as "Confidential" everywhere, including the chat prompt.
 */

export const WHATSAPP = 'https://wa.me/60177786836'
export const EMAIL = 'putrafyp@gmail.com'

export const whatsappLink = (message) => `${WHATSAPP}?text=${encodeURIComponent(message)}`

export const profile = {
  name: 'Safwan Hakim',
  role: 'Software Tech Lead',
  roleLong: 'Software Tech Lead and Senior Full-Stack and AI Engineer',
  level: 30,
  years: 9,
  location: 'Selangor, Malaysia',
  languages: ['Mandarin', 'English', 'Bahasa Melayu'],
  education: [
    { what: 'Bachelor in Computer Engineering', where: 'Management and Science University', when: '2019 - 2024' },
    { what: 'Diploma in Computer Engineering', where: 'University of Kuala Lumpur MIIT', when: '2014 - 2017' },
  ],
}

/** Self-rated by the owner, shown as the character sheet. */
export const stats = [
  { label: 'Backend', value: 95 },
  { label: 'Frontend', value: 92 },
  { label: 'Architecture', value: 90 },
  { label: 'Code review', value: 93 },
  { label: 'Team leading', value: 88 },
  { label: 'Shipping on time', value: 97 },
]

export const principles = [
  { name: 'Keep it simple', copy: 'Simple is better than complex.' },
  { name: 'Keep it nice', copy: 'Beautiful design and smooth user experience.' },
  { name: 'Keep it useful', copy: 'Every feature should help the user, not add noise.' },
]

/** Resume "Core skills", plus tools the shipped projects below visibly use. */
export const skillRows = [
  {
    label: 'Languages and frameworks',
    items: ['PHP', 'JavaScript', 'TypeScript', 'Laravel', 'Yii2', 'Vue.js', 'Nuxt', 'React', 'Next.js', 'Expo', 'Node.js', 'WordPress', 'WebSocket'],
  },
  {
    label: 'Data, DevOps and hosting',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'NoSQL', 'Redis', 'Git', 'Docker', 'AWS', 'Nginx', 'Cloudflare', 'Hostinger', 'Linux'],
  },
  {
    label: 'AI and automation',
    items: ['Claude Code', 'Codex', 'AI chatbots', 'Node-RED', 'Raspberry Pi', 'MQTT'],
  },
]

export const experience = [
  {
    period: 'Sep 2026 - Present',
    title: 'Software Tech Lead',
    company: 'Confidential',
    note: 'Property company',
    summary:
      'I lead the engineering side of a property company: the team, the codebases and the way AI is used to build them.',
    duties: [
      'Lead and mentor senior engineers, run code reviews and manage engineering work in Linear.',
      'Maintain and upgrade the company systems: faster apps, tighter security, legacy code brought up to date.',
      'Plan secure, scalable infrastructure with the CTO and turn business needs from the CEO, COO and analysts into engineering work.',
      'Build AI-powered internal tools, and set AI coding rules and reusable skills across the codebases with Claude Code.',
      'Set up CI/CD with automated tests, dependency scanning and deployment automation on every repository.',
    ],
  },
  {
    period: 'Mar 2026 - Sep 2026',
    title: 'Senior AI and ML Engineer',
    company: 'Afed Digital',
    note: 'Joined as Senior Full Stack Developer',
    summary: 'ERP Finance and HRMS Payroll modules, then AI chatbots inside the same systems.',
    duties: [
      'Built Finance and Payroll features end to end with PHP and Laravel, Vue.js and SQL: services, screens, reports and approval flows.',
      'Integrated AI chatbots into internal systems for user support, guided workflows and knowledge access.',
      'Brought in CI/CD practices to cut manual release work.',
      'Trained colleagues on practical AI use and proposed a company-wide platform to monitor, validate and train AI agents.',
    ],
  },
  {
    period: 'May 2020 - Mar 2026',
    title: 'Associate Software Manager',
    company: 'Fiuu',
    note: 'Formerly Razer Merchant Services',
    summary: 'Promoted from Software Engineer to Senior Software Engineer, then Associate Software Manager.',
    duties: [
      'Led work on onboarding systems, API platforms, bank integrations, payment features, reporting and WhatsApp service integration.',
      'Delivered 900 bug fixes and enhancements across the platform.',
      'Supported operations in the Philippines, Singapore, Indonesia and Malaysia, and was the subject expert for the Philippines.',
      'Managed timelines, mentored junior developers and helped resolve production issues inside SLA.',
    ],
  },
  {
    period: 'Jan 2020 - Oct 2021',
    title: 'Web Software Developer, part-time',
    company: 'MY Innovative Wellness',
    summary: 'E-commerce and the internal systems behind it.',
    duties: [
      'Built a WooCommerce store for entrusol.com that supported online sales of up to RM10,000 a month.',
      'Built internal systems to streamline sales operations.',
      'Set up hosting and analytics: Hostinger, AWS EC2, Cloudflare, Facebook Pixel and Google Analytics.',
    ],
  },
  {
    period: 'Jan 2018 - Dec 2019',
    title: 'Freelance Programmer',
    company: 'Startup clients',
    summary: 'Websites, apps and e-commerce for early-stage businesses.',
    duties: [
      'Built for clients including EzDisposal, TTDI Meatpoint Restaurant and RNR Enterprise.',
      'Consulting, maintenance, bug fixes and new features with PHP, WordPress and Laravel.',
    ],
  },
  {
    period: 'Jan 2018 - Dec 2019',
    title: 'Raspberry Pi and Node-RED Trainer, part-time',
    company: 'Tertiary Courses',
    summary: 'Weekend IoT training for industry professionals, lecturers and hobbyists.',
    duties: [
      'Taught Raspberry Pi, Node-RED and IoT concepts with a concept-first approach.',
      'Ran sessions for UniKL MIIT, MSU and UUM Sintok on practical Industry 4.0.',
    ],
  },
  {
    period: 'Aug 2016 - Aug 2018',
    title: 'Junior Programmer',
    company: 'Unijaya Resource',
    summary: 'Where it started: a large project delivered with a five-person team.',
    duties: [
      'Delivered two modules of a project valued at RM3 million.',
      'Built and released a mobile app on Google Play and the Apple App Store.',
      'Improved the company website, joined client meetings and ran user training.',
    ],
  },
]

/**
 * Images are real screenshots of each live site (tools/capture_project_shots.mjs).
 * Owner rule: never generated artwork here.
 */
export const projects = [
  {
    name: 'Binaqi',
    kind: 'My startup',
    category: 'Islamic habit app',
    description:
      'The Islamic habit app that keeps you consistent in solat. Log daily prayers, finish small quests with XP, and learn from short lessons with cited sources. Runs on the web and as an Android app.',
    url: 'binaqi.com',
    live: 'https://binaqi.com',
    tech: ['Nuxt', 'Laravel', 'PostgreSQL', 'Redis', 'Expo', 'Docker'],
    image: '/images/projects/binaqi.webp',
    alt: 'Screenshot of the Binaqi home page: the headline and a phone showing the prayer tracker',
  },
  {
    name: 'Festivent',
    kind: 'My startup',
    category: 'Event marketplace',
    description:
      'An event marketplace for Malaysia: book trusted vendors for weddings, birthdays and corporate dinners, from caterers to photographers.',
    url: 'festivent.com.my',
    live: 'https://festivent.com.my/home',
    tech: ['Laravel', 'MySQL', 'Bootstrap', 'Hostinger'],
    image: '/images/projects/festivent.webp',
    alt: 'Screenshot of the Festivent home page with its vendor search and booking headline',
  },
  {
    name: 'Bossku Superpowers',
    kind: 'Open source',
    category: 'AI coding agent toolkit',
    description:
      'Skills tell your AI coding agent what to do; Bossku checks that it did. It makes the agent test its code, stops risky commands and remembers your rules. For Claude Code, Codex, Cursor and OpenCode. Formerly Bossku AI.',
    url: 'github.com/wankimmy/Bossku-Superpowers',
    live: 'https://github.com/wankimmy/Bossku-Superpowers',
    tech: ['Python', 'CLI', 'Skills', 'Claude Code', 'Codex', 'Cursor'],
    image: '/images/projects/bossku-superpowers.webp',
    alt: 'Screenshot of the Bossku Superpowers repository on GitHub',
  },
  {
    name: 'Putra AI',
    kind: 'My startup',
    category: 'AI software',
    description: 'AI-powered software built for real work: products that solve practical business problems across industries.',
    url: 'putra.ai',
    live: 'https://putra.ai',
    tech: ['Laravel', 'Docker', 'Hostinger'],
    image: '/images/projects/putra-ai.webp',
    alt: 'Screenshot of the Putra AI home page with the headline AI Software Built for Real Work',
  },
  {
    name: 'My Fresh Storage',
    kind: 'Client',
    category: 'Meat e-commerce',
    description:
      'Premium frozen meat delivery for West Malaysia, rebuilt from WooCommerce into a custom Laravel and Inertia store: redesign, admin CMS, catalog, and checkout.',
    url: 'myfreshstorage.com.my',
    live: 'https://www.myfreshstorage.com.my/',
    tech: ['Laravel', 'Vue', 'Inertia', 'MariaDB', 'Docker', 'Fiuu'],
    image: '/images/projects/my-fresh-storage.webp',
    alt: 'Screenshot of the My Fresh Storage home page with cuts of beef and the delivery headline',
  },
  {
    name: 'MakanBuddy',
    kind: 'Client',
    category: 'Malaysian food community',
    description:
      'Weekly ranking of Malaysian food voted by diners, not critics. One vote per category per week, nominations from the community, no paid crowns.',
    url: 'makanbuddy.com',
    live: 'https://makanbuddy.com/',
    tech: ['Next.js', 'React', 'Laravel', 'Filament', 'Tailwind'],
    image: '/images/projects/makanbuddy.webp',
    alt: 'Screenshot of the MakanBuddy home page: a plate of nasi lemak under the ranking headline',
  },
]

export const services = [
  {
    tag: 'Web',
    title: 'Web app development',
    description: 'Full-stack web applications with Laravel, Vue, and Nuxt. From admin dashboards to customer portals.',
    points: ['Custom dashboards and portals', 'REST API design', 'Responsive on every device'],
  },
  {
    tag: 'Pay',
    title: 'E-commerce and payments',
    description: 'Online stores and booking systems with payment gateways done right. I spent years in the payment industry.',
    points: ['FPX, cards and e-wallets', 'WooCommerce or custom builds', 'Order and inventory flows'],
  },
  {
    tag: 'AI',
    title: 'AI chatbots and automation',
    description: 'Practical AI that helps your business: chatbots, smart workflows, and integrations that save hours.',
    points: ['Custom AI chatbots', 'Workflow automation', 'LLM API integrations'],
  },
  {
    tag: 'IoT',
    title: 'IoT solutions and training',
    description: 'Connected devices and hands-on workshops using Node-RED, Raspberry Pi, MQTT, and sensors.',
    points: ['Prototypes and dashboards', 'Sensor data pipelines', 'Team training sessions'],
  },
  {
    tag: 'Ops',
    title: 'Hosting and DevOps',
    description: 'Deployment that stays up: Docker, AWS, Nginx, and Cloudflare with monitoring and backups in place.',
    points: ['Docker and cloud setup', 'CI/CD pipelines', 'SSL, backups and monitoring'],
  },
  {
    tag: 'Advice',
    title: 'Consulting and code review',
    description: 'A second pair of senior eyes on your project: architecture advice, security checks, and code reviews.',
    points: ['Architecture planning', 'Security review', 'Developer mentoring'],
  },
]

export const plans = [
  {
    name: 'Starter Website',
    tagline: 'For small businesses that need to look good online.',
    price: 1500,
    cta: 'Start a website',
    features: [
      'Up to 5 custom-designed pages',
      'Mobile-friendly and fast loading',
      'Basic SEO and analytics setup',
      'WhatsApp and contact integration',
      'Delivered in 1 to 2 weeks',
      '1 month of free support',
    ],
  },
  {
    name: 'Business Web App',
    tagline: 'Online stores, bookings, and custom dashboards.',
    price: 4500,
    popular: true,
    cta: 'Build my app',
    features: [
      'Custom Laravel and Vue build',
      'Payment gateway (FPX, cards, e-wallets)',
      'Admin dashboard and reporting',
      'Hosting and deployment included',
      'Delivered in 4 to 6 weeks',
      '2 months of free support',
    ],
  },
  {
    name: 'Custom System / MVP',
    tagline: 'Turn your startup idea into a working product.',
    price: 8000,
    cta: 'Discuss my idea',
    features: [
      'Full SaaS MVP with user accounts',
      'AI features and API integrations',
      'Docker-based cloud deployment',
      'Security review included',
      'Roadmap and architecture advice',
      '3 months of free support',
    ],
  },
]

export const carePlan = {
  name: 'Care Plan',
  copy: 'Already have a site? I keep it healthy: hosting, updates, backups, and small tweaks handled for you.',
  price: 200,
}

export const certificates = [
  {
    name: 'Web Application Hacking and Defense',
    issuer: 'Condition Zebra',
    year: '2024',
    file: '/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf',
  },
  {
    name: 'OWASP Security Foundation',
    issuer: 'OWASP Foundation',
    year: '2022',
    file: '/assets/Safwan_Hakim_owasp.pdf',
  },
  {
    name: 'IoT Security Certification',
    issuer: 'Tertiary Courses',
    year: '2021',
    file: '/assets/E-cert_IoT_Security_Safwan_Hakim.pdf',
  },
  {
    name: 'Industry 4.0 E-Certification',
    issuer: 'Tertiary Courses',
    year: '2021',
    file: '/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf',
  },
]

/** Chapters in page order: id, the pause-menu name, and the plain name beside it. */
/**
 * The creatures that share the sky with the dragon. Each gets a band of its
 * own before the chapter it belongs to (EncounterPlate.vue). `side` is where
 * the caption sits on wide screens.
 */
export const bestiary = {
  naga: {
    no: '01',
    name: 'Naga',
    role: 'Keeper of the forge',
    line: 'It guards the weapons in the next room. Nine years of them.',
    side: 'left',
  },
  whale: {
    no: '02',
    name: 'Sky whale',
    role: 'Carrier of the log',
    line: 'It carries the whole quest log on its back, and it is in no hurry.',
    side: 'right',
  },
  phoenix: {
    no: '03',
    name: 'Phoenix',
    role: 'Patron of the workshop',
    line: 'Things come here to be built, or rebuilt. It watches over both.',
    side: 'left',
  },
}

export const chapters = [
  { id: 'home', menu: 'Title screen', plain: 'Intro' },
  { id: 'about', menu: 'Status', plain: 'About' },
  { id: 'tech', menu: 'Abilities', plain: 'Skills' },
  { id: 'experience', menu: 'Quest log', plain: 'Experience' },
  { id: 'projects', menu: 'Completed quests', plain: 'Projects' },
  { id: 'services', menu: 'Party for hire', plain: 'Services' },
  { id: 'pricing', menu: 'Shop', plain: 'Pricing' },
  { id: 'certificates', menu: 'Trophies', plain: 'Certifications' },
  { id: 'star-map', menu: 'Star map', plain: 'Skill graph' },
  { id: 'contact', menu: 'New quest', plain: 'Contact' },
]
