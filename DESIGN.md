---
version: "alpha"
name: "Kotsu"
description: "Japanese learning interface that mixes refined literary type with Tokyo neon accents and disciplined monochrome foundations."
colors:
  primary: "#080808"
  secondary: "#5a5a5a"
  tertiary: "#ff5f1f"
  background: "#ffffff"
  surface: "#f7f7f7"
  surface-strong: "#eeeeee"
  border: "#e4e4e4"
  on-background: "#080808"
  on-primary: "#f5f5f5"
  hiragana: "#ff5f1f"
  katakana: "#0091ff"
  radicals: "#00c070"
  kanji: "#bf4fff"
  vocabulary: "#00c8ff"
  sakura: "#ff3d9a"
  kitsune: "#ff8c00"
typography:
  display-xl:
    fontFamily: "Cormorant Garamond"
    fontSize: 4rem
    fontWeight: "700"
    lineHeight: 1
    letterSpacing: -0.03em
  display-jp:
    fontFamily: "Shippori Mincho"
    fontSize: 4.5rem
    fontWeight: "700"
    lineHeight: 1
    letterSpacing: -0.02em
  headline-md:
    fontFamily: "Cormorant Garamond"
    fontSize: 2rem
    fontWeight: "700"
    lineHeight: 1.1
  body-md:
    fontFamily: "Noto Sans JP"
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.6
  body-italic:
    fontFamily: "Cormorant Garamond"
    fontSize: 1.25rem
    fontWeight: "500"
    lineHeight: 1.4
  label-caps:
    fontFamily: "Noto Sans JP"
    fontSize: 0.75rem
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: 0.2em
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  sidebar-width: 260px
elevation:
  flat: "none"
  soft: "0 4px 14px rgba(8, 8, 8, 0.05)"
  neon: "0 0 16px rgba(255, 95, 31, 0.2)"
shadows:
  glow-orange: "0 0 20px rgba(255, 95, 31, 0.25)"
  glow-blue: "0 0 20px rgba(0, 145, 255, 0.25)"
  glow-violet: "0 0 20px rgba(191, 79, 255, 0.25)"
motion:
  standard: "200ms cubic-bezier(0.25, 0.1, 0.25, 1)"
  spring: "500ms cubic-bezier(0.34, 1.56, 0.64, 1)"
  expressive: "700ms cubic-bezier(0.16, 1, 0.3, 1)"
components:
  app-shell:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-background}"
    padding: "{spacing.lg}"
  nav-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    padding: "{spacing.lg}"
  column-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    height: 60px
    padding: 0 20px
  progress-bar:
    backgroundColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
---

## Overview
Kotsu should feel like disciplined Japanese study material with a pulse of Tokyo night energy. The base is hard white, hard black, calm structure, and deliberate spacing. The excitement comes from precise shots of neon color tied to learning categories and progress moments.

It is not maximalist anime UI. It is not Duolingo. It is restrained, elegant, mobile-first, and sharp, with just enough nightlife electricity to feel memorable.

## Design Context

### Users
Kotsu is for Mager first, but it should work for anyone learning Japanese, especially early learners, returning learners, and travelers preparing for Japan. Most sessions should be short, phone-first, and easy to re-enter.

### Brand Personality
Calm, focused, quietly electric.

The interface should feel confident and art-directed without becoming loud. It should be warm enough for beginners, serious enough for repetition, and visually distinctive enough to stay memorable.

### Aesthetic Direction
Think editorial study object, Tokyo transit signage, refined flashcard cabinet, and modern language-learning tool. The product should feel distilled rather than gamified, with excellent typography, clear information hierarchy, and selective use of color.

### Design Principles
1. Teach from atoms to meaning.
2. Make progress feel navigable.
3. Optimize for short, repeatable phone sessions.
4. Balance Japan-now usefulness with long-term literacy.
5. Keep the energy restrained.

## Colors
The foundation is almost monochrome. White paper backgrounds, black ink text, pale dividers, and subtle gray surfaces create the feeling of a serious tool. Neon accents should act like highlighters, route markers, or underglow — never like full-screen decoration.

Each learning column owns a distinct color. Those hues should stay stable across navigation, progress, and categorization so the product feels teachable at a glance.

## Typography
Typography is doing double duty: cultural texture and clarity. Cormorant Garamond gives the product literary elegance. Shippori Mincho gives Japanese headlines ceremonial weight. Noto Sans JP handles interface utility and long-form legibility.

The headline model is expressive serif English, bold Japanese centerpiece, then quieter utility text. Avoid generic sans-serif-only hierarchy.

## Layout & Spacing
Use a clean split-pane learning layout on desktop and a stacked, scrollable structure on mobile. Navigation should feel like a well-organized study cabinet, while the main content can breathe more.

Spacing should be generous enough to make learning calm, but not so roomy that the interface loses momentum. Every screen should help the learner re-orient quickly.

## Elevation & Depth
Depth is mostly created through contrast, not shadow. In light mode, the system should feel nearly flat. In dark mode, neon glows and scanline textures can come forward slightly to create a late-night street-tech atmosphere.

Motion can feel springy and alive on hover, reveal, and progress moments, but it should never distract from studying.

## Shapes
Use rounded rectangles with a modern but controlled radius. Pills and large radii are appropriate for search, tags, and progress affordances, while cards and navigation items should stay structured and sturdy.

## Components
Search should feel soft and inviting. Category cards should feel collectible and color-coded. Progress bars can take on the brightest gradients because they represent momentum and reward.

The sidebar is not an admin nav. It should feel like a curated index of study tracks. Course maps and lesson cards should help the learner feel both local progress and larger direction.

## Japan Mode
Kotsu should support immediate travel usefulness without collapsing into phrasebook mode. Use vocabulary, labels, and examples that help a learner feel more capable in Japan now, while preserving the radical-first model that makes future kanji learning compound.

## Do's and Don'ts
Do pair monochrome structure with electric category accents.
Do let Japanese typography feel prominent and proud.
Do optimize for calm, fast, repeatable study on a phone.
Do make each lesson feel connected to a larger route.

Don't turn every surface into a neon object.
Don't make the layout feel like a gaming dashboard.
Don't use streak pressure, mascot patterns, or dopamine-heavy reward loops.
Don't use generic productivity UI where a stronger learning identity is possible.
