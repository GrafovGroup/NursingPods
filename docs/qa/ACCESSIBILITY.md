# Accessibility verification and remaining manual checks

The implementation uses native headings, landmarks, labeled inputs, required/invalid states, linked field errors, a focusable error summary, visible focus, a skip link, disclosure-based FAQs, equivalent-language navigation, reduced motion and responsive layouts. The mobile menu exposes its expanded state, closes on Escape and returns focus to its toggle. A table region supports horizontal scrolling by keyboard when comparison columns exceed the viewport.

Automated command: `node scripts/accessibility-check.cjs` with a production server running. The runner checks representative EN/FR home, catalogue, product, industry, location and quote pages at desktop/mobile sizes with axe WCAG 2 A/AA, 2.1 AA and 2.2 AA tags. It also tests French validation focus and equivalent-page language navigation. Config responses are mocked only for client validation; no inquiry is submitted.

Automated checks cannot certify WCAG conformance. Before public launch, a person should:

- Use VoiceOver/Safari and NVDA/Firefox or Chrome to navigate headings, landmarks, the mobile menu, form labels, errors and comparison table.
- Complete the consent/validation flow using keyboard only, with no mouse.
- Check zoom at 200% and 400%, large text, contrast preferences and reduced motion on real devices.
- Verify the language switch announces the destination language and retains the equivalent content page.
- Check form error recovery and a genuinely authorized provider acceptance flow with a screen reader.
- Confirm the approved supplier images have descriptive alt text and any future product details do not claim unverified accessibility compliance.

Results and remaining limitations are recorded in the phase report and final report. No accessibility certification is claimed.
