# Prompts

This document is the product and implementation prompt for Instagram Pause.

## Product Prompt

Build a Chrome MV3 extension that begins a 30-minute timer whenever a person opens or navigates to Instagram. When the timer expires, redirect that tab to a calm, direct pause page that says the person has been on Instagram for 30 minutes and asks whether they wish to continue.

The page must offer one obvious Continue action. Continuing returns the person to the Instagram URL they were using before the interruption. Leaving Instagram or closing the tab must clear its timer.

## Engineering Prompt

- Use a service worker for alarms and tab lifecycle events.
- Keep state scoped to the tab.
- Store only the return URL required for continuation.
- Match Instagram subdomains without affecting unrelated sites.
- Use Chrome storage and alarms APIs rather than a page-only `setTimeout`.
- Keep the pause page self-contained and readable at mobile and desktop widths.

## Voice Prompt

Be plain, respectful, and nonjudgmental. The interruption should feel like a useful question, not a reprimand. Avoid guilt, urgency tricks, dark patterns, and claims that the system knows what is best for the person.
