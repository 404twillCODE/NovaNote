# NovaNote

A modern note-taking app with plugin support, optional local AI, and a shared Apple-dark + nova glow design. Monorepo containing web (marketing + galleries), desktop (Tauri), and placeholder for iPad.

## What is NovaNote?

- **Web** (`apps/web`): Marketing site, open-source info, plugins/themes galleries. Hosted on GitHub Pages.
- **Desktop** (`apps/desktop`): Tauri + Vite + React app with onboarding, editor, settings, and plugin panels.
- **Plugins**: Safe-by-default plugin host (permissions, load/unload, panels, commands). See plugin format and safety below.
- **Local AI**: Optional built-in module (not a plugin); Ollama connector placeholder.
- **Design**: Shared tokens (`packages/tokens`), theme (`packages/theme`), and UI (`packages/ui`) with Framer Motion and reduced-motion support.

## How to run

From the repo root:

- **Web**: `pnpm dev:web` — runs the web app (Vite) at http://localhost:5173 (or configured port).
- **Desktop**: `pnpm dev:desktop` — runs the desktop Vite dev server at http://localhost:1420. For full Tauri app with window: `cd apps/desktop && pnpm tauri dev`.
- **Build web**: `pnpm build:web` — builds `apps/web` and copies `registry/*.json` into `public/registry/`.
- **Build desktop**: `pnpm build:desktop` — builds tokens, then `apps/desktop` (Vite), then Tauri.

First time: run `pnpm install` at the root, then `pnpm build:tokens` and `pnpm build:ui` so the web/desktop apps can use tokens and the UI package. Then run `pnpm dev:web` or `pnpm dev:desktop`.

## Plugin format and safety

- A plugin is a folder with `plugin.json` (schemaVersion, id, name, version, entry, permissions) and `dist/index.html` (or entry script).
- The host loads plugins from a plugins directory (e.g. `apps/desktop/.novanote/plugins` in dev).
- Permissions are requested and granted per plugin; methods like `network.fetch` are blocked by default (only localhost if permission granted).
- Bridge: plugins get `window.EditorHost` with `call(method, payload)` and `on(event, cb)`. The desktop app implements the bridge in JS and enforces permissions.

## Themes and plugins registry

- **Registry files**: `registry/themes.json` and `registry/plugins.json` at the repo root.
- **Web**: Build copies these into `apps/web/public/registry/` so the site can load them.
- **Desktop**: Uses core/plugins loader and installed list; registry is for discovery only.

## Repo structure

- `apps/web` — Vite + React + React Router (marketing, themes, plugins, docs).
- `apps/desktop` — Tauri + Vite + React (onboarding, home, editor, settings).
- `apps/ipad` — Placeholder (SwiftUI + PencilKit plan, token mapping, sync outline).
- `packages/tokens` — Design tokens (JSON + CSS); build outputs `dist/tokens.css` and `dist/tokens.generated.json`.
- `packages/theme` — Tailwind preset (maps to CSS variables).
- `packages/ui` — Shared components (Button, Card, Sidebar, Topbar, Modal, Toggle, Input, Toast) + Framer Motion wrappers.
- `packages/plugin-sdk` — Typed host bridge types for plugins.
- `core/plugins` — Plugin host skeleton (loader, bridge, permissions).
- `core/ai` — Optional AI module (Ollama placeholder).
- `core/storage` — Stub storage (recents, workspaces, settings).
- `core/editor` — Editor state placeholder (getText, setText, selection) for plugin/AI hooks.
