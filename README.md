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
- [BIZ UDPGothic](https://fonts.google.com/specimen/BIZ+UDPGothic) for kana study surfaces
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) for core UI text
- Firebase (auth + progress tracking — coming soon)

## Dev

```bash
npm install
npm run dev
```

## Local Gemma Knacks

Kotsu can pre-process kanji study notes with a local OpenAI-compatible Gemma server.
The quickest local path is the GGUF model at:

```text
~/Code/local-llm-quickstart/models/gemma-4-E4B-it-Q4_K_M.gguf
```

Install `llama.cpp` once:

```bash
brew install llama.cpp
```

Start the local server:

```bash
cd ~/Code/kotsu
npm run llm:serve
```

Generate Knacks in another terminal:

```bash
npm run knacks:generate -- 明 森
npm run knacks:generate -- --limit 5
```

If you want to use the full safetensors model instead, download it to:

```text
~/LLM/models/gemma-4-E4B-it
```

Then install the shared Transformers serving runtime:

```bash
cd ~/LLM
source .venv/bin/activate
pip install -U "transformers[serving]" torch accelerate torchvision pillow
```

If the GGUF file is not present, `npm run llm:serve` falls back to the Transformers server.
You can point generation at any compatible server with environment variables:

```bash
KOTSU_LLM_ENDPOINT=http://127.0.0.1:8080 KOTSU_LLM_MODEL=local npm run knacks:generate -- 明
```

The generated artifact is:

```text
src/lib/generated/kanji-knacks.json
```

The Svelte app reads that file at build time and shows a Kotsu panel on kanji lesson pages
when a generated entry exists.

## Why

I wanted something I could pull up on my phone in 10 seconds and just *see* how the characters are built. The course starts with sounds, moves through radicals, then keeps connecting kanji back to their parts.

Inspired by the [Kana](https://apps.apple.com/app/kana/id1454200955) iOS app, [Genki](https://genki3.japantimes.co.jp/en/) textbooks, and [Kanshudo](https://www.kanshudo.com). Kotsu is the stripped-down complement — the thing you open when you just want to look at characters and let them sink in.

**コツ** (kotsu) means "the knack" — that moment when something clicks.

## License

MIT
