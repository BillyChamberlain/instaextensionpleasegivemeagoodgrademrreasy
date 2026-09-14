# Instagram Pause

A Chrome extension that starts a 30-minute timer whenever an Instagram tab is opened. When the timer ends, the tab is redirected to a pause page with a Continue button.

## Structure

- `manifest.json` - Chrome MV3 extension configuration
- `background.js` - tab timers, alarms, and redirects
- `content.js` - announces Instagram page loads
- `index.html` / `continue.js` / `style.css` - pause page

## Install in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select this folder.
4. Open Instagram in a tab.

The timer is set to 30 minutes in `background.js` and is scoped to each Instagram tab.
