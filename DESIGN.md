---
name: "Kotsu"
description: "A cobalt expedition atlas for connected Japanese learning."
colors:
  primary: "#2849d8"
  primary-hover: "#1937b3"
  ink: "#182c51"
  muted: "#53647c"
  ground: "#f6f8fc"
  map-ground: "#edf2fb"
  line: "#d8e1ef"
  selected: "#d94632"
  selected-ring: "#f4d6cf"
  selected-text: "#a32e1f"
  complete: "#287050"
  complete-ground: "#e7f1eb"
  active-ground: "#e7ecfc"
  white: "#ffffff"
  correct-ground: "#e4f2e9"
  correct-text: "#205c41"
  incorrect-ground: "#ffebe6"
  incorrect-border: "#b83520"
  incorrect-text: "#9b2e1d"
typography:
  display:
    fontFamily: "Manrope, Noto Sans JP, sans-serif"
    fontSize: "clamp(36px, 3.9vw, 62px)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-.045em"
  headline:
    fontFamily: "Manrope, Noto Sans JP, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    letterSpacing: "-.04em"
  stop-title:
    fontFamily: "Manrope, Noto Sans JP, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-.04em"
  body:
    fontFamily: "Manrope, Noto Sans JP, sans-serif"
    fontSize: "15px"
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, Noto Sans JP, sans-serif"
    fontSize: "14px"
    fontWeight: 700
  study-character:
    fontFamily: "BIZ UDPGothic, sans-serif"
    fontSize: "144px"
    lineHeight: 1.5
  station-character:
    fontFamily: "BIZ UDPGothic, sans-serif"
    fontSize: "33px"
  chapter-character:
    fontFamily: "Shippori Mincho, serif"
    fontSize: "28px"
rounded:
  control: "5px"
  surface: "6px"
  study: "8px"
  legacy-search: "12px"
  checkpoint: "15px"
  circle: "50%"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 20px"
    width: "100%"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  answer-option:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px"
  station:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.circle}"
    size: "72px"
  station-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.white}"
  preview:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    height: "195px"
  learning-table:
    rounded: "{rounded.study}"
  search-field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.legacy-search}"
    padding: "10px 16px"
  common-chip:
    backgroundColor: "{colors.complete}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
---

# Design System: Kotsu

## Overview

**Creative North Star: "The Cobalt Expedition Atlas"**

The cobalt expedition atlas makes learning paths visible. Cool paper, blue ink, coral location marks, and green completion marks give each state a clear role. Japanese characters are the main visual landmarks. Compact controls and strong Manrope headings keep the course easy to scan.

The map, practice screen, field guide, and shared navigation use this system. Existing character, recipe, lookup, and profile pages keep their structures and inherit the new shared colors and display font. This record describes the source build; it does not claim that every older component has been redesigned. No raster assets ship with this redesign.

**Key Characteristics:**

- Connected routes with visible branch and join points.
- Large Japanese characters with clear English labels.
- Flat surfaces, fine rules, and compact controls.
- Progress shown through color, text, line style, and SVG badges.

## Colors

The palette uses cool paper and blue ink, with separate accents for location and progress. The frontmatter contains the normative values.

### Primary

Cobalt (`primary`) identifies available stations, main actions, active navigation, the study field, and the selected-stop preview. `primary-hover` darkens main actions on hover.

### Secondary

Coral (`selected`) marks the station currently in view. Its pale outer ring and dark label use `selected-ring` and `selected-text`.

### Tertiary

Green (`complete`) marks earned routes, completion stamps, and completed previews. Pale green supports completion and correct-answer feedback. Incorrect answers use the separate red feedback colors, with explanatory text.

### Neutral

Cool paper (`ground`) is the main canvas. `map-ground` carries the dotted map. Ink and muted blue-gray separate primary text from supporting text. Fine lines divide regions. White supports reverse text and answer buttons. `active-ground` marks the current chapter and answer hover.

**The State Color Rule.** Use cobalt for available actions, coral for the selected location, and green for earned progress. Keep text or a shape cue with each state.

