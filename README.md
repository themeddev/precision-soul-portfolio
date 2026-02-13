# DevPortfolio Premium

A high-end, cinematic portfolio website built with React, TypeScript, Vite, GSAP, and Tailwind CSS. Features dynamic data management, internationalization, and dark/light mode support.

## Features

- ✨ **Dynamic Data Management**: All content stored in JSON files for easy updates
- 🌍 **Internationalization**: Support for English, French, and German
- 🌓 **Dark/Light Mode**: System preference detection with manual override
- 🎨 **Smooth Animations**: GSAP-powered animations and Lenis smooth scrolling
- 📱 **Responsive Design**: Mobile-first approach with beautiful UI
- ♿ **Accessible**: Keyboard navigation and proper ARIA labels
- 🔒 **Secure Contact Form**: Form validation and error handling
- 📄 **CV Download**: One-click CV download functionality
- 🎯 **SEO Optimized**: Dynamic meta tags and semantic HTML

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React
- **Language**: TypeScript

## Project Structure

```
devportfolio-premium/
├── data/                    # JSON data files
│   ├── profile.json        # Personal information
│   ├── projects.json        # Project portfolio
│   ├── skills.json          # Skills and expertise
│   ├── timeline.json        # Work experience timeline
│   ├── services.json        # Services offered
│   ├── social.json          # Social media links
│   ├── tech-stack.json      # Technology stack list
│   └── translations.json    # i18n translations
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact form
│   ├── Hero.tsx            # Hero section
│   ├── Navigation.tsx      # Navigation bar
│   ├── Projects.tsx        # Projects showcase
│   ├── Services.tsx        # Services section
│   ├── Sidebar.tsx         # Social sidebar
│   ├── Skills.tsx          # Skills section
│   └── TechTicker.tsx      # Tech stack ticker
├── contexts/                # React contexts
│   ├── LanguageContext.tsx # i18n context
│   └── ThemeContext.tsx    # Theme context
├── lib/                     # Utilities
│   ├── data-loader.ts      # Data loading utilities
│   └── utils.ts            # Helper functions
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main app component
├── index.tsx                # Entry point
└── index.html               # HTML template
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devportfolio-premium
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Data Management

All personal data is stored in JSON files within the `data/` directory. Update these files to customize your portfolio:

### Profile Data (`data/profile.json`)
- Personal information
- Bio and intro text (multi-language)
- Hero section content
- Statistics
- Contact information

### Projects (`data/projects.json`)
- Project details
- Descriptions (multi-language)
- Tech stack tags
- Links and images

### Skills (`data/skills.json`)
- Skill categories
- Individual skills with proficiency levels
- Multi-language category names

### Timeline (`data/timeline.json`)
- Work experience
- Education history
- Multi-language descriptions

### Services (`data/services.json`)
- Service offerings
- Descriptions and process steps
- Multi-language content

### Social Links (`data/social.json`)
- GitHub, LinkedIn, Twitter, Email links

### Translations (`data/translations.json`)
- UI text translations for all supported languages

## Customization

### Adding a New Language

1. Add translations to `data/translations.json`
2. Add translations to all data files (profile, projects, etc.)
3. Update the language type in `types.ts`
4. Update `LanguageContext.tsx` to include the new language

### Changing Colors

Update the Tailwind config in `index.html`:
```javascript
colors: {
  accent: '#your-color', // Primary accent color
  // ... other colors
}
```

### Adding a CV File

1. Place your CV PDF in `public/cv/` directory
2. Update `cvUrl` in `data/profile.json`

### Contact Form Backend

The contact form currently simulates an API call. To connect to a real backend:

1. Update the `handleSubmit` function in `components/Contact.tsx`
2. Replace the simulated API call with your actual endpoint
3. Ensure CORS is properly configured on your backend

## Environment Variables

Create a `.env` file for sensitive data:
```
VITE_CONTACT_API_URL=https://your-api.com/contact
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images with lazy loading
- Code splitting with Vite
- GSAP animations use GPU acceleration
- Smooth scrolling with Lenis

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Proper contrast ratios
- Screen reader friendly

## License

This project is private and proprietary.

## Credits

- Design inspiration from modern portfolio websites
- GSAP for animations
- Tailwind CSS for styling
- Lucide React for icons
