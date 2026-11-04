# Scroll assembly

Direction approved by the owner: lines, text, and images fit into place as the visitor scrolls.

Design read: an authored portfolio for product teams, recruiters, and clients, with an editorial and operational visual language. ENERGY 3 / RHYTHM 3 / MOTION 3.

## Decisions

- Draw the actual panel edges in sequence to make the existing layout's structure visible. The lines occupy no document space and cannot shift content.
- Assemble the EF signature during the first portion of the opening scene. The headline and contact links are immediately readable, while the signature resolves as the visitor scrolls.
- Let project titles, media, and supporting copy enter on separate intervals. The composition finishes before the pinned reading interval begins.
- Keep screenshot dimensions fixed and reveal incoming images above a permanent first frame. This avoids an empty canvas during scene changes.
- Use clipping and translation for construction. Experience retains its separate opacity choreography.
- Retain the existing project palettes, media, bilingual copy, and Vwrks background rather than introducing unrelated visual assets.
- Render the complete composition on narrow screens and with reduced motion. Keyboard focus also removes clipping from interactive groups.
- Keep the footer at a visible viewport's height to give the assembled page a clear ending.

## Verification

- Existing automated tests pass.
- ESLint passes without warnings.
- Vite production build passes.
- Diff whitespace check passes.
- Browser verification is pending: Vite started through the approved command, but the preview could not be reached from the isolated checks and the browser process failed to start. No visual approval is claimed.

## Product environments revision

The owner clarified that each product should take over part of the portfolio itself, with useful interactions. A separate browser shell and screenshot hotspots were rejected.

- Trato uses its dark booking language, service selection, appointment times, and an agenda that changes after a reservation. The empty agenda contains no invented customer records. Sample services and availability are identified.
- Opinioteca uses actual book imagery, a blue reading interface, a shelf, ratings, and a feed populated only by the visitor's own notes. Counts come from local interactions rather than fabricated activity.
- Calmera uses its candle photography, serif titles, shop colors, and a working basket. Totals are calculated from quantities, and the native basket dialog has keyboard and Escape behavior.
- Vwrks retains the lower-page pastel color loop and its own visual archive. The portfolio navbar remains independent.
- These environments extend to the page edges. There is no preview toolbar, miniature browser, or floating transition rectangle.
- Complete screenshots stay in their frames. Supporting text uses short travel distances; the product controls remain stable while being used. Opacity choreography remains limited to Experience.
- Demo state is local and reversible. This is explained at the point where a visitor may otherwise expect a real reservation, public post, or purchase.

Behavior tests cover booking conflicts and cancellation, shelf/review/reaction state, cart arithmetic, image sources, and native controls in both languages. Browser verification remains pending due to the environment restriction described above.
