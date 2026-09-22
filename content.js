chrome.runtime.sendMessage({ type: 'instagram-opened' });

const glitchDuration = 2800;

function glitchInstagram() {
	const glitchStyle = document.createElement('style');
	glitchStyle.textContent = `
		html.instagram-pause-glitching,
		html.instagram-pause-glitching body {
			overflow: hidden !important;
		}

		html.instagram-pause-glitching body {
			animation: instagram-page-glitch ${glitchDuration}ms steps(2, end) both !important;
		}

		.instagram-pause-glitch-overlay {
			position: fixed;
			z-index: 2147483647;
			inset: 0;
			pointer-events: none;
			background:
				repeating-linear-gradient(0deg, transparent 0 5px, rgba(255, 0, 70, 0.18) 6px 7px),
				linear-gradient(90deg, rgba(0, 255, 190, 0.16), transparent 28%, rgba(255, 0, 70, 0.16));
			mix-blend-mode: difference;
			animation: instagram-overlay-glitch ${glitchDuration}ms steps(2, end) both;
		}

		.instagram-pause-glitch-overlay::before,
		.instagram-pause-glitch-overlay::after {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			color: #fff;
			font: 700 clamp(16px, 4vw, 34px)/1 monospace;
			letter-spacing: 0.14em;
			text-align: center;
			text-shadow: 3px 0 #ff0046, -3px 0 #00ffbe;
		}

		.instagram-pause-glitch-overlay::before {
			content: 'CONNECTION UNSTABLE';
			clip-path: inset(43% 0 43%);
			animation: instagram-signal-slice 240ms steps(2, end) infinite;
		}

		.instagram-pause-glitch-overlay::after {
			content: 'SESSION INTERRUPTED';
			clip-path: inset(57% 0 25%);
			animation: instagram-signal-slice 310ms steps(2, end) infinite reverse;
		}

		@keyframes instagram-page-glitch {
			0%, 12%, 23%, 36%, 48%, 61% { transform: translate(0); filter: none; }
			13% { transform: translate(-8px, 2px) skewX(2deg); filter: hue-rotate(90deg) saturate(2); }
			24% { transform: translate(7px, -3px) skewX(-3deg); filter: contrast(2); }
			37% { transform: translate(-3px, 1px); filter: invert(0.12); }
			49% { transform: translate(10px, 0) skewX(4deg); filter: hue-rotate(-70deg); }
			62%, 100% { transform: translate(0); filter: none; }
		}

		@keyframes instagram-overlay-glitch {
			0%, 15%, 29%, 43%, 57% { opacity: 0; transform: translate(0); }
			16%, 18% { opacity: 1; transform: translate(-14px, 4px); }
			30%, 32% { opacity: 0.85; transform: translate(12px, -3px); }
			44%, 46% { opacity: 1; transform: translate(-5px, 1px); }
			58%, 70% { opacity: 0.9; transform: translate(4px, 0); }
			100% { opacity: 0; transform: translate(0); }
		}

		@keyframes instagram-signal-slice {
			0%, 100% { transform: translate(0); }
			25% { transform: translate(-8vw, 3px); }
			50% { transform: translate(6vw, -2px); }
			75% { transform: translate(-3vw, 1px); }
		}

		@media (prefers-reduced-motion: reduce) {
			html.instagram-pause-glitching body { animation: none !important; }
			.instagram-pause-glitch-overlay,
			.instagram-pause-glitch-overlay::before,
			.instagram-pause-glitch-overlay::after { animation: none; }
			.instagram-pause-glitch-overlay { opacity: 1; }
		}
	`;

	const overlay = document.createElement('div');
	overlay.className = 'instagram-pause-glitch-overlay';
	document.head.append(glitchStyle);
	document.documentElement.classList.add('instagram-pause-glitching');
	(document.body || document.documentElement).append(overlay);

	window.setTimeout(() => {
		chrome.runtime.sendMessage({ type: 'instagram-glitch-complete' });
	}, glitchDuration);
}

chrome.runtime.onMessage.addListener((message) => {
	if (message.type === 'instagram-glitch') glitchInstagram();
});