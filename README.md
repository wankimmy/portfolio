# Modern Portfolio - Vue.js

A beautiful, modern portfolio website built with Vue 3, GSAP animations, and Vite.

## ✨ Features

- 🎨 Modern, attractive design with gradients
- ✨ Smooth animations with GSAP
- 📱 Fully responsive
- 🚀 Fast development with Vite
- 🔗 Professional social media integration
- 💼 Work experience timeline
- 🎯 Featured projects showcase
- 🛠️ Technology stack display

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- XAMPP (for local deployment)

### 1. Install Dependencies

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

Visit `http://localhost:5173`

This will start the Vite development server with hot module replacement.

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### 4. Deploy to XAMPP

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy files to XAMPP:**
   - Copy ALL contents from the `dist` folder
   - Paste them into your XAMPP htdocs folder (e.g., `C:\xampp\htdocs\safwan\`)

3. **Add your profile image:**
   - Add your profile photo as `profile.jpg` in the `assets` folder
   - The image should be at least 320x320 pixels for best quality

4. **Start XAMPP:**
   - Open XAMPP Control Panel
   - Start Apache
   - Access your portfolio at `http://localhost/safwan/`

### 5. Development in XAMPP (Optional)

If you want to develop directly in XAMPP without building:
1. Keep your Vue source files in the project
2. Use Vite dev server on port 5173 during development
3. Only build and copy to XAMPP when ready for production

## 📝 Customize Your Portfolio

The portfolio has been pre-populated with Safwan Hakim's information. Update the following:

### 1. Profile Image (`src/components/AboutSection.vue`)
- Add your profile photo as `profile.jpg` in the `assets` folder
- The image path is already configured: `/assets/profile.jpg`

### 2. Hero Section (`src/components/HeroSection.vue`)
Update with your personal information:
- Name: Currently "SAFWAN HAKIM" 
- Role: Currently "Associate Software Manager"
- Location: Currently "Selangor, Malaysia"
- Social links (Email, LinkedIn, GitHub)
- Experience description

### 3. About Section (`src/components/AboutSection.vue`)
- Personal introduction text
- Personality traits (currently: Curious Cat, Problem Solver, Skeptical Thinker)

### 4. Experience Section (`src/components/ExperienceSection.vue`)
- Current experience is already populated
- Modify dates, companies, and responsibilities as needed

### 5. Projects Section (`src/components/ProjectsSection.vue`)
- Current projects are already added (Festivent, EZDisposal, Entrusol, TTDI Meatpoint)
- Update project URLs, descriptions, and tech stacks

### 6. Tech Section (`src/components/TechSection.vue`)
Currently displays 24 technologies including:
- Languages: PHP, HTML, CSS, JavaScript, jQuery
- Frameworks: Laravel, Yii2, Node.js, Vue.js, WordPress, Node-Red
- Tools: Docker, MySQL, CouchDB, Redis, AWS, Git, Raspberry Pi, Arduino, MQTT, Nginx, Postman, Cloudflare, Hostinger

Add or remove technologies as needed.

### 7. Styling
All components use **Tailwind CSS** for styling. Edit component files to customize colors, spacing, and layout.

## 🎨 Sections

The portfolio includes:
1. **Hero** - Introduction with social media links
2. **About** - Personal info and statistics
3. **Technologies** - Skills and tools you use
4. **Experience** - Professional work history timeline
5. **Projects** - Featured projects with images
6. **Services** - What you can hire me for
7. **Pricing** - Transparent starting prices (MYR) + monthly care plan
8. **Certificates** - Credentials and training
9. **Footer** - Contact CTA (WhatsApp / email)

Plus a floating **AI chatbot** that answers questions about services, pricing, and experience.

## 🤖 AI Chatbot (Ollama Cloud)

The chat widget streams replies from [Ollama Cloud](https://ollama.com) (default model: `gemma4:31b-cloud`).
The API key stays **server-side only** — the browser calls `/api/ollama/chat`, and the proxy
injects the `Authorization` header:

- **Dev:** Vite dev server proxy (see `vite.config.js`)
- **Prod:** nginx proxy with the key injected via envsubst (see `nginx.conf`, rate-limited per IP)

### Setup

1. Get an API key at https://ollama.com/settings/keys
2. Copy `.env.example` to `.env` and set `OLLAMA_API_KEY=...`
3. Dev: `npm run dev` (or `docker compose up -d` — the key is passed through)
4. Prod: `docker build -t portfolio . && docker run -p 80:80 -e OLLAMA_API_KEY=your-key portfolio`

Without a key the widget still works — it falls back to a friendly "WhatsApp me instead" message.
To change the model, set `VITE_OLLAMA_MODEL` (e.g. `deepseek-v3.1:cloud`, `gpt-oss:120b-cloud`).

## 📦 Tech Stack

- **Vue 3** (Composition API)
- **GSAP** (Scroll animations)
- **Vite** (Build tool)
- **Tailwind CSS** (Utility-first CSS via CDN)
- **SVG Icons** (Email, LinkedIn, GitHub)
- **DevIcons CDN** (Technology logos)

## 📁 Project Structure

```
safwan/
├── src/
│   ├── components/
│   │   ├── Navbar.vue       (Navigation bar)
│   │   ├── HeroSection.vue  (Introduction section)
│   │   ├── AboutSection.vue  (About me section)
│   │   ├── TechSection.vue (Technologies showcase)
│   │   ├── ExperienceSection.vue (Work experience)
│   │   └── ProjectsSection.vue (Featured projects)
│   ├── App.vue              (Root component)
│   ├── main.js              (Application entry point)
│   └── style.css            (Global styles & animations)
├── assets/                  (Profile images go here)
│   └── profile.jpg          (Add your profile photo)
├── dist/                    (Built files - generated by Vite)
├── index.html               (HTML entry point)
├── package.json             (Dependencies & scripts)
├── vite.config.js           (Vite configuration)
├── logo.svg                 (Favicon)
└── README.md                (This file)
```

## 📦 Dependencies

### Production Dependencies
- **vue** (^3.4.0) - Progressive JavaScript framework
- **gsap** (^3.12.0) - Animation library for scroll effects

### Development Dependencies
- **@vitejs/plugin-vue** (^5.0.0) - Vite plugin for Vue
- **vite** (^5.0.0) - Build tool and dev server

## ⚙️ Configuration

### Environment Variables
No environment variables required for basic usage.

### Build Optimization
The project uses Vite for:
- Fast HMR (Hot Module Replacement)
- Optimized production builds
- Code splitting
- Asset optimization

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Troubleshooting

### Icons not loading?
- Technology icons are loaded from CDN (jsdelivr and GitHub)
- Ensure you have an active internet connection
- Some icons use Simple Icons which are black and white by design

### Profile image not showing?
- Make sure `profile.jpg` exists in the `assets/` folder
- Image should be a JPG/PNG format
- Recommended size: 320x320 pixels or larger

### Build errors?
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Make sure you're using Node.js v16 or higher

## 📄 License

This is a personal portfolio template. Feel free to use and modify for your own projects.

---

**Built with** ❤️ **using Vue 3, GSAP, and Tailwind CSS**
