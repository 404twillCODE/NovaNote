# NovaNote Local AI Module

Built-in optional AI (not a plugin). Can be toggled on/off in settings.

## Architecture

- **Connector**: `ollama.ts` – talks to local Ollama (placeholder). Methods: `isRunning()`, `listModels()`, `generate(prompt)`.
- **Service**: Stub service that can be enabled/disabled in settings. When enabled, the editor can call the connector for completions/suggestions.
- **Permissions**: No plugin can access AI by default; this is an app feature, not exposed via the plugin bridge.

## Future

- Wire Ollama REST API when user enables "Local AI".
- Optional: other backends (LM Studio, etc.) via adapter pattern.
- Editor integration: inline completion, command palette "Ask AI", etc.
