# Accessibility report: Chair Guide

## Summary
A small static site. The home page is a timeline of nine chairs in date order, and each chair has its own history page. An Accessibility mode switch sits in the header of every page. Target: standalone pages. Ten pages were checked for structure, names, reading order, hover and focus behaviour, and colour contrast. Five non-visual problems were found and fixed earlier. The site was then simplified to the timeline alone (no grid, no on-screen buttons, no bar, no instructions), and re-checked. No screen reader test has been run yet; the NVDA script below is for that.

## What was fixed (none of these change how the page looks)
| Problem for screen reader / keyboard / touch users | Fix | WCAG |
|---|---|---|
| Timeline gap labels ("59 years later") were hidden from screen readers, so the main point of the timeline (how far apart the chairs are) was silent. | Each gap now speaks as, for example, "59 years after the previous chair". The short visible label is hidden from screen readers so it is not read twice. | 1.3.1 Info and Relationships |
| In the page order the gap label came after the era label, but visually (phone and accessibility mode) it comes first. | The gap label now comes first in the page, matching what you see. | 1.3.2 Meaningful Sequence |
| The Accessibility mode button was spoken as "Accessibility mode:" with a stray colon. | Only "Accessibility mode" is spoken, followed by the pressed or not-pressed state. | 4.1.2 Name, Role, Value |
| A preview that appears on hover or focus could not be closed without moving the pointer or focus. | Escape closes it and focus stays where it was. It comes back when the pointer or focus leaves and returns. | 1.4.13 Content on Hover or Focus |
| In Accessibility mode the touch-and-hold code still blocked the phone's long-press menu and could swallow a tap after a long press. | The hold gesture and the menu block are switched off in Accessibility mode. | 2.5.1 Pointer Gestures |

## Checked and passing (no change needed)
- **All 10 pages:** `lang="en"`, a unique title, exactly one `h1`, no skipped heading levels, one header, main and footer, every `nav` labelled, no duplicate ids, every image has an `alt`, every link and button has a name, no positive `tabindex`, nothing focusable inside `aria-hidden`, every `aria-describedby` points at something that exists, and no link points at a page that was removed.
- **Chair tiles on the timeline:** each is one link whose name is the chair name, designer and year. The one-line preview is exposed as the link's description and is not read twice.
- **Timeline:** a real ordered list of nine items. Years, dots and the decorative blur are hidden from screen readers; the era label and the gap text are spoken. The sideways-scrolling area is a labelled region and becomes a keyboard stop only when it actually scrolls sideways.
- **Ways to move along the timeline:** touch swipe, trackpad, the arrow keys, tabbing through the chairs (focus scrolls each chair into view), and dragging with the mouse. Dragging is a mouse extra only; nothing depends on it.
- **Motion:** no autoplay, no looping animation, no time limits. Fades are off when the system asks for reduced motion and in Accessibility mode.
- **Contrast (normal mode, computed):** body text 16.6:1; secondary text 7.0:1; links 6.8:1; dark theme 15.4:1, 7.7:1, 9.4:1.
- **Contrast (Accessibility mode, computed):** light: text 21:1, secondary 14.2:1, links 10.2:1, borders 7:1. Dark: text 21:1, secondary 15.3:1, links 14.3:1, borders 7.5:1.
- **Reflow:** no sideways page scroll on a 375px phone. The timeline becomes a vertical list below 700px.

## What Accessibility mode does
Larger text and spacing, black on white (or white on black in a dark theme), previews always visible as plain text under each photo, no animation, thicker focus outlines, always-underlined chair names, and the timeline as a plain vertical list with no sideways scrolling or dragging. It is saved on the device and starts on if the device asks for more contrast.

## Visible changes
Made at the owner's request in the simplification: the Grid and Timeline links, the hover and scroll instruction text, the Earlier and Later buttons, and the drag bar were removed, and the timeline became the home page.

## Questions for the user
1. **Button outline (decided: leave as is).** The outline on the Accessibility mode button is faint in normal mode (about 1.5:1 against the page). It is still identifiable by its text. A darker outline would be easier to see.

## Known limitations
- **No screen reader test yet.** Everything above was checked by reading the markup and computed styles in a browser, not with NVDA. Run the script below.
- **No visible cue that the timeline scrolls sideways.** With the instructions and the bar removed, the cue is the chair that is cut off at the right edge of the screen. This was a design choice; a mouse user who does not drag, or a person who does not notice the cut-off chair, may not discover the later chairs. Keyboard users find them by tabbing; touch users by swiping; Accessibility mode shows everything as a vertical list.
- **No on-screen control for a plain mouse wheel.** A mouse without sideways scrolling can drag the timeline, or press the arrow keys when the timeline is focused.
- **Touch-and-hold previews** were tested with simulated events, not on a real phone.
- **Photos load from Wikimedia Commons.** If they fail to load, the page still works (tile images are decorative and every chair has its name and description in text), but the chair pages would show a broken image with its alt text.
- **Alt text** on the chair pages was written from the Wikimedia descriptions and a small preview of each photo, so details such as colours may be worth a human check.

## NVDA test script
Use Chrome or Firefox with NVDA. Press NVDA+M to turn mouse tracking off. Open the NVDA menu, then Tools, then Speech viewer to log what is said. NVDA key is Insert, or Caps Lock in the laptop layout. NVDA+Space switches between browse and focus mode.

**Home page (the timeline)**
1. Press Home. Expect: "Chair Guide, link", then "Accessibility mode, toggle button, not pressed".
2. Press Enter on the toggle. Expect: "pressed". Press it again. Expect: "not pressed".
3. Press H. Expect: "Nine chairs, in order., heading level 1", then each chair as "heading level 2".
4. Press D (or arrow down) to the region. Expect: "Timeline of nine chairs, region".
5. Arrow down through the list. Expect: "list with 9 items", then for the second item: "about 140 years after the previous chair", "Industrial age", then the Thonet No. 14 link. Years and dots must not be read.
6. Press Tab through the chairs. Expect: each chair's link in date order, for example "Windsor chair English chairmakers, early 1700s, link", then, after a pause, its one-line preview. The timeline scrolls so the focused chair is in view.
7. Press Escape while on a chair. Expect: the preview strip disappears and focus stays on the link.
8. Press Enter on a chair. Expect: its page loads, with the chair's name as "heading level 1".

**A chair page**
9. Press H. Expect: "Egg Chair, heading level 1", "History, heading level 2", "At a glance, heading level 2".
10. Press G. Expect: the photo with its description. Press Tab to the credit links ("CC BY-SA 4.0", "Wikimedia Commons"), "Previous" and "Next", and "Back to the timeline".

**Accessibility mode**
11. Turn the mode on. Expect: text much larger and black on white (or white on black). On the home page each chair's preview is plain text under its name, and the timeline is a vertical list.
12. Reload the page. Expect: the mode is still on and the button is still "pressed".

**Touch and mouse (not NVDA)**
13. On a real phone, touch and hold a chair for about half a second. Expect: its preview appears and the page does not open. A quick tap should open the chair's page.
14. With a mouse on a desktop, press on the timeline and drag sideways. Expect: it scrolls with the mouse, and releasing over a chair does not open it. A plain click opens the chair.
