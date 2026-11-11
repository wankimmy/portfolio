/** Knowledge Star Map — denser brain of skills, tools, and startups. */

export const domains = [
  { key: 'frontend', label: 'Frontend', color: '#4a90e2', rank: 0, region: 'Occipital lobe', blurb: 'Vision. Everything people see and touch.' },
  { key: 'backend', label: 'Backend', color: '#d4af37', rank: 1, region: 'Parietal lobe', blurb: 'Ties every signal together: systems, payments and data.' },
  { key: 'ai', label: 'AI & Agents', color: '#b48ee6', rank: 2, region: 'Frontal lobe', blurb: 'Plans, decides and thinks ahead. The agents live here.' },
  { key: 'iot', label: 'IoT', color: '#4ec9b0', rank: 3, region: 'Cerebellum', blurb: 'Movement and control: code that moves real things.' },
  { key: 'devops', label: 'DevOps', color: '#e2e8f0', rank: 4, region: 'Temporal lobe', blurb: 'Memory: the databases and servers that keep everything stored and running.' },
  { key: 'ventures', label: 'Startups', color: '#e07a3a', rank: 5, region: 'Brain stem', blurb: 'Drive: the instinct to keep building and shipping.' },
]

/**
 * nodes: { id, name, domain, level (0-100), size (node weight 1..3),
 *          years, usedIn: [project names] }
 */
