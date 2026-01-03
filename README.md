# SARCS Lab Website

A modern, static academic research lab website built with Next.js 14, React 18, TypeScript, and Tailwind CSS.

## Features

- ✅ **Static Site Generation** - Fast, SEO-friendly pages
- ✅ **Dark/Light Mode** - System preference detection + manual toggle
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Client-side Search** - Filter publications by title, author, venue, year
- ✅ **Photo Gallery** - Lightbox viewer with category filtering
- ✅ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation
- ✅ **Type-safe** - Full TypeScript coverage

## Project Structure

```
sarcs-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (navbar, footer, theme)
│   ├── page.tsx           # Home page
│   ├── projects/          # Research areas
│   │   ├── page.tsx       # Projects list
│   │   └── [slug]/page.tsx # Individual project
│   ├── publications/      # Publications with filtering
│   ├── people/            # Team directory
│   ├── media/             # Photo gallery
│   ├── blog/              # Blog + contact + openings
│   ├── resources/         # Tools & datasets
│   └── not-found.tsx      # 404 page
│
├── components/            # React components
│   ├── layout/           # Navbar, Footer, ThemeProvider
│   ├── ui/               # Reusable UI (Button, Card, Badge, etc.)
│   ├── home/             # Home page sections
│   ├── projects/         # Project components
│   ├── publications/     # Publication list & filters
│   ├── people/           # Team cards
│   ├── media/            # Gallery components
│   ├── blog/             # Blog & contact
│   └── resources/        # Resource list
│
├── data/                 # JSON content files
│   ├── lab-info.json     # Lab name, mission, contact
│   ├── news.json         # News items
│   ├── projects.json     # Research areas
│   ├── publications.json # Publications
│   ├── people.json       # Team members
│   ├── media.json        # Gallery items
│   ├── blog.json         # Blog posts
│   ├── openings.json     # Open positions
│   └── resources.json    # Tools & datasets
│
├── types/                # TypeScript definitions
│   └── index.ts          # All interfaces & types
│
├── public/               # Static assets
│   └── images/           # Logos, photos, placeholders
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    └── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run development server:**

   ```bash
   npm run dev
   ```

3. **Open in browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run start

# Or serve the static output
npx serve out
```

The static site will be generated in the `out/` directory.

## Customization Guide

### Content Updates

All content is stored in JSON files under `/data/`. Edit these files to update:

| File | Content |
|------|---------|
| `lab-info.json` | Lab name, mission, contact details, affiliations |
| `news.json` | News items and announcements |
| `projects.json` | Research areas and projects |
| `publications.json` | Publication list with metadata |
| `people.json` | Team members (faculty, students, alumni) |
| `media.json` | Gallery photos |
| `blog.json` | Blog posts |
| `openings.json` | Open positions |
| `resources.json` | Tools, datasets, code repos |

### Images

Replace placeholder images in `/public/images/`:

```
images/
├── logo.svg              # Main logo
├── logo-white.svg        # Light variant for dark backgrounds
├── og-image.svg          # Social sharing image
├── people/               # Team member photos
├── gallery/              # Gallery photos
└── affiliations/         # Partner/university logos
```

**Recommended image sizes:**
- Logo: 200×60px (SVG preferred)
- People: 300×300px (square)
- Gallery: 800×600px or similar aspect
- Affiliations: 200×80px
- OG Image: 1200×630px

### Styling

Edit `/tailwind.config.ts` to customize:

- **Colors**: Primary (blue), accent (teal), surface (neutral)
- **Typography**: Font family, sizes
- **Dark mode**: Uses `class` strategy for manual toggle

Key CSS custom properties in `/app/globals.css`:

```css
:root {
  --color-primary: 37 99 235;      /* Blue */
  --color-accent: 20 184 166;       /* Teal */
  --color-background: 255 255 255;  /* White */
  --color-surface: 248 250 252;     /* Light gray */
}

.dark {
  --color-background: 15 23 42;     /* Dark blue-gray */
  --color-surface: 30 41 59;
}
```

### SEO Metadata

Update `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Lab Name',
  description: 'Your lab description',
  metadataBase: new URL('https://your-domain.edu'),
  // ...
};
```

### Navigation

Edit `/components/layout/Navbar.tsx` to modify navigation links. The current structure is defined in the `navItems` array.

## Components Reference

### UI Components (`/components/ui/`)

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `size`, `as`, `leftIcon`, `rightIcon` | Polymorphic button/link |
| `Card` | `hover`, `className` | Card container with variants |
| `Badge` | `variant`, `size` | Tag/category badge |
| `SearchBar` | `onSearch`, `placeholder`, `debounceMs` | Debounced search input |
| `Section` | `className`, `id` | Page section wrapper |
| `Lightbox` | `images`, `currentIndex`, `onClose` | Modal image viewer |

### Layout Components (`/components/layout/`)

| Component | Description |
|-----------|-------------|
| `ThemeProvider` | Dark mode context with localStorage |
| `Navbar` | Fixed navigation with mobile menu |
| `Footer` | Site footer with contact & socials |

## Development

### Type Checking

```bash
npm run type-check
# or
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Formatting

The project uses Prettier (configure via `.prettierrc` if needed):

```bash
npx prettier --write .
```

## Deployment

### Static Hosting (Recommended)

Since this is a static site, deploy to any static host:

- **Vercel**: `npx vercel`
- **Netlify**: Drop `out/` folder or connect repo
- **GitHub Pages**: Use `gh-pages` branch
- **AWS S3 + CloudFront**
- **University web server**: Upload `out/` contents

### Environment Variables

No environment variables required for the static build. All content comes from JSON files.

## Browser Support

- Chrome, Firefox, Safari, Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT License - Feel free to use and modify for your academic lab.

---

## Placeholder Markers

Search for `PLACEHOLDER` comments in the codebase to find all items that need customization:

```bash
# Find all placeholder markers
grep -r "PLACEHOLDER" --include="*.tsx" --include="*.ts" --include="*.json"
```

## Need Help?

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Lucide Icons**: [lucide.dev/icons](https://lucide.dev/icons)
