# VisionSpeakAI - Marketing & SaaS Platform

A cutting-edge marketing website and interactive SaaS dashboard for VisionSpeakAI, an AI-driven Lip-Reading and Gesture Recognition API platform powered by NVIDIA technology.

## Features

### Marketing Website
- **Landing Page**: Hero section with metrics, core capabilities, and use cases
- **Technology Page**: Deep-dive into neural networks, NVIDIA CUDA acceleration, and benchmarks
- **Solutions Page**: Four solution categories with benefits and integration details
- **Pricing Page**: Three-tier pricing with feature comparison
- **Developer Portal**: API documentation, code examples, SDK links
- **Interactive Demo**: Gesture and lip-reading recognition simulation

### SaaS Dashboard
- **Authentication**: Login and registration flows
- **Dashboard Overview**: Key metrics and quick stats
- **Analytics**: Usage tracking and performance metrics
- **API Key Management**: Key generation and management
- **Integrations**: Third-party service integration interface
- **Settings**: Account and preference management
- **Documentation**: Embedded guides and API references

### Design
- **Cyber-Precision Theme**: Dark obsidian background with electric cyan accents
- **Glassmorphic UI**: Semi-transparent frosted glass effects
- **Smooth Animations**: Scroll-triggered reveals and staggered text
- **Particle Effects**: Animated background system
- **Responsive**: Mobile-first design across all breakpoints

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + custom components
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Charts**: Recharts
- **Form Handling**: React Hook Form

## Quick Start

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
/app                 - Next.js app routes and pages
/components          - Reusable React components
  /shared           - Shared components (Nav, Footer, Cards, etc.)
  /animations       - Framer Motion animation wrappers
  /dashboard        - Dashboard-specific components
  /ui               - shadcn/ui components
/public             - Static assets and images
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and NVIDIA highlights |
| `/technology` | Technical architecture and NVIDIA CUDA details |
| `/solutions` | Use cases and industry solutions |
| `/pricing` | Pricing tiers and feature comparison |
| `/developers` | API documentation and code examples |
| `/demo` | Interactive AI demo interface |
| `/auth/login` | User login page |
| `/auth/signup` | User registration page |
| `/dashboard/*` | Protected SaaS dashboard routes |

## Key Components

### Shared
- `Navigation` - Sticky header with mobile menu
- `HeroSection` - Reusable hero template
- `FeatureCard` - Glassmorphic card component
- `CodeBlock` - Syntax-highlighted code
- `APIReference` - API documentation component
- `ComparisonTable` - Feature comparison matrix
- `Accordion` - Expandable content
- `Tabs` - Tabbed content switcher

### Animations
- `StaggeredText` - Word-by-word reveal
- `FadeInUp` - Scroll-triggered fade and slide
- `ScrollReveal` - Directional scroll reveal
- `BackgroundEffects` - Animated particle system

## Design System

### Colors
- **Primary**: Deep Obsidian (#050505)
- **Accent**: Electric Cyan (#00F2FF)
- **Secondary Accent**: Bio-Lime (#CCFF00)
- **Text**: Off-white (#F8F8F8)

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: XL (48px), LG (36px), MD (28px), SM (20px)
- **Body**: 16-18px with 1.4-1.6 line-height

### Animations
- Scroll-triggered reveals
- Staggered text animations
- Smooth hover effects
- Particle system background
- Glow effects on interactive elements

## NVIDIA Integration

VisionSpeakAI prominently features NVIDIA technology integration:

1. **Landing Page**: Performance metrics and GPU acceleration highlights
2. **Technology Page**: Dedicated NVIDIA section with:
   - CUDA/cuDNN architecture details
   - RTX and A100 GPU specifications
   - Performance benchmarks
   - Power efficiency metrics
3. **Throughout**: "Powered by NVIDIA" badges and latency specifications

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

The application is optimized for Vercel deployment with automatic builds and preview environments.

## Environment Variables

Create a `.env.local` file for local development (optional for frontend-only):
```
# Add any required API keys here
```

## Performance

- Optimized CSS with Tailwind
- Client-side animations with Framer Motion
- Responsive images with Next.js Image component
- Semantic HTML for accessibility
- Dark mode optimized for reduced eye strain

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

When adding new components:
1. Place shared components in `/components/shared`
2. Add animations to `/components/animations`
3. Follow the existing Tailwind CSS patterns
4. Use the design system tokens (colors, spacing, animations)
5. Ensure responsive design with mobile-first approach

## License

Proprietary - VisionSpeakAI

## Support

For questions or issues, please contact the development team.

---

Built with Next.js, Tailwind CSS, and Framer Motion. Designed with Cyber-Precision aesthetic in mind.
