#!/usr/bin/env bash
set -euo pipefail

MODEL_DIR="${MODEL_DIR:-$HOME/LLM/models/gemma-4-E4B-it}"
GGUF_MODEL="${GGUF_MODEL:-$HOME/Code/local-llm-quickstart/models/gemma-4-E4B-it-Q4_K_M.gguf}"
PORT="${PORT:-8000}"
CTX_SIZE="${CTX_SIZE:-8192}"
REASONING="${REASONING:-off}"
TRANSFORMERS_BIN="${TRANSFORMERS_BIN:-transformers}"

if command -v llama-server >/dev/null 2>&1 && [[ -f "$GGUF_MODEL" ]]; then
  echo "Serving Gemma GGUF from $GGUF_MODEL"
  echo "Endpoint: http://127.0.0.1:$PORT/v1/chat/completions"
  exec llama-server \
    -m "$GGUF_MODEL" \
    --host 127.0.0.1 \
    --port "$PORT" \
    --ctx-size "$CTX_SIZE" \
    --reasoning "$REASONING"
fi

if [[ -x "$HOME/LLM/.venv/bin/transformers" ]]; then
  TRANSFORMERS_BIN="$HOME/LLM/.venv/bin/transformers"
fi

if [[ ! -f "$MODEL_DIR/model.safetensors" ]]; then
  echo "No runnable Gemma model found." >&2
  echo "Expected GGUF at: $GGUF_MODEL" >&2
  echo "Or safetensors at: $MODEL_DIR/model.safetensors" >&2
  exit 1
fi

if ! command -v "$TRANSFORMERS_BIN" >/dev/null 2>&1; then
  echo "transformers CLI not found." >&2
  echo "Install the shared serving runtime with:" >&2
  echo '  cd ~/LLM && source .venv/bin/activate && pip install -U "transformers[serving]" torch accelerate torchvision pillow' >&2
  exit 1
fi

echo "Serving Gemma safetensors from $MODEL_DIR"
echo "Endpoint: http://127.0.0.1:$PORT/v1/chat/completions"
exec "$TRANSFORMERS_BIN" serve "$MODEL_DIR" --host 127.0.0.1 --port "$PORT"