Existing category aliases remain in use: hiragana uses `--color-shu` (#c53f2c), katakana uses `--color-ai`, radicals use `--color-matcha`, kanji uses `--color-fuji` (#7050ac), and vocabulary uses `--color-asagi` (#166e7d). These support the retained detail pages; they do not replace map state colors.

## Typography

**Display and body:** Manrope, with Noto Sans JP and sans-serif fallbacks. **Study characters:** BIZ UDPGothic. **Japanese chapter marks:** Shippori Mincho, with a serif fallback.

The display is broad and direct. Tight heading spacing contrasts with small, calm interface labels. Use the exact roles in the frontmatter for the main hierarchy. Practice headings use the headline role; selected-stop headings use the stop-title role. Supporting prose uses 13–15px type with line height 1.8. Main action and navigation labels use 14px at weight 700. Compact metadata varies from 10–12px on desktop.

The field-guide heading uses `clamp(32px, 5vw, 52px)`, weight 800, and letter spacing -.04em. Study meanings use 26px, weight 800, line height 1.3. Long study words use `clamp(32px, 4.8vw, 58px)` to fit the field. The result heading uses 42px, weight 800, line height 1.15.

At 720px and below, the journey heading uses `clamp(31px, 8vw, 44px)`, practice headings use 27px, study characters use 100px with line height 1.4, and long words use 36px. Some mobile metadata is 9px; this is a compact implementation detail, not a target for future body text.

**The Character Landmark Rule.** Use BIZ UDPGothic for study characters and route stations. Keep the character separate from the smaller interface label.

## Layout

The map page has a maximum width of 1660px and horizontal padding of 4vw, changed to 60px from 1600px. Its desktop workspace has a 190px chapter index, a flexible map, and a 285px stop panel. Fine borders join these regions. The index and stop panel are sticky with a 24px top offset. The map uses a 2300px vertical canvas with a 20px dot grid. Its SVG paths follow the actual course dependencies.

At 1200px and below, the side columns become 155px and 250px. At 1049px and below, the chapter index moves above a two-column map and 300px panel. At 720px and below, the order is chapter index, map, then stop details. The map scroll area is at most 600px high. Selecting a stop brings its details into view; a return link leads back to that stop. Page padding becomes 20px.

Practice and field-guide pages use a 1100px maximum width and 32px horizontal padding. Practice pairs equal study and answer columns, with a 440px minimum table height. These columns stack at 720px. Recipe rows change from two columns to one at the same breakpoint. The shared header is 81px high on desktop; mobile navigation wraps into a separate 46px row.

The inherited spacing scale is in the frontmatter. New layouts also use observed intermediate gaps of 6px, 10px, 12px, 20px, 28px, 32px, and 36px where the content needs them.

## Elevation & Depth

New atlas surfaces are flat. Color fields, thin dividers, dotted ground, and route strokes give structure. The selected station has a pale outline (5px) with a 5px offset. There is no new drop-shadow scale. The retained search field and result overlays still use older shadows and focus effects; these are not the default for new atlas surfaces.

**The Flat Atlas Rule.** Use fills, borders, and route lines to separate the new atlas surfaces. Selection rings show state; they are not drop shadows.

## Shapes

Small rounded corners keep rectangular controls clear: actions and answers use 5px, previews and active chapter links use 6px, and the study table uses 8px. Stations are circles (72px on desktop, 60px on mobile). Checkpoints use a 62px square with a 15px radius. Completion stamps are circles (110px). The retained search field uses 12px corners; its result tags use full pills.

## Components

### Buttons

Main actions are cobalt with white text, full width, and padding of 16px 20px. A shared SVG arrow sits opposite the label. Hover darkens the fill over 180ms. Focus uses a coral outline; the global focus rule supplies 3px width and 5px offset. Restudy and return actions use small text links with underlines or clear route labels.

### Answer options

Answers use white fill, a thin blue-gray border, 5px corners, 12px padding, and a minimum height of 58px. They sit in two columns with a 10px gap. Hover uses pale blue. Correct answers use pale green, dark green text, and an SVG check. Incorrect answers use pale red and explanatory feedback. A correct answer disables further selections.

### Cards / Containers

The selected-stop preview is a solid cobalt field, changed to green on completion. It holds a large Japanese character, location number, chapter label, and a fine path line. The study table uses one enclosing border and two tonal fields. Field-guide collections use divided rows rather than separate floating cards.

### Inputs / Fields

The field guide retains WordSearch. Its header variant uses the shared paper and divider colors, 12px corners, and padding of 10px 16px. Input text is 16px, rising to 18px at 768px. A cobalt caret and the inherited focus-within border identify input focus. The search result overlay retains its older rounded rows and shadows. Its text glyph controls and older effects are not new atlas rules.

### Chips

Retained search results use compact pill tags. The common-word tag has a green fill and white text; other tags use fine borders and muted text. These are reference metadata, not course-progress controls.

### Navigation

The header pairs the existing Niko logo with a compact Manrope name. Desktop links use 14px text at weight 700. The current page has cobalt text and a 3px bottom border. Mobile links use 12px text in a full-width row. Links and buttons use the shared keyboard-focus treatment; no separate navigation hover effect is defined.

### Route stations and progress

Available stations have cobalt borders. Locked stations have dashed borders, muted characters, and SVG lock badges. Completed stations have green borders, pale green fill, and check badges. Selection changes the station to coral with a pale ring while keeping its progress badge. Locked route lines are dashed (2px, dash pattern 5 6); earned lines are solid green (3px). Checkpoints use a square silhouette. The overall progress bar is 5px high; session segments are 4px high.

Station fill and border changes take 180ms. Smooth scrolling supports map movement. Reduced-motion preferences remove smooth scrolling and reduce transitions and animations to .01ms for one iteration. Interface arrows and checks use the shared 18px inline SVG RouteIcon with a 1.7px rounded stroke.

## Do's and Don'ts

### Do:

- Do use the shared atlas variables for new surfaces.
- Do show locked paths with dashed borders and a lock badge, and completed paths with a check badge and solid lines.
- Do use the shared SVG RouteIcon for interface arrows and checks.
- Do keep visible keyboard focus and reduced-motion behavior.
- Do retain a clear return path between practice, the selected stop, and the map.

### Don't:

- Don't use coral as the completion color.
- Don't use a color change as the only progress signal.
- Don't copy older neon effects or text glyph controls into new atlas components.
- Don't treat the retained detail-page structures as a new atlas layout standard.
