# Product environments

The project pages contain native, full-width slices of their products. They replace the separate screenshot walkthrough. The portfolio header stays available; the product colors, typography, navigation, forms, and state belong to the page itself.

- **Trato:** select a service, day, and time; reserve a test appointment; cancel it. Reservations remove overlapping availability, including the duration of the selected service.
- **Opinioteca:** choose a book, save it to a shelf, rate it, publish a note, and react to the note. Empty shelves and feeds explain how to populate them rather than inventing community activity.
- **Calmera:** add candles, open the basket, change quantities, and inspect totals calculated in cents. Finishing the demonstration does not submit an order.
- **Vwrks:** explore the captured pages inside the existing changing background. Its public website remains available for the complete portfolio.

Demo state is held in React and clears on reload. No booking, review, order, or payment is sent to the original products. Sample service prices and availability are identified in Trato. Book covers and candle photos come from the repository's real captures, displayed through SVG view boxes without changing the files.

Implementation lives in `src/components/project-cases/environments/`. Product data lives in `src/data/productDemos.js`; local state rules live in `src/utils/productDemos.js` and have behavior tests. No new dependency is required.

The floating scene-transfer layer was removed because it painted an opaque rectangle over adjacent scenes. Product captures now stay whole and contained; only the frame entrance and complete-frame replacement animate. Experience keeps its existing opacity choreography.

Automated tests, lint, and production build are required. Browser layout and motion verification remain separate: the current environment denies local listening sockets and prevents the installed browser from starting.
