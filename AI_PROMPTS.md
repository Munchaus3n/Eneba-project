# AI Prompt History

This file records the prompts used with AI assistance during the assignment.

---

## Template (one entry per major task)

```markdown
### Entry N: [Short title]
- **Prompt (summary):** [What was asked]
- **Intent:** [Goal of the change]
- **Outcome:** [What was implemented]
```

---

## Entries

### Entry 1: Eneba-like UI from screenshot
- **Prompt (summary):** Make the UI closely match an Eneba-like search results page (purple theme) from a screenshot. Layout: purple background, darker topbar, centered search, right-side language/currency, "Results found: X", 4/2/1 responsive grid of cards. No backend/API or new libraries; prefer styles.css and minimal App.jsx classNames.
- **Intent:** Align React frontend with reference screenshot (colors, topbar, search, results count, card grid).
- **Outcome:** Updated styles.css with purple theme, grid layout, topbar styling; added platformTag class; content max-width and card structure.

### Entry 2: Visual polish and constraints
- **Prompt (summary):** Improve visual polish: constrain content width (max ~1280px) and center; typography hierarchy; consistent card height and image height (320–360px); border radius/shadow; media queries 4/2/1 and mobile paddings.
- **Intent:** Modern marketplace-style layout and responsive behavior.
- **Outcome:** CSS variables for content-max and card image height; grid 4/2/1 breakpoints; card flex layout and priceRow margin-top: auto; subtle shadow and hover.

### Entry 3: Header polish (Eneba toolbar)
- **Prompt (summary):** Polish header: search prominent and centered; subtle border and background transparency on input; right section aligned and not wrapping; consistent header height and spacing. CSS only (or minimal classNames).
- **Intent:** Match Eneba toolbar layout and search styling.
- **Outcome:** Topbar grid 1fr auto 1fr; search translucent background and border; right justify-self: end; fixed height 68px.

### Entry 4: UX improvements (loading, error, hover, focus)
- **Prompt (summary):** Add loading state (dim grid, show "Loading…"); error message styling; card hover (subtle lift/border); search focus style. No new libraries; minimal CSS/JSX.
- **Intent:** Improve perceived responsiveness and accessibility.
- **Outcome:** Grid class `is-loading` when loading (opacity, pointer-events); .err pill styling; .card hover transform and shadow; .search:focus outline.

### Entry 5: Local game cover images and static serving
- **Prompt (summary):** Use local game cover images: server/public/images, serve at /images via Express; update server.js static serving without breaking /list; seed image_url as /images/fifa23.jpg, rdr2.jpg, split-fiction.jpg. No frontend logic change except to display images.
- **Intent:** Self-contained assets and no external image dependencies.
- **Outcome:** express.static for /images; seed.js image_url paths; frontend already uses image_url (with localhost:3000 base when needed).

### Entry 6: Exact layout and full-width fix
- **Prompt (summary):** Make layout exact to screenshot: full-width content (no dead zone); promo bar; white/translucent search; flag + language + icons on right; "From €X -Y%" with strikethrough only on old price; discount in green; report link. Then fix "not full width" by removing content max-width and ensuring #root/body don’t constrain width.
- **Intent:** Pixel-close match and full viewport width.
- **Outcome:** Promo bar, flag icon, originalPriceLine with oldPrice (strikethrough) and discount (green); #root and body overrides for full width; App.css #root updated.

### Entry 7: Toolbar exact like picture
- **Prompt (summary):** Make toolbar exact like picture: deep dark purple (#38006b), full width; wide frosted search; flag (Lithuanian stripes) + "English EU | EUR" + heart + cart + avatar on right.
- **Intent:** Final toolbar visual match.
- **Outcome:** --topbar #38006b; search max-width 640px, frosted style; flagIcon gradient (yellow/green/red); right section spacing and icon sizes.
