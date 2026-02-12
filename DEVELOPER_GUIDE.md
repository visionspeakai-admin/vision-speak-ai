# VisionSpeakAI - Developer Quick Reference Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` in your browser.

## Project Structure at a Glance

```
/app          → Next.js pages and routes
/components   → React components (shared, animations, dashboard, ui)
/public       → Static assets and generated images
/lib          → Utility functions (add as needed)
```

## Adding New Pages

1. Create a directory under `/app`: `/app/your-page/`
2. Add `page.tsx` inside
3. Use `Navigation` and `Footer` components
4. Import animations as needed

```typescript
'use client'

import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/shared/hero-section'

export default function YourPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection title="Your Title" description="Your description" />
      <Footer />
    </main>
  )
}
```

## Adding New Components

1. Create in `/components/shared/` (or appropriate subdirectory)
2. Use TypeScript interfaces for props
3. Apply Tailwind CSS classes
4. Use design system tokens (colors, spacing)

```typescript
interface YourComponentProps {
  title: string
  description?: string
  onAction?: () => void
}

export function YourComponent({
  title,
  description,
  onAction,
}: YourComponentProps) {
  return (
    <div className="glass-effect p-6 rounded-xl">
      <h3 className="font-semibold text-white">{title}</h3>
      {description && <p className="text-slate-400">{description}</p>}
      {onAction && (
        <button onClick={onAction} className="glow-button mt-4">
          Action
        </button>
      )}
    </div>
  )
}
```

## Key Design System Classes

### Containers & Layouts
- `.glass-effect` - Glassmorphic background
- `.glass-effect-strong` - Stronger blur variant
- `.glow-border` - Glowing border effect

### Buttons
- `.glow-button` - Primary button with glow
- `.glow-button:hover` - Hover state (auto-applied)

### Text & Typography
- `.heading-xl`, `.heading-lg`, `.heading-md`, `.heading-sm`
- `.body-text` - Standard body text
- `.text-glow` - Glowing text effect
- `.text-pretty` or `.text-balance` - Better text wrapping

### Effects & Animations
- `.gradient-cyber` - Cyan-to-purple gradient
- `.gradient-lime` - Cyan-to-lime gradient
- `.pulse-glow` - Pulsing glow animation
- `.animate-fade-in` - Fade in (0.6s)
- `.animate-fade-up` - Fade and slide up (0.6s)
- `.animate-glow-pulse` - Glow pulse (3s loop)

## Using Shared Components

### HeroSection
```typescript
<HeroSection
  badgeText="Optional badge"
  title="Your Title"
  description="Description here"
  primaryCta={{ text: 'Button', href: '/path' }}
  secondaryCta={{ text: 'Secondary', href: '/path' }}
  backgroundVariant="gradient"
/>
```

### FeatureCard
```typescript
<FeatureCard
  icon={<IconComponent />}
  title="Feature Title"
  description="Feature description"
  badge="Optional Badge"
  isHighlighted={true}
/>
```

### CodeBlock
```typescript
<CodeBlock
  code={`const code = "here"`}
  language="javascript"
  title="Example Code"
/>
```

### Tabs
```typescript
<Tabs
  items={[
    {
      label: 'Tab 1',
      value: 'tab1',
      content: <div>Content 1</div>,
    },
    {
      label: 'Tab 2',
      value: 'tab2',
      content: <div>Content 2</div>,
    },
  ]}
  defaultValue="tab1"
/>
```

### Accordion
```typescript
<Accordion
  items={[
    {
      id: '1',
      title: 'Question?',
      content: 'Answer here',
    },
  ]}
  allowMultiple={false}
/>
```

## Using Animation Components

### StaggeredText
```typescript
import { StaggeredText } from '@/components/animations/staggered-text'

<StaggeredText
  text="Word by word animation"
  className="heading-lg"
  staggerDelay={0.08}
/>
```

