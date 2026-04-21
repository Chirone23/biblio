# Bibliò — UI Kit

High-fidelity recreation of the Bibliò platform in React/JSX. Open `index.html` in a browser to see an interactive click-thru across five core screens:

1. **Homepage** — hero, featured, categories, MyBibliò CTA
2. **Catalogo** — filters + book grid
3. **Scheda libro** — cover, metadata, buy vs. rent
4. **Area personale** — orders, rentals, wishlist, Plus toggle
5. **MyBibliò chat** — floating panel (accessible from every screen)

## Components

- `Shell.jsx` — top nav, floating MyBibliò launcher, shared layout
- `BookCard.jsx` — reusable catalog/featured tile
- `Home.jsx`, `Catalog.jsx`, `BookDetail.jsx`, `Account.jsx` — screens
- `MyBiblioChat.jsx` — the Claude-powered chat panel

Design tokens come from the root `colors_and_type.css`. No production dependencies beyond React 18 + Babel standalone.
