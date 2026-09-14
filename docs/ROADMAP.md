# Roadmap

## Current: Core Interruption

- Ship the MV3 manifest and Instagram match patterns.
- Start one 30-minute alarm per Instagram tab.
- Redirect expired sessions to the pause page.
- Preserve the return URL and support explicit continuation.
- Document installation and short-timer testing.

## Next: Trustworthy State

- Prevent duplicate timer resets during ordinary page navigation within the same Instagram tab.
- Add a visible remaining-time indicator in the extension popup or badge.
- Handle service-worker restarts and browser restarts with an intentional persistence policy.
- Add automated tests for entering Instagram, leaving it, expiry, tab closure, and Continue.

## Later: User Control

- Add an options page for a user-selected session length.
- Add an optional daily session limit without making it the default.
- Provide an accessible pause-page focus state and keyboard flow.
- Make reset and extension-disable behavior easy to understand.

## Non-goals

- Content analysis or surveillance.
- Permanent blocking.
- Cross-site activity tracking.
- Engagement optimization.