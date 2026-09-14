# Instagram Pause

Instagram Pause is a Chrome Manifest V3 extension that interrupts an Instagram session after 30 minutes and asks whether the person wants to continue.

The product is a deliberate boundary, not a blocker. It preserves the current Instagram URL, gives the person a clear pause, and leaves the final decision with them.

## Install

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Select **Load unpacked**.
4. Choose this project folder.
5. Open an Instagram tab.

## Test

For a quick test, temporarily change `SESSION_MINUTES` in `background.js` to `0.1`, reload the extension, and open Instagram. This triggers the pause after about six seconds. Restore `30` when finished.

## Runtime pieces

- `manifest.json` declares the MV3 service worker, permissions, Instagram match patterns, and pause-page assets.
- `content.js` announces an Instagram page to the service worker.
- `background.js` owns tab-scoped alarms, stores the last URL, and redirects to the pause page.
- `index.html`, `continue.js`, and `style.css` form the pause and continuation experience.

## Boundary

The extension only operates on `instagram.com` tabs. Leaving Instagram or closing a tab clears that tab's active timer. It does not inspect, collect, or transmit Instagram content.
