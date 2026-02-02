# iPad design notes

## Token mapping plan

- Consume `tokens.generated.json` (from `packages/tokens` build).
- Colors: map to SwiftUI `Color` or asset catalog.
- Radii: map to view modifiers / `RoundedRectangle`.
- Motion: map to `Animation` durations and easing.
- Shadow: map to `shadow(radius:color:)`.

## Note types

- **text-note**: Rich text (e.g. UITextView / SwiftUI TextEditor; later custom editor).
- **ink-note**: PencilKit canvas; strokes stored as data; export to image or vector.

## Sync contract outline

- Local-first: all notes available offline.
- Optional sync provider: push/pull with a backend or iCloud.
- Schema: id, title, body (or blob), type (text | ink), updated_at, created_at.
- No sync code in this placeholder; contract documented for later.
