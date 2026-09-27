# zdock documentation

zdock is a modular dock for GNOME Shell. Its host owns the panel, layout, slots, and component API. Each component can be maintained in a separate repository and installed, replaced, or removed without editing the host source.

This repository contains architecture documents and a standalone UI preview. The zdock CLI commands in these documents describe intended behavior; they are not implemented yet.

The project targets GNOME Shell on Wayland across Linux distributions. No release or GNOME version is certified yet. Dock UI text defaults to English.

## Read in order

1. [Architecture](architecture.md) — system layers, boundaries, and delivery stages
2. [Component contract](component-contract.md) — package manifest, slots, runtime API, and cleanup
3. [Component lifecycle](component-lifecycle.md) — CLI behavior, replacement, fallback, and removal
4. [UI preview](preview.md) — run the visual prototype without GNOME Shell integration
5. [Agent instructions](AGENTS.md) — development rules for this repository

The root README is reserved for setup and run instructions. Design and component contracts live in docs/.
