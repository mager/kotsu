# コツ — Kotsu

**The knack of Japanese.** A mobile-first Japanese learning course built around radicals, repetition, and visual recognition.

No streak anxiety. No mascot clutter. Just a clear path from beginner sounds to radicals, kanji families, and the words that make them stick.

Kotsu is for me first, but it is built for anyone who wants to learn Japanese through calm repetition, visual structure, and a course that makes characters feel connected instead of random.

## What's here

Five study shelves feed one required course tree:

| Column | What | Count |
|--------|------|-------|
| ひらがな | Hiragana basics | 46 |
| カタカナ | Katakana | 46 |
| 部首 | Radicals — the building blocks | 24 |
| 漢字 | Kanji (JLPT N5) | 24 |
| 語彙 | Vocabulary — baby words to real words | 15 |

Follow the course timeline, branch into radical families, then tap any character for an immersive full-screen study view.

## Product direction

Kotsu is trying to balance two things at once:

- **Japan-now usefulness** — fast access to kana, core words, and recognition patterns that help before and during a trip.
- **Long-term literacy** — a radical-first model that teaches how kanji are built so later learning compounds.

The intended feel is **calm, focused, quietly electric**.

## Stack

- [SvelteKit 5](https://svelte.dev) (runes syntax)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) (700 + 900)
- Firebase (auth + progress tracking — coming soon)

## Dev

```bash
npm install
npm run dev
```

## Why

I wanted something I could pull up on my phone in 10 seconds and just *see* how the characters are built. The course starts with sounds, moves through radicals, then keeps connecting kanji back to their parts.

Inspired by the [Kana](https://apps.apple.com/app/kana/id1454200955) iOS app, [Genki](https://genki3.japantimes.co.jp/en/) textbooks, and [Kanshudo](https://www.kanshudo.com). Kotsu is the stripped-down complement — the thing you open when you just want to look at characters and let them sink in.

**コツ** (kotsu) means "the knack" — that moment when something clicks.

## License

MIT
