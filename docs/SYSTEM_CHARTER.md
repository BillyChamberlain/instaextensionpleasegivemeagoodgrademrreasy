# System Charter

This system is designed to be a stopper for instagram. Most stoppers are designed only for phones and mobile devices, but few stop it on a browser. This system will set a 30 minute timer once instagram is opened, and then will pop up the screen asking if you want to continue.

## What This System Means

Instagram Pause is a consent-preserving interruption system. It marks 30 minutes of activity on Instagram, creates a moment to stop, and asks the person to make a fresh decision before returning.

The timer is a prompt, not a punishment. The pause page is a boundary, not a dead end. Continuing is always available, and the person's current Instagram location is preserved so the decision does not destroy their context.

## The Two Forces It Holds In Tension

### Attention and Autonomy

The system protects attention by interrupting an uninterrupted session. It protects autonomy by making the interruption transparent, reversible, and user-directed. Neither force wins completely: a timer with no continuation path becomes coercive, while a continuation path with no meaningful interruption becomes decorative.

The implementation must keep both forces visible in its behavior:

- Start one timer per Instagram tab.
- Interrupt at 30 minutes with a clear pause page.
- Preserve the last Instagram URL.
- Let the person continue with one explicit action.
- Clear the timer when the tab leaves Instagram or closes.

## What We Refuse

- We do not silently block Instagram forever.
- We do not hide, delay, or sabotage the Continue action.
- We do not inspect, store, or transmit Instagram content.
- We do not track activity across unrelated sites.
- We do not pretend that a timer removes the person's responsibility or choice.
- We do not add manipulative language, shame, or fear to the pause.

## Operational Contract

The service worker owns timers because page scripts can be discarded or reloaded. Session state is scoped to a tab and contains only the URL needed to return the person to Instagram. The content script only announces that an Instagram page opened. The pause page communicates with the service worker to continue.

## Change Test

Every future feature should answer two questions:

1. Does this create a more useful moment of attention?
2. Does this preserve a clear, informed choice?

If it strengthens one by undermining the other, it does not belong in this system without a compelling reason and an explicit charter update.
