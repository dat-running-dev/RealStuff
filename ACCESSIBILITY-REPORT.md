# Accessibility report: Chair Guide

## Summary
A small static site: a grid of nine chairs, a timeline of the same chairs, and one history page per chair. It also has an Accessibility mode switch in the header. Target: standalone pages. Eleven pages were checked for structure, names, reading order, hover and focus behaviour, and colour contrast. Four non-visual problems were found and fixed. Two suggestions that would change the look are listed under "Questions". No screen reader test has been run yet; the NVDA script below is for that.

## What changed (none of these change how the page looks)
| Problem for screen reader / keyboard / touch users | Fix | WCAG |
|---|---|---|
| Timeline gap labels ("59 years later") were hidden from screen readers, so the main point of the timeline (how far apart the chairs are) was silent. | Each gap now speaks as, for example, "59 years after the previous chair". The visible short label is hidden from screen readers so it is not read twice. | 1.3.1 Info and Relationships |
| In the page order the gap label came after the era label, but visually (phone and accessibility mode) it comes first, so spoken order and visual order differed. | The gap label now comes first in the page, matching what you see. | 1.3.2 Meaningful Sequence |
| The Accessibility mode button was spoken as "Accessibility mode:" with a stray colon. | Only "Accessibility mode" is spoken, followed by the pressed or not-pressed state. | 4.1.2 Name, Role, Value |
| A preview that appears on hover or focus could not be closed without moving the pointer or focus. | Escape closes it and focus stays where it was. It comes back when the pointer or focus leaves and returns. | 1.4.13 Content on Hover or Focus |
| In Accessibility mode the touch-and-hold code still blocked the phone's long-press menu and could swallow a tap after a long press, even though previews are already always visible. | The hold gesture and the menu block are switched off in Accessibility mode. | 2.5.1 Pointer Gestures, 2.1.1 Keyboard (no change to keyboard use) |

## Checked and passing (no change needed)
- **All 11 pages:** `lang="en"`, a unique title, exactly one `h1`, no skipped heading levels, one header, main and footer, every `nav` labelled, no duplicate ids, every image has an `alt`, every link and button has a name, no positive `tabindex`, nothing focusable inside `aria-hidden`, and every `aria-describedby` points at something that exists.
- **Chair tiles:** each is one link whose name is the chair name and designer and year. The one-line preview is exposed as the link's description and is not read twice.
- **Timeline:** a real ordered list of nine items. Years, dots and the decorative blur are hidden from screen readers; the era label and gap text are spoken. The sideways-scrolling area is a labelled region and becomes a keyboard stop only when it actually scrolls.
- **Drag bar:** hidden from assistive technology on purpose. Keyboard and screen reader users have the Earlier and Later buttons, the arrow keys, and tabbing through the chairs.
- **Motion:** no autoplay, no looping animation, no time limits. Smooth scrolling and fades are off when the system asks for reduced motion and in Accessibility mode.
- **Contrast (normal mode, computed):** body text 16.6:1; secondary text 7.0:1; links 6.8:1; dark theme 15.4:1, 7.7:1, 9.4:1.
- **Contrast (Accessibility mode, computed):** light: text 21:1, secondary 14.2:1, links 10.2:1, borders 7:1. Dark: text 21:1, secondary 15.3:1, links 14.3:1, borders 7.5:1.
- **Reflow:** no sideways page scroll on a 375px phone. The timeline becomes a vertical list below 700px.

## Visible changes (approved)
None made in this pass.

## Questions for the user
1. **Button borders.** The outlines on the Earlier / Later buttons and the Accessibility mode button are very faint in normal mode (about 1.5:1 against the page). They are still identifiable by their text, but a darker outline would be easier to see. Proposed change: use the secondary text colour for those borders. Recommendation: yes. It is a small visual change.
2. **Drag bar track.** The empty part of the bar is faint. The handle itself is clear (7:1). Optional: slightly darker track.

## Known limitations
- **No screen reader test yet.** Everything above was checked by reading the markup and the computed styles in a browser, not with NVDA. Run the script below.
- **Earlier / Later buttons are silent.** After a press, a screen reader user hears nothing about what moved. Tabbing through the chairs (which scrolls the line to each one) works well and is the better route. A short spoken update such as "Showing Wassily Chair to Egg Chair" could be added.
- **Touch-and-hold previews** and the drag bar were tested with simulated events and mouse input, not on a real phone.
- **Photos load from Wikimedia Commons.** If they fail to load, the page still works (tile images are decorative and every chair has its name and description in text), but the chair pages would show a broken image with its alt text.
- **Alt text** on the chair pages was written from the Wikimedia descriptions and a small preview of each photo, so details such as colours may be worth a human check.
- **Test settings:** the pane used for testing throttles animation while scripts run, so timing-based results were re-checked with screenshots.

## NVDA test script
Use Chrome or Firefox with NVDA. Press NVDA+M to turn mouse tracking off. Open the NVDA menu, then Tools, then Speech viewer to log what is said. NVDA key is Insert, or Caps Lock in the laptop layout. NVDA+Space switches between browse and focus mode.

**Grid page (index.html)**
1. Press Home. Expect: "Chair Guide, link", then "Views, navigation", "Grid, current page, link", "Timeline, link", then "Accessibility mode, toggle button, not pressed".
2. Press Enter on the toggle. Expect: "pressed". Press it again. Expect: "not pressed".
3. Press H. Expect: "Nine chairs, and where they came from., heading level 1", then each chair as "heading level 2".
4. Press Tab to the first tile. Expect: "Windsor chair English chairmakers, early 1700s, link", then, after a pause, its one-line preview. Sighted check: the preview strip shows over the photo.
5. Press Escape while on the tile. Expect: the preview strip disappears and focus stays on the link.
6. Press Enter. Expect: the Windsor chair page loads, with "Windsor chair, heading level 1".

**Timeline page (timeline.html)**
7. Press D (or arrow down) to the region. Expect: "Timeline of nine chairs, region".
8. Arrow down through the list. Expect: "list with 9 items", then for the second item: "about 140 years after the previous chair", "Industrial age", then the Thonet No. 14 link. Years and dots must not be read.
9. Press Tab through the chairs. Expect: each chair's link is reached in date order, and the line scrolls so the focused chair is in view.
10. Tab to "Later chairs, button" and press Enter. Expect: the line scrolls. (There is no spoken update; see limitations.)

**A chair page**
11. Press H. Expect: "Egg Chair, heading level 1", "History, heading level 2", "At a glance, heading level 2".
12. Press G. Expect: the photo with its description. Press Tab to the credit links ("CC BY-SA 4.0", "Wikimedia Commons") and the "Previous" and "Next" links.

**Accessibility mode**
13. Turn the mode on. Expect: text much larger and black on white (or white on black). On the grid, each chair's preview is plain text under its name. On the timeline, a plain vertical list with no buttons or bar.
14. Reload the page. Expect: the mode is still on and the button is still "pressed".

**Touch (on a real phone, not NVDA)**
15. On the grid, touch and hold a chair for about half a second. Expect: its preview appears and the page does not open. A quick tap should open the chair's page.
