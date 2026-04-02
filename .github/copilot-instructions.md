# Copilot Instructions

## Repository purpose

A collection of standalone web apps and learning materials for Claude Code / GitHub Copilot. Each app lives in its own subdirectory.

## Architecture

- Every app is a **single self-contained `index.html`** with embedded CSS and JavaScript — no build step, no package manager, no dependencies.
- To run an app, open its `index.html` directly in a browser.
- `Preparation/` contains setup guides and notes (Markdown only, not runnable).

## Conventions

- New apps go in their own subdirectory with a single `index.html`.
- All styles and scripts are inlined in that file — no separate `.css` or `.js` files.
- No frameworks, bundlers, or package managers are used.
