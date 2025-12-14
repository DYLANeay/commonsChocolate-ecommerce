# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static e-commerce website for "Le paradis du chocolat" (The Chocolate Paradise), a French chocolate shop. The site is built with **pure vanilla HTML, CSS, and JavaScript** - no build tools, no npm dependencies, no frameworks.

## Project Structure

```
commonsChocolate-ecommerce/
├── index.html              # Main homepage
├── pages/
│   ├── produits.html       # Products listing page
│   ├── panier.html         # Shopping cart page
│   └── contact.html        # Contact form page
├── css/
│   └── styles.css          # All styling including responsive design
├── js/                     # JavaScript modules (vanilla JS, no bundling)
│   ├── cart.js             # Shopping cart functionality
│   ├── contact-form.js     # Contact form validation
│   ├── product-filter.js   # Product filtering and flip cards
│   └── main.js             # Initialization (DOMContentLoaded)
└── img/                    # Chocolate product images and assets
```

## Development Workflow

This is a **100% static website** with no build process or dependencies:

- **Preview**: Open `index.html` directly in a browser or use a simple HTTP server:
  ```bash
  python -m http.server 8000
  ```
  Then navigate to `http://localhost:8000`

- **No build step required**: Changes to HTML, CSS, or JS files are immediately visible on browser refresh
- **No npm, no node_modules**: The site runs entirely in the browser with vanilla JavaScript
- **Modular JavaScript**: Each HTML page loads 4 script files in order:
  1. `cart.js` - Cart functionality
  2. `contact-form.js` - Form validation
  3. `product-filter.js` - Product filtering
  4. `main.js` - Initializes everything on DOMContentLoaded

## JavaScript Architecture

All JavaScript is **vanilla ES6** with no modules/imports/exports. Files are loaded as separate `<script>` tags in HTML:

### js/cart.js
- Uses localStorage to persist shopping cart data
- **Functions**: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`, `getCart()`, `saveCart()`, `renderCart()`
- Displays cart count in header badge
- Renders cart items on panier.html
- Shows notifications when items are added

### js/contact-form.js
- Client-side validation (email format, field length)
- **Functions**: `initContactForm()`, `validateField()`, `sanitizeInput()`, `showError()`, `clearError()`
- Displays validation errors inline
- **Note**: No actual email sending (no backend, EmailJS removed)
- Form just validates and shows success message

### js/product-filter.js
- Price range filtering on products page
- **Functions**: `initProductFilter()`, `filterProducts()`, `initFlipCards()`, `updateProductCount()`
- Flip card animations for product details
- Updates product count display

### js/main.js
- Simple initialization script
- Calls `initCart()`, `initContactForm()`, `initProductFilter()` when DOM is ready
- All init functions check if required elements exist before running

## Styling System (css/styles.css)

- **CSS Variables** defined in `:root` for consistent theming
- **Mobile-first responsive design** with breakpoints:
  - `@media (min-width: 400px)` - Show full navigation
  - `@media (min-width: 720px)` - 2-column product grid
  - `@media (min-width: 1100px)` - 4-column product grid
  - `@media (min-width: 800px)` - 4-column footer layout
- **Reusable components**: buttons, feature cards, flip cards, bio badges
- **Fixed background sections** for visual effects

## Important Notes

- **No dependencies**: This project intentionally has no npm packages, no build tools
- **Pure vanilla JS**: All code uses standard ES6 features, no transpilation needed
- **No modules**: JavaScript files don't use import/export - just global functions
- **Load order matters**: Scripts must be loaded in order: cart.js → contact-form.js → product-filter.js → main.js
- **No email functionality**: Contact form validates but doesn't send emails (would require backend)
- **French language**: All user-facing text is in French

## Making Changes

When modifying functionality:
1. Edit the appropriate file in `js/` directory (e.g., `js/cart.js` for cart features)
2. Keep functions in the global scope (no modules/imports/exports)
3. Functions are called from `main.js` on DOMContentLoaded
4. Test by refreshing the browser - no build step needed
5. All functions check if required DOM elements exist before running (graceful degradation)