### FadeInUp
```typescript
import { FadeInUp } from '@/components/animations/fade-in-up'

<FadeInUp delay={0.2}>
  <YourComponent />
</FadeInUp>
```

### ScrollReveal
```typescript
import { ScrollReveal } from '@/components/animations/scroll-reveal'

<ScrollReveal direction="up" delay={0.1}>
  <YourComponent />
</ScrollReveal>
```

## Color Palette (CSS Variables)

```css
--background: 0 0% 1.2%;          /* Deep obsidian */
--foreground: 189 100% 97.3%;     /* Off-white */
--primary: 189 100% 50%;          /* Electric cyan */
--secondary: 210 50% 15%;         /* Slate */
--accent: 189 100% 50%;           /* Cyan */
--cyan-glow: 189 100% 50%;
--lime-accent: 60 100% 50%;
--purple-accent: 280 100% 65%;
```

Use with Tailwind: `text-cyan-400`, `bg-slate-700`, etc.

## Common Patterns

### Responsive Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <YourCard key={item.id} {...item} />
  ))}
</div>
```

### Section Layout
```typescript
<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <h2 className="heading-lg mb-12 text-center">Section Title</h2>
  {/* Content here */}
</section>
```

### CTA Banner
```typescript
<div className="glass-effect p-12 rounded-2xl text-center">
  <h2 className="heading-lg mb-4">Title</h2>
  <p className="body-text mb-8">Description</p>
  <div className="flex gap-4 justify-center">
    <button className="glow-button">Primary</button>
    <button className="border border-cyan-500/30">Secondary</button>
  </div>
</div>
```

## Important Notes

### Dark Mode
- The site is dark mode by default
- Use light colors for text: `text-white`, `text-slate-300`
- Use dark colors for backgrounds: Already set as default
- **Do NOT** add light mode toggle unless specifically required

### Image Optimization
- Use Next.js `Image` component for optimization
- Set `crossOrigin="anonymous"` for canvas operations
- Add `alt` text to all images (except decorative)

### Typography
- **Maximum font families: 2** (We use Inter + system fallbacks)
- Use semantic heading hierarchy: h1 → h2 → h3, etc.
- Use `text-balance` or `text-pretty` on headings

### Component Props
- Always use TypeScript interfaces
- Mark optional props with `?`
- Provide sensible defaults
- Document non-obvious props

### Form Validation
- Use Zod for schema validation
- React Hook Form for form state
- Show validation errors near inputs
- Disable submit until valid

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Self-Hosted
```bash
npm run build
npm start
```

## Debugging

Enable debug logs with:
```typescript
console.log('[v0] Debug message:', variable)
```

Remove debug logs before committing.

## Performance Tips

1. **Use `next/image`** for images
2. **Lazy load components** where appropriate
3. **Avoid inline styles** - use Tailwind
4. **Use semantic HTML** for better rendering
5. **Minimize re-renders** - memoize components
6. **Use proper key props** in lists

## Common Issues & Solutions

### Classes not applying?
- Make sure you're using Tailwind classes (not custom CSS)
- Check className syntax: `className="class1 class2"`
- Rebuild if needed: `npm run dev`

### Animation not smooth?
- Use Framer Motion components (provided)
- Avoid heavy animations on mobile
- Test performance: Chrome DevTools Performance tab

### Mobile layout broken?
- Check responsive prefixes: `md:`, `lg:`, etc.
- Test on actual mobile device
- Use mobile-first approach

### TypeScript errors?
- Check props interface matches usage
- Use proper imports: `import type { Interface }`
- Hover over variables to see inferred types

## Useful Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Tips for Success

✓ Start with layouts and structure
✓ Add styling with Tailwind
✓ Implement interactions with Framer Motion
✓ Test responsiveness at different breakpoints
✓ Use semantic HTML throughout
✓ Keep components focused and reusable
✓ Follow the established patterns
✓ Document complex components

---

**Happy coding!** 🚀

For detailed information, see `PROJECT_STRUCTURE.md` and `BUILD_SUMMARY.md`.
