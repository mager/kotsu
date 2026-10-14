# コツ — Kotsu

**The knack of Japanese.** A branching learning adventure built from sounds, radicals, kanji, and words.

Choose which route to explore first. Complete every branch to finish the journey. Shared checkpoints require every incoming route; there are no dead ends or permanently missed paths.

## Play

- **Journey (`/`)**: a directed acyclic graph with 17 stops across four chapters.
- **Lessons (`/journey/[id]`)**: study and recall up to five pieces per session. Correct answers save progress. Wrong answers allow another attempt without a timer or penalty.
- **Field guide (`/library`)**: freely browse all characters, search, and explore kanji recipes outside the gated course.

The journey covers every item in the existing data exactly once: 105 hiragana, 105 katakana, 42 radicals, 41 kanji, and 15 words (308 total). Course progress measures completed recall items, not a claim of fluency or long-term mastery.

Adventure progress is stored in this browser's local storage (`kotsu-journey-v1`). Existing signed-in character progress also counts toward the journey. New adventure answers are local only; they are not synced to Firebase or another device. Existing account, saved vocabulary, and reference-page progress features remain available.

## Verify

```bash
npm run check
npm test               # requires Bun
npm run build
npm run dev -- --host 127.0.0.1 --port 4358
```

The graph tests check acyclicity, complete curriculum coverage, early branching, mandatory joins, locked prerequisites, successful end-to-end traversal, and unique correct quiz choices.

Manual test:
1. Start First light. Give a wrong answer, then a correct answer. Verify retry feedback and progress only for the correct answer.
2. Finish all five vowels. Both The familiar path and The other side should unlock.
3. Reload. The five learned pieces and both available routes should remain.
4. Open `/journey/greetings` before its prerequisites. It must show a locked state.
5. On a phone, select a map stop, inspect its details, return to the map, and open an available lesson. Keyboard users can focus and scroll the map.
6. Use the field guide to open an individual character or recipe. Reference browsing does not bypass the course's prerequisites.

## Stack

- [SvelteKit 5](https://svelte.dev) (runes syntax)
- [Tailwind CSS v4](https://tailwindcss.com)
- [BIZ UDPGothic](https://fonts.google.com/specimen/BIZ+UDPGothic) for kana study surfaces
- [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) for core UI text
- Firebase (existing auth, reference progress, and saved vocabulary)

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
