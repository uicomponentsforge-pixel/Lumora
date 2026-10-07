# Lumora

Lumora is a modern landing page demo designed for SaaS platforms and business management tools. Built with pure HTML, CSS, and vanilla JavaScript, it features a clean design system, accessible navigation, interactive UI components, and fluid animations.

## Features

- **Responsive Design & Accessibility**: Fully responsive layout supporting mobile, tablet, and desktop viewports, complete with skip navigation link and ARIA accessibility attributes.
- **Header & Navigation**: Sticky header with backdrop blur effect, dynamic scroll shadows, active link highlighting, and a responsive mobile hamburger menu.
- **Hero & Visual Mockup**: Pure CSS dashboard visualization with float cards and dynamic animation effects.
- **Interactive Stats Counter**: Animated stat counters triggered on scroll via `IntersectionObserver`.
- **Pricing Switcher**: Interactive billing toggle supporting monthly and yearly pricing views.
- **FAQ Accordion**: Expandable FAQ items with keyboard accessibility support.
- **Contact Form Validation**: Client-side validation for form inputs with error indicators and success state handling.
- **Reduced Motion Support**: Respects system `prefers-reduced-motion` settings for enhanced accessibility.

## File Structure

```text
├── index.html   # Main HTML markup and semantic structure
├── style.css    # Design system, CSS variables, layout, and component styling
├── script.js    # Interactive features, scroll observers, and form validation
└── README.md    # Project documentation
```

## Getting Started

Since Lumora is built with vanilla web technologies, no build process or package installation is required.

### Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Open in browser**:
   Open `index.html` directly in your web browser or serve it using any standard local web server (e.g. VS Code Live Server or Python `http.server`):

   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` in your web browser.

## Technologies Used

- **HTML5**: Semantic elements and ARIA attributes
- **CSS3**: Custom properties (variables), Grid, Flexbox, animations, media queries
- **JavaScript (ES6)**: Modern DOM manipulation, event handling, and `IntersectionObserver` API
