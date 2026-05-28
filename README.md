# Interactive Portfolio — Ali Aiyman Khan

This is a small interactive single-page portfolio built with HTML, CSS, and plain JavaScript. It includes sliding carousels for Projects and Certifications and uses the AWS badge image in `assets/`.

Files added/changed:
- `index.html` — The portfolio page.
- `styles.css` — Styles for layout and interactivity.
- `script.js` — Small carousel logic and click handling for certification links.

How to use:
1. Open `index.html` in a browser.
2. Replace `PLACEHOLDER_CREDLY_URL` in the cert card's `data-credly-url` attribute with your actual Credly URL to make the badge link open the certificate.
3. Add project cards in the Projects carousel by editing the `.project-card` divs inside the Projects section.

Notes and next steps:
- The carousel is intentionally lightweight (no external libs). If you want touch-swipe support or pagination dots, I can add them.
- I used your provided AWS badge at `assets/aws-certified-solutions-architect-associate.png` as requested.
- I can also convert this to a responsive single-column hero like the sample image or add fancy typography and animations on request.
