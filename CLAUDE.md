# Tools Site — CLAUDE.md

Project brief for Claude. Read this at the start of every session.

---

## Overview

A hub site (`index.html`) linking to standalone tool pages. All files live together in this folder. Links are relative (no build step, no framework).

**Live URL base:** mysticscards.space

---

## File inventory

**Site files (root — these are what gets deployed/pushed to GitHub):**

| File | Purpose |
|------|---------|
| `index.html` | Hub — 2×2 grid of clickable cards linking to each tool |
| `iching.html` | I Ching oracle — Finder (cast reading) + 8×8 hexagram reference grid |
| `bip39.html` | I Ching × BIP39 — explains binary encoding of hexagrams for Bitcoin mnemonics |
| `calculator.html` | Dozenal calculator — exact rational arithmetic, BIN/DEC/DOZ/HEX modes |
| `quadration.html` | Playing Cards — full mysticscards playing card engine (user-provided, complex) |
| `site.css` | **Shared CSS** — design tokens, reset, typography, site header/nav. All pages link this. |
| `dozenal.js` | Calculator logic (exact rational arithmetic) |
| `ichingdata.js` | `window.HEX_DATA` — 64 Sage-voice oracle answers (one per hexagram) |
| `linedata.js` | `window.LINE_DATA` — 384 Sage-voice moving-line texts (6 lines × 64 hexagrams) |

**Dev tooling (`dev/` — not deployed, just for local development):**

| File | Purpose |
|------|---------|
| `dev/_template.html` | Boilerplate template for new pages |
| `dev/check.sh` | Consistency checker — run with `bash dev/check.sh` |
| `dev/serve.sh` | Local dev server — run with `bash dev/serve.sh` |
| `dev/snapshot.sh` | Legacy snapshot script (superseded by git, kept for reference) |

---

## Design system

**Theme:** Parchment / serif / gold. All pages share this.

**Canonical tokens** (defined in `site.css`):
- Background: `--bg: #f7f2ea` (warm parchment)
- Surface: `--surface: #fdfaf5`, `--surface-alt: #f0e9da`
- Text: `--text: #1a1916`
- Accent (navy): `--accent: #1e2340`
- Gold: `--gold: #b5864a`
- Rule lines: `--rule: #e2d9cc`, `--rule-strong: #c9bfb0`
- Fonts: `--serif` = Cormorant Garamond, `--sans` = Inter, `--mono` = SFMono-Regular

**Google Fonts** used: Cormorant Garamond + Inter (all pages); JetBrains Mono (calculator only); Lora (quadration only).

**Site header** — sticky dark navy bar (`#1e2340`) with centered logo and burger menu. Defined once in `site.css`, used on all pages. quadration.html uses slightly different variable names in its own `:root` but the header HTML is identical.

---

## I Ching data

- Bit string convention: read **left→right = lines 1→6 (bottom→top)**, so LSB is the top line.
- `HEX_DATA[n]` → oracle answer for hexagram n (Fu Xi / binary order, 0-indexed).
- `LINE_DATA[kw]` → object with keys `1`–`6`, each a Sage-voice moving-line text. Keyed by **King Wen number** (1-indexed).
- Both data files are loaded as `<script src="...">` siblings of `iching.html`.
- See the memory entries `[[iching-64-hexagram-answers]]` and `[[iching-384-line-answers]]` for the full text content.

---

## Versioning

The repo is tracked with **git**. Before editing, stage and commit a checkpoint:

```bash
cd /sessions/<session>/mnt/Super
git add -A
git commit -m "pre-edit snapshot: <description>"
```

After changes are done, commit them:

```bash
git add -A
git commit -m "brief description of what changed"
```

`git log --oneline` shows history. `git diff` compares working tree to last commit.

**Revert caveat:** The bash mount cannot overwrite existing files, so `git checkout -- <file>` will fail. To revert a file, use `git show <hash>:<file>` to read the old content, then write it back with the host Write/Edit tool.

**Lock file caveat:** If a commit fails with `cannot lock ref 'HEAD'`, the `.git/HEAD.lock` file got stuck. Remove it with `rm /sessions/<session>/mnt/Super/.git/HEAD.lock`. If `rm` itself fails with Permission denied, use the `mcp__cowork__allow_cowork_file_delete` tool first.

`snapshot.sh` and `versions/` are kept as pre-git history but are no longer used.

---

## Important technical notes

### Bash mount quirk
The bash mount at `/sessions/<session>/mnt/Super/` is **CREATE-ONLY** for existing files — it can write new files but cannot overwrite or append to existing ones (Permission denied). Always use the host **Read/Write/Edit tools** to modify existing files. Bash is fine for creating snapshot directories and copying files into them.

### File tool paths
- Read/Write/Edit: `/Users/Claude/Super/filename`
- bash: `/sessions/<session>/mnt/Super/filename`

### quadration.html
This is a large, user-provided file (~1400+ lines). It has its own `:root` with slightly different variable names (`--text-primary`, `--text-muted`, `--text-secondary` instead of `--text`, `--muted`, `--secondary`). Do not rename those — they're used throughout the file. It links `site.css` for the shared header and tokens, but its own `:root` block takes precedence for the aliased names.

### iching.html
Large file (~1295 lines after cleanup). The `__om-edit-overrides` style tag that used to appear after `</html>` has been removed — do not re-add it.

---

## Nav links (keep in sync across all pages)

```html
<a href="quadration.html">Playing Cards</a>
<a href="calculator.html">Calculator</a>
<a href="iching.html">I Ching</a>
<a href="bip39.html">BIP39</a>
```

Add `class="active"` to the link matching the current page.
