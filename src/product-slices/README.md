# Product screens

These demos render components copied from the product repositories. The portfolio supplies local data and the React/Vite bridge; the product components supply the markup, classes, controls, icons and responsive layout.

| Product | Source revision | Screen used |
| --- | --- | --- |
| Trato | `62ec57c` | `app/agendar/[id]/BookingClient.tsx`, original buttons, cards and dialogs |
| Opinioteca | `9649f1e` | Header, Main, MenuEsquerdo, Feed, PostCard, ComentarioComposer and discovery sections |
| Calmera | `f802c31` | StoreNav, StoreRecipeGrid and StoreCartDrawer; catalog headings adapted from the server page |
| Vwrks | `8a36693` | Trabalho, Sobre, NavBar, SequenceImage and original project data |

`upstream/sources.json` records each copied file's original location. Files in `upstream` remain unchanged. The build bridge resolves Next links, images, navigation, authentication and data access without changing those copies. Source screens remain in Portuguese, as in the products. The portfolio instructions and controls use its selected language.

Each screen lives in a ShadowRoot. Its Tailwind 4 theme cannot change the portfolio's Tailwind 3 styles. A shared browser window contains the interactive screen, with its own scrolling region, local back/forward history, address display and restart control. The window uses the portfolio's paper/type palette; each product keeps its own interface. There is no iframe, detached screenshot assembly or screenshot overlay.

`DemoBrowserNavigation` shares local history with the compiled Next navigation bridge. Changing a product page resets only the inner scroll. Restart clears that product's demo data and history. Radix portals stay inside the product theme; dialogs inside the browser are nonmodal so browser controls and portfolio navigation remain usable. Vwrks document queries target its own surface.

The scrolling element is `[data-browser-scroll]` inside the ShadowRoot. Portals are its siblings, anchored to the stationary outer browser viewport. Making the outer viewport scroll moves fixed drawers with the content and breaks the cart after scrolling. The image adapter also preserves explicit `loading="eager"` requests from the original Vwrks sequences, including Plena's five frames.

The demos support service/professional/date/time selection and a local booking confirmation; review votes, comments and discovery navigation; catalog search, adding/removing items and shopping-bag quotations; and the original Vwrks work/about navigation and hover sequences. Unsupported product routes open the real product in a new tab. Account-dependent actions explain the demo's scope. Nothing submits to a production API or stores personal data. Restart clears the local session.

The Trato date picker is a small compatibility implementation: its `react-day-picker` dependency is unavailable in this workspace. The booking wizard, service cards, professional selection, totals and confirmation are the original components. Product authentication, subscriptions, payments, uploads, moderation and checkout are outside this embedded slice.

Gabarito, Nunito/Raleway, Inter Tight, Monocraft and Editorial New are copied from their original projects. Calmera's Montserrat and Libre Baskerville are hosted locally from the official Google Fonts repository, with their OFL licenses alongside the binaries. Candle photos and book covers come from the existing product captures, through SVG viewports. Vwrks images and logos are copied from its public assets with the original project credits.

## Build and maintenance

`generated` contains the compiled modules, scoped product styles and third-party version/license inventory. They are checked in so a normal `pnpm install --frozen-lockfile && pnpm run build` works without access to sibling repositories. The license inventory also ships at `/product-slices/third-party-licenses.json`. React, ReactDOM and Motion remain shared with the portfolio. Product modules are loaded only on their corresponding case page.

Regenerate with `pnpm run build:product-slices`. The script uses the portfolio's installed esbuild/PostCSS and the sibling `calmera-os/node_modules` for the original UI packages and Tailwind 4 compiler. Set `PROJECTS_ROOT` when the sibling repositories are elsewhere. Network restrictions in the editing environment prevented installing these packages through the portfolio's package manager; the generated snapshot makes that limitation explicit and reproducible.

Updating a snapshot requires rebuilding, reviewing `generated/licenses.json`, auditing the source dependencies, running the portfolio checks, and exercising the affected screen. The portfolio's pnpm audit does not inspect packages embedded in these generated modules. Do not edit generated output or dependency locks by hand.

Behavioral tests cover the original response shapes, vote changes, comment persistence, cart quotations, server isolation, bilingual demo instructions and original screen controls. Browser review also checks geometry and working actions on desktop and narrow viewports. Local browser fixtures use file bundles because this environment rejects localhost servers; HTTP route delivery remains a separate deployment check.