export const nodes = [
  /* Frontend */
  { id: 'vue', name: 'Vue.js', domain: 'frontend', level: 95, size: 3, years: 8, usedIn: ['Festivent', 'Bossku Superpowers', 'Binaqi', 'This portfolio'] },
  { id: 'nuxt', name: 'Nuxt', domain: 'frontend', level: 88, size: 2, years: 5, usedIn: ['Binaqi'] },
  { id: 'react', name: 'React', domain: 'frontend', level: 82, size: 2, years: 6, usedIn: ['Putra AI', 'MakanBuddy', 'Client work'] },
  { id: 'typescript', name: 'TypeScript', domain: 'frontend', level: 86, size: 2, years: 5, usedIn: ['Binaqi', 'Bossku Superpowers'] },
  { id: 'javascript', name: 'JavaScript', domain: 'frontend', level: 94, size: 2, years: 10, usedIn: ['Everywhere'] },
  { id: 'tailwind', name: 'Tailwind', domain: 'frontend', level: 90, size: 2, years: 5, usedIn: ['Binaqi', 'MakanBuddy', 'This portfolio'] },
  { id: 'bootstrap', name: 'Bootstrap', domain: 'frontend', level: 88, size: 1, years: 8, usedIn: ['Festivent'] },
  { id: 'threejs', name: 'Three.js', domain: 'frontend', level: 74, size: 2, years: 3, usedIn: ['This portfolio'] },
  { id: 'gsap', name: 'GSAP', domain: 'frontend', level: 78, size: 1, years: 3, usedIn: ['This portfolio'] },
  { id: 'figma', name: 'Figma', domain: 'frontend', level: 80, size: 1, years: 5, usedIn: ['Product design'] },
  { id: 'wordpress', name: 'WordPress', domain: 'frontend', level: 76, size: 1, years: 6, usedIn: ['Client sites'] },

  /* Backend */
  { id: 'laravel', name: 'Laravel', domain: 'backend', level: 96, size: 3, years: 9, usedIn: ['Festivent', 'Putra AI', 'MakanBuddy', 'Client systems'] },
  { id: 'php', name: 'PHP', domain: 'backend', level: 92, size: 3, years: 10, usedIn: ['Bossku Superpowers', 'Festivent', 'Most client work'] },
  { id: 'nodejs', name: 'Node.js', domain: 'backend', level: 85, size: 2, years: 6, usedIn: ['Bossku Superpowers', 'IoT bridges'] },
  { id: 'python', name: 'Python', domain: 'backend', level: 80, size: 2, years: 5, usedIn: ['Bossku Superpowers', 'AI tooling'] },
  { id: 'yii2', name: 'Yii2', domain: 'backend', level: 78, size: 1, years: 4, usedIn: ['Govt projects'] },
  { id: 'rest', name: 'REST APIs', domain: 'backend', level: 94, size: 2, years: 9, usedIn: ['Payments', 'Festivent', 'Putra AI'] },
  { id: 'payments', name: 'Fintech / Fiuu', domain: 'backend', level: 90, size: 3, years: 6, usedIn: ['Fiuu'] },
  { id: 'fpx', name: 'FPX / e-wallets', domain: 'backend', level: 88, size: 2, years: 6, usedIn: ['Fiuu', 'Client checkouts'] },
  { id: 'queues', name: 'Queues & jobs', domain: 'backend', level: 86, size: 1, years: 6, usedIn: ['Laravel Horizon', 'Redis'] },
  { id: 'architecture', name: 'System design', domain: 'backend', level: 90, size: 2, years: 8, usedIn: ['Enterprise AI platforms'] },

  /* AI & Agents */
  { id: 'claudecode', name: 'Claude Code', domain: 'ai', level: 92, size: 2, years: 2, usedIn: ['Bossku Superpowers'] },
  { id: 'codex', name: 'Codex', domain: 'ai', level: 85, size: 2, years: 2, usedIn: ['Bossku Superpowers'] },
  { id: 'cursor', name: 'Cursor', domain: 'ai', level: 88, size: 2, years: 2, usedIn: ['Daily driver', 'Bossku Superpowers'] },
  { id: 'agentic', name: 'Agent workflows', domain: 'ai', level: 90, size: 3, years: 2, usedIn: ['Bossku Superpowers', 'AFED AI platform'] },
  { id: 'llm', name: 'LLM APIs', domain: 'ai', level: 87, size: 2, years: 3, usedIn: ['Internal tools', 'Chat widgets'] },
  { id: 'ollama', name: 'Ollama / local LLM', domain: 'ai', level: 80, size: 2, years: 2, usedIn: ['Bossku Superpowers', 'This chat widget'] },
  { id: 'rag', name: 'RAG / memory', domain: 'ai', level: 82, size: 2, years: 2, usedIn: ['Bossku Superpowers', 'Enterprise AI'] },
  { id: 'evals', name: 'Evals & guardrails', domain: 'ai', level: 78, size: 1, years: 2, usedIn: ['Agent platforms'] },
  { id: 'aicoach', name: 'AI coaching', domain: 'ai', level: 76, size: 1, years: 1, usedIn: ['Binaqi'] },
  { id: 'prompting', name: 'Prompt systems', domain: 'ai', level: 84, size: 1, years: 3, usedIn: ['Bossku Superpowers', 'Client bots'] },

  /* IoT */
  { id: 'nodered', name: 'Node-RED', domain: 'iot', level: 86, size: 2, years: 6, usedIn: ['MSU training', 'Workshops'] },
  { id: 'rpi', name: 'Raspberry Pi', domain: 'iot', level: 84, size: 2, years: 7, usedIn: ['Workshops', 'Prototypes'] },
  { id: 'mqtt', name: 'MQTT', domain: 'iot', level: 80, size: 2, years: 5, usedIn: ['Sensor pipelines'] },
  { id: 'arduino', name: 'Arduino', domain: 'iot', level: 76, size: 1, years: 6, usedIn: ['Prototypes'] },
  { id: 'sensors', name: 'Sensor networks', domain: 'iot', level: 78, size: 1, years: 5, usedIn: ['IoT dashboards'] },
  { id: 'iotdash', name: 'IoT dashboards', domain: 'iot', level: 80, size: 1, years: 5, usedIn: ['Client IoT'] },
  { id: 'training', name: 'IoT training', domain: 'iot', level: 82, size: 1, years: 5, usedIn: ['MSU', 'Workshops'] },

  /* DevOps */
  { id: 'docker', name: 'Docker', domain: 'devops', level: 90, size: 3, years: 6, usedIn: ['Bossku Superpowers', 'Putra AI', 'Client deploys'] },
  { id: 'aws', name: 'AWS', domain: 'devops', level: 84, size: 2, years: 6, usedIn: ['Client deploys'] },
  { id: 'nginx', name: 'Nginx', domain: 'devops', level: 86, size: 2, years: 7, usedIn: ['All VPS work'] },
  { id: 'cloudflare', name: 'Cloudflare', domain: 'devops', level: 83, size: 1, years: 5, usedIn: ['Every launch'] },
  { id: 'hostinger', name: 'Hostinger / VPS', domain: 'devops', level: 85, size: 2, years: 7, usedIn: ['Festivent', 'Putra AI'] },
  { id: 'mysql', name: 'MySQL', domain: 'devops', level: 92, size: 2, years: 10, usedIn: ['Festivent'] },
  { id: 'postgres', name: 'PostgreSQL', domain: 'devops', level: 88, size: 2, years: 7, usedIn: ['Bossku Superpowers'] },
  { id: 'redis', name: 'Redis', domain: 'devops', level: 82, size: 2, years: 5, usedIn: ['Queues / cache'] },
  { id: 'mariadb', name: 'MariaDB', domain: 'devops', level: 84, size: 1, years: 7, usedIn: ['Legacy clients'] },
  { id: 'mongodb', name: 'MongoDB', domain: 'devops', level: 72, size: 1, years: 4, usedIn: ['Prototypes'] },
  { id: 'sqlite', name: 'SQLite', domain: 'devops', level: 78, size: 1, years: 6, usedIn: ['Local tools'] },
  { id: 'git', name: 'Git', domain: 'devops', level: 93, size: 2, years: 10, usedIn: ['Everywhere'] },
  { id: 'ci', name: 'CI / CD', domain: 'devops', level: 80, size: 1, years: 5, usedIn: ['Release pipelines'] },
  { id: 'security', name: 'OWASP / AppSec', domain: 'devops', level: 82, size: 2, years: 4, usedIn: ['Certifications', 'Client audits'] },

  /* Startups / ventures */
  { id: 'festivent', name: 'Festivent', domain: 'ventures', level: 92, size: 3, years: 3, usedIn: ['Event marketplace'] },
  { id: 'bosskuai', name: 'Bossku Superpowers', domain: 'ventures', level: 90, size: 3, years: 1, usedIn: ['AI co-founder toolkit'] },
  { id: 'binaqi', name: 'Binaqi', domain: 'ventures', level: 88, size: 3, years: 1, usedIn: ['Islamic habits'] },
  { id: 'putraai', name: 'Putra AI', domain: 'ventures', level: 84, size: 2, years: 2, usedIn: ['B2B mini SaaS'] },
  { id: 'marketplace', name: 'Marketplace UX', domain: 'ventures', level: 86, size: 1, years: 3, usedIn: ['Festivent'] },
  { id: 'saas', name: 'SaaS product', domain: 'ventures', level: 85, size: 1, years: 3, usedIn: ['Putra AI', 'Binaqi'] },
  { id: 'leadership', name: 'Eng. leadership', domain: 'ventures', level: 88, size: 2, years: 6, usedIn: ['Fiuu', 'Teams'] },
  { id: 'scoping', name: 'Product scoping', domain: 'ventures', level: 87, size: 1, years: 7, usedIn: ['Client quests'] },
]

