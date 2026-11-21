# AccessEase – AI-Powered Accessibility Assistant

An accessible, modern, and welcoming web platform engineered to make digital experiences simple, intuitive, and inclusive for everyone.

---

## 🎨 Design System & Color Palette

AccessEase adheres to high-contrast WCAG 2.1 AA/AAA accessibility principles with a calming, welcoming aesthetic:
- **White (`#ffffff`)**: Clean, distraction-free primary surface.
- **Soft Lavender (`#faf8fd`, `#f3effc`, `#ede7f9`, `#dccff2`)**: Calming background surfaces, card accents, and gentle elevation.
- **Dark Purple (`#2e1065`, `#1e0a3c`, `#3b1566`)**: High-contrast headings and prominent brand elements (contrast ratios exceeding 10:1 to 14:1 against light surfaces).
- **Interactive Purple (`#6b21a8`, `#7c3aed`)**: Accessible interactive elements and high-visibility keyboard focus rings.

---

## 📂 Project Structure

```
AccessEase/
├── index.html                   # HTML entry point with meta tags and favicon
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite development and build configuration
├── README.md                    # Project documentation and guide
└── src/
    ├── main.jsx                 # React root bootstrap file
    ├── App.jsx                  # Main application structure with landmark elements
    ├── App.css                  # Common layout, button styles, and utility classes
    ├── index.css                # Global CSS variables, reset, and focus ring system
    └── components/
        ├── Navbar/
        │   ├── Navbar.jsx       # Responsive header with navigation links & mobile menu
        │   └── Navbar.css       # Navbar styles and responsive hamburger transitions
        ├── Hero/
        │   ├── Hero.jsx             # Hero section with headline, description & CTA buttons
        │   ├── Hero.css             # Hero layout, typography, and ambient lighting styles
        │   ├── GeometricNetwork.jsx # Light-theme interconnected geometric network visual
        │   └── GeometricNetwork.css # 3D facets, glowing violet lines & light trail animations
        ├── Features/
        │   ├── Features.jsx     # Assistive tools section containing the 5 feature cards & modal state
        │   ├── FeatureCard.jsx  # Reusable card component for individual assistive tools
        │   └── Features.css     # Responsive grid & card styling with focus rings
        ├── Tools/
        │   └── TextToSpeechModal/
        │       ├── TextToSpeechModal.jsx # Web Speech API Text-to-Speech modal assistant
        │       └── TextToSpeechModal.css # Accessible modal styles, focus states & controls
        ├── About/
        │   ├── About.jsx        # Social purpose, mission statement & impact statistics
        │   └── About.css        # Narrative layout, metric cards & pillar grid styles
        ├── Contact/
        │   ├── Contact.jsx      # Accessible feedback form & communication channels
        │   └── Contact.css      # Form controls, validation states & contact cards
        └── Footer/
            ├── Footer.jsx       # Site footer with compliance statements & navigation
            └── Footer.css       # Dark purple theme footer styles
```

---

## 📄 File Purposes & Responsibilities

| File | Purpose |
| :--- | :--- |
| `index.html` | Entry document defining document language (`lang="en"`), responsive viewport, and SEO metadata. |
| `vite.config.js` | Configures the fast Vite development server and React JSX transform. |
| `src/main.jsx` | Mounts the root React component onto the `#root` DOM element in `React.StrictMode`. |
| `src/index.css` | Defines CSS custom properties (color palette, typography, focus indicators), CSS reset, and reduced-motion rules. |
| `src/App.jsx` | Houses the top-level semantic structure: Skip link, `<header>`, `<main id="main-content">`, and `<footer>`. |
| `src/App.css` | Holds shared container sizing, typography scale, screen-reader-only utilities (`.sr-only`), and button variants. |
| `Navbar.jsx` & `Navbar.css` | Responsive header with brand logo, smooth page jump links, keyboard escape handling, and mobile toggle with ARIA disclosure. |
| `Hero.jsx` & `Hero.css` | Welcoming hero section with "Accessibility for everyone, everywhere." heading, updated project description, "Explore Tools" & "Learn More" buttons, and ambient lighting backdrop. |
| `GeometricNetwork.jsx` & `.css` | Futuristic light-theme interconnected geometric network with glowing violet lines, floating 3D polyhedral nodes, light trails, and subtle particles representing inclusive AI. |
| `Features.jsx` & `FeatureCard.jsx` | Showcases the five core assistive AI tools with reusable cards, category tags, descriptions, and feature bullets; opens the TTS tool on click. |
| `TextToSpeechModal.jsx` & `.css` | Interactive accessible modal powered by the native Web Speech API (`SpeechSynthesis`), featuring voice selection, speed controls, Listen/Pause/Resume/Stop actions, and full keyboard navigation. |
| `About.jsx` & `About.css` | Highlights the social purpose of AccessEase, global disability statistics, and foundational values (Universal Design, Autonomy, Ethical AI). |
| `Contact.jsx` & `Contact.css` | Provides an accessible contact form with proper `<label>` associations and alternate format request information. |
| `Footer.jsx` & `Footer.css` | Accessible footer in dark purple with navigation links, WCAG 2.1 AA assurance statement, and copyright notice. |

---

## 🛠️ Five Core AI Assistive Tools

1. **Text to Speech**: Converts written articles, digital documents, and web content into natural, expressive voice narration.
2. **Speech to Text**: Transcribes live spoken discussions, classroom lectures, and audio into real-time captions.
3. **AI Text Simplifier**: Translates convoluted legal documents, technical jargon, and dense texts into clear, everyday language.
4. **Regional Language Translator**: Bridges language divides by translating vital digital services into regional languages and dialects.
5. **AI Image Description**: Analyzes online graphics, charts, and photos to generate rich alternative text (alt-text) for screen reader users.

---

## ♿ Accessibility Best Practices Implemented

- **Semantic HTML5 Landmarks**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Keyboard Navigation**:
  - Hidden "Skip to main content" link at the very top for screen readers and keyboard tab navigation.
  - Custom `:focus-visible` outline (`3px solid #7c3aed` with `3px` offset) on all interactive elements.
  - Mobile menu responds to `Escape` key to close gracefully.
- **Sufficient Color Contrast**:
  - Dark purple text on white and lavender surfaces yields contrast ratios between **10:1** and **15:1** (exceeding WCAG AAA).
  - Light lavender and white text on dark purple footer yields **12:1+** contrast.
- **ARIA & Form Accessibility**:
  - Explicit `<label htmlFor="...">` bindings on all form inputs.
  - `aria-expanded` and `aria-controls` on mobile navigation disclosure toggles.
  - `aria-hidden="true"` on decorative icons to avoid screen reader clutter.
- **Motion Accessibility**:
  - `@media (prefers-reduced-motion: reduce)` rules disable transitions and animations for users sensitive to vestibular motion.

---

## 🚀 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open your browser to `http://localhost:3000` to interact with AccessEase.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized, minified production build in the `dist/` directory.
