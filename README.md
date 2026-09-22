# Instagram Pause

Instagram Pause is a Chrome Manifest V3 extension that interrupts an Instagram session after 30 minutes and asks whether the person wants to continue.

The product is a deliberate boundary, not a blocker. It preserves the current Instagram URL, gives the person a clear pause, and leaves the final decision with them.

On the backend, it simply sets a timer up once instagram is refreshed / opened for 30 minutes. Once the site has been open for that long, it force refreshes the site into a premade html that simply reminds you of what you are doing. You can go back but the cache is refreshed with Instagram

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

## The Break 1: Crash Log Experiment

The pause page is intentionally allowed to become a little unreasonable. Before it appears, the Instagram tab itself gets one last sci-fi failure: a content script places a temporary distortion layer over the current page, jitters the document through color-channel glitches, and announces that the session is unstable. Then the tab hands off to the pause page, where scanlines move across the terminal frame and the session report assembles line by line. After the noise settles, the result is a readable crash log for the site itself.

This is a deliberate break from the quiet boundary described above. It pushes the premise to its limit and asks what happens when a reminder does not just interrupt the feed, but makes the interruption feel like an event. The effect is local to the current tab, brief, and still lands on the same clear decision: return to Instagram or stay paused. Reduced-motion preferences skip the motion while keeping the report visible.

## The Break 2: Crash Log Experiment on instagran too

This time I want the break to happen on instagram as well as the website, make it look like the instagram site crashes as well as going to my disruption site. This pushed the js far beyond intended, but ultimately led to a mervelous output that I envisioned after the initial thought.

## Boundary

The extension only operates on `instagram.com` tabs. Leaving Instagram or closing a tab clears that tab's active timer. It does not inspect, collect, or transmit Instagram content.
