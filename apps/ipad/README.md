# NovaNote for iPad (placeholder)

Future SwiftUI + PencilKit app. No iOS code in this repo yet.

## Plan

- **Platform**: SwiftUI + PencilKit on iPadOS.
- **Design**: Use token exports from `packages/tokens/dist/tokens.generated.json` (copied to `tokens.generated.json` in this app) for colors, radii, motion.
- **Note types**: text-note (rich text), ink-note (PencilKit canvas).
- **Sync**: Local-first; optional sync provider later (contract TBD).

## Token mapping

Map `tokens.generated.json` to Swift/SwiftUI:

- `colors.*` → `Color` / asset catalog or runtime values.
- `radius.*` → `CornerRadius` / `RoundedRectangle(radius:)`.
- `motion.*` → `Animation.duration` / `withAnimation`.
- `shadow.*` → `shadow(radius:color:)`.

## Sync contract (outline)

- Notes stored locally (Core Data or SQLite).
- Optional: sync to a provider (e.g. iCloud, custom backend) via a defined schema (note id, title, content, type, updated_at).
- Conflict resolution: last-write-wins or merge strategy TBD.
