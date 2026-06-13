# AGENTS.md

## Technical Stack Requirements

Use the following stack and structure for the Yangzhou Jingyi Electromechanical company website:

- Prefer Next.js or React + Vite.
- Use TypeScript.
- Use Tailwind CSS.
- Build a responsive layout compatible with desktop, tablet, and mobile.
- Store image assets under `/public/assets`.
- Extract product data into `/src/data/products.ts`.
- Keep pages componentized so products and multilingual content can be added later.
- The first version does not need a complex backend.
- The contact form can be frontend-only in the first version, but reserve an API structure for future submission handling.

## Execution Instructions

Develop the first version of the Yangzhou Jingyi Electromechanical Co., Ltd. corporate website according to `docs/website-brief.md`.

Prioritize:

1. Project initialization
2. Page routing
3. Shared Header/Footer layout
4. Homepage
5. Product center and product detail pages
6. About page
7. Connector machining solutions page
8. Innovation and patents page
9. Certificates and honors page
10. Contact page

During development:

- Keep code modular.
- Keep styling consistent.
- Ensure strong responsive behavior.
- Put product parameters in an independent data file for easier maintenance.
- Use placeholder paths under `/public/assets` for images first; these will later be replaced with high-resolution equipment, certificate, and factory images.
