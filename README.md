# Bahir Dar Explorer 🌍

A premium tourism and travel web application promoting Bahir Dar, Lake Tana, Blue Nile Falls, and Ethiopian culture. Built with Next.js 15, Tailwind CSS, and Framer Motion.

## ✨ Features

- **8 Complete Pages** — Home, Destinations, Attractions, Culture, Blog, Gallery, About, Contact
- **Full-screen Hero** with animated slideshow and Ken Burns effect
- **Dark Mode** with system preference detection and localStorage persistence
- **Smooth Animations** powered by Framer Motion throughout
- **Blog System** with like/bookmark using localStorage
- **Masonry Gallery** with lightbox preview
- **Favorites System** using localStorage
- **Search & Filtering** on Attractions and Blog pages
- **Dynamic Blog Posts** with full article pages and related posts
- **Contact Form** with validation and success states
- **Newsletter Subscription** component
- **Back to Top** button
- **Responsive Design** — mobile-first, works on all screen sizes
- **SEO Optimised** — metadata, Open Graph, Twitter cards

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
bahir-dar-explorer/
├── app/
│   ├── layout.js              # Root layout with Navbar, Footer
│   ├── page.js                # Home page
│   ├── globals.css            # Global styles + Tailwind
│   ├── not-found.js           # 404 page
│   ├── destinations/          # Destinations page
│   ├── attractions/           # Attractions page with search/filter
│   ├── culture/               # Culture page
│   ├── blog/                  # Blog listing + [slug] detail pages
│   ├── gallery/               # Masonry gallery with lightbox
│   ├── about/                 # About page
│   └── contact/               # Contact form page
├── components/
│   ├── Navbar.js              # Responsive sticky navbar with dark mode
│   ├── Footer.js              # Footer with newsletter
│   ├── ThemeProvider.js       # Dark mode context
│   ├── BackToTop.js           # Floating back-to-top button
│   ├── SectionHeader.js       # Reusable section header
│   ├── SkeletonCard.js        # Loading skeleton component
│   └── home/                  # Home page section components
│       ├── HeroSection.js
│       ├── StatsSection.js
│       ├── FeaturedDestinations.js
│       ├── TravelHighlights.js
│       ├── PopularAttractions.js
│       ├── TestimonialsSection.js
│       └── NewsletterSection.js
├── lib/
│   └── data.js                # All content data
├── tailwind.config.js
├── next.config.mjs
└── package.json
```

## 🎨 Tech Stack

| Technology    | Purpose                          |
|---------------|----------------------------------|
| Next.js 15    | React framework, App Router, SSG |
| JavaScript    | Language                         |
| Tailwind CSS  | Utility-first styling            |
| Framer Motion | Animations and transitions       |
| React Icons   | Icon library                     |
| localStorage  | Client-side persistence          |

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Click Deploy — zero configuration needed

### Manual

```bash
npm run build
# Deploy the .next folder to your hosting provider
```

## 📸 Image Credits

Images sourced from [Unsplash](https://unsplash.com) — free to use under the Unsplash License.

## 📄 License

MIT — free to use and modify.
