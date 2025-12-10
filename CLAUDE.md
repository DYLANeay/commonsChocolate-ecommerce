# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static e-commerce website for "Le paradis du chocolat" (The Chocolate Paradise), a French chocolate shop. The site is built with vanilla HTML, CSS, and JavaScript without any build tools or frameworks.

## Project Structure

```
e-boutique/e-boutique/
├── index.html          # Main HTML page
├── styles.css          # All styling including responsive design
├── script.js           # JavaScript functionality (currently empty)
└── img/                # Chocolate product images and assets
```

## Development Workflow

Since this is a static website with no build process:

- **Preview**: Open `e-boutique/e-boutique/index.html` directly in a browser or use a simple HTTP server:
  ```bash
  cd e-boutique/e-boutique
  python -m http.server 8000
  ```
  Then navigate to `http://localhost:8000`

- **No build step required**: Changes to HTML, CSS, or JS files are immediately visible on browser refresh

## Architecture Notes

### HTML Structure (index.html)

The page follows a standard single-page layout:
1. **Header** (`.site-header`) - Brand and navigation
2. **Hero Section** (`.hero`) - Welcome banner with background image (`img/chocolat_paysage.jpg`)
3. **Products Section** (`.features`) - Grid of 4 chocolate products:
   - Think (violet chocolate)
   - Calm (blue chocolate)
   - Defend (green chocolate)
   - Happiness (red chocolate)
4. **Cart Section** (`.panier`) - Placeholder for shopping cart functionality
5. **Footer** (`.site-footer`) - Links organized in 4 columns

### Styling System (styles.css)

- **CSS Variables** defined in `:root` for consistent theming (colors, spacing, borders)
- **Mobile-first responsive design** with breakpoints:
  - `@media (min-width: 400px)` - Show full navigation
  - `@media (min-width: 720px)` - 2-column product grid
  - `@media (min-width: 1100px)` - 4-column product grid
  - `@media (min-width: 800px)` - 4-column footer layout
- **Reusable components**: buttons (`.btn--primary`, `.btn--ghost`, `.btn--xl`), feature cards with hover effects
- **Fixed background sections** use `.hero--bg-fixed` and `.features--bg-fixed` patterns

### Image Assets

Product images use colored chocolate bars:
- `chocolat_violet.jpg` - Think
- `chocolat_bleu.jpg` - Calm
- `chocolat_vert.jpg` - Defend
- `chocolat_rouge.jpg` - Happiness
- `chocolat_paysage.jpg` - Hero background

Additional unused images exist in `img/` directory (Commons Chocolate branding photos).

## Current Implementation State

- Shopping cart section (`.panier`) is a placeholder with unclosed `<div>` tag at line 72
- `script.js` is currently empty - no JavaScript functionality implemented yet
- All navigation links use `href="#"` placeholders
- French language throughout the interface

## Known Issues

- HTML validation error: Line 72 has unclosed `</div>` tag in the `.panier` section