/**
 * edges: [sourceId, targetId, weight]
 * Dense bridges so the map reads as a connected brain.
 */
export const edges = [
  /* Frontend cluster */
  ['vue', 'nuxt', 3], ['vue', 'tailwind', 2], ['vue', 'typescript', 2], ['vue', 'javascript', 3],
  ['nuxt', 'tailwind', 2], ['nuxt', 'typescript', 2], ['react', 'typescript', 2], ['react', 'tailwind', 1],
  ['javascript', 'typescript', 2], ['bootstrap', 'javascript', 2], ['threejs', 'vue', 2],
  ['gsap', 'vue', 2], ['gsap', 'threejs', 1], ['figma', 'tailwind', 1], ['figma', 'vue', 1],
  ['wordpress', 'php', 2], ['wordpress', 'javascript', 1],

  /* Backend cluster */
  ['laravel', 'php', 3], ['laravel', 'mysql', 3], ['laravel', 'redis', 2], ['laravel', 'rest', 3],
  ['laravel', 'queues', 2], ['php', 'yii2', 1], ['php', 'rest', 2], ['nodejs', 'javascript', 2],
  ['nodejs', 'typescript', 1], ['python', 'llm', 2], ['rest', 'payments', 2], ['payments', 'laravel', 2],
  ['payments', 'fpx', 3], ['fpx', 'rest', 2], ['queues', 'redis', 3], ['architecture', 'laravel', 2],
  ['architecture', 'rest', 2], ['architecture', 'docker', 1],

  /* Frontend ↔ Backend */
  ['vue', 'laravel', 3], ['nuxt', 'laravel', 1], ['react', 'nodejs', 1], ['bootstrap', 'laravel', 2],

  /* AI cluster */
  ['claudecode', 'agentic', 3], ['codex', 'agentic', 2], ['cursor', 'agentic', 3],
  ['llm', 'agentic', 3], ['ollama', 'llm', 3], ['ollama', 'agentic', 2], ['rag', 'agentic', 2],
  ['rag', 'llm', 2], ['evals', 'agentic', 2], ['prompting', 'llm', 2], ['prompting', 'agentic', 2],
  ['aicoach', 'llm', 2], ['aicoach', 'agentic', 1], ['python', 'agentic', 2], ['python', 'ollama', 1],
  ['agentic', 'nodejs', 2], ['cursor', 'typescript', 1],

  /* IoT cluster */
  ['nodered', 'mqtt', 3], ['rpi', 'mqtt', 2], ['rpi', 'nodered', 2], ['arduino', 'sensors', 2],
  ['mqtt', 'sensors', 3], ['sensors', 'iotdash', 2], ['nodered', 'iotdash', 2],
  ['training', 'nodered', 2], ['training', 'rpi', 2], ['arduino', 'rpi', 1],
  ['nodered', 'nodejs', 2], ['iotdash', 'vue', 1],

  /* DevOps / data cluster */
  ['docker', 'aws', 2], ['docker', 'nginx', 2], ['docker', 'ci', 2], ['aws', 'cloudflare', 1],
  ['nginx', 'cloudflare', 2], ['nginx', 'hostinger', 2], ['hostinger', 'cloudflare', 1],
  ['mysql', 'postgres', 2], ['mysql', 'mariadb', 2], ['redis', 'postgres', 1], ['redis', 'mysql', 1],
  ['mongodb', 'nodejs', 1], ['sqlite', 'python', 1], ['git', 'docker', 2], ['git', 'ci', 2],
  ['security', 'laravel', 2], ['security', 'nginx', 1], ['security', 'cloudflare', 1],
  ['docker', 'laravel', 2], ['docker', 'php', 1], ['hostinger', 'mysql', 2], ['hostinger', 'nginx', 2],

  /* Startups as hubs */
  ['festivent', 'laravel', 3], ['festivent', 'bootstrap', 2], ['festivent', 'mysql', 2],
  ['festivent', 'hostinger', 2], ['festivent', 'marketplace', 3], ['festivent', 'payments', 1],
  ['bosskuai', 'agentic', 3], ['bosskuai', 'php', 2], ['bosskuai', 'python', 2],
  ['bosskuai', 'vue', 2], ['bosskuai', 'typescript', 1], ['bosskuai', 'docker', 2],
  ['bosskuai', 'ollama', 2], ['bosskuai', 'rag', 2], ['bosskuai', 'cursor', 2],
  ['binaqi', 'nuxt', 3], ['binaqi', 'vue', 2], ['binaqi', 'typescript', 2],
  ['binaqi', 'tailwind', 2], ['binaqi', 'aicoach', 3], ['binaqi', 'saas', 2],
  ['putraai', 'laravel', 2], ['putraai', 'docker', 2], ['putraai', 'hostinger', 2],
  ['putraai', 'saas', 3], ['putraai', 'architecture', 1],

  /* Product / leadership bridges */
  ['leadership', 'architecture', 2], ['leadership', 'scoping', 2], ['leadership', 'payments', 1],
  ['scoping', 'saas', 1], ['scoping', 'marketplace', 1], ['marketplace', 'vue', 1],
  ['saas', 'docker', 1], ['festivent', 'leadership', 1], ['bosskuai', 'leadership', 1],
]
