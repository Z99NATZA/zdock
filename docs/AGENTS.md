# AGENTS — zdock development guide

The zdock repository root is the parent directory of docs/. This guide applies to project work regardless of where the repository is cloned.

## Current task scope

Take the scope and permissions from the current user request and environment. This file does not authorize changes or expand that scope.

## Reading order

1. From the repository root, read **docs/README.md** and **docs/architecture.md**.
2. Read **docs/component-contract.md** and **docs/component-lifecycle.md** before changing the host, CLI, or a component.
3. Follow any additional instructions supplied by the current workspace or user.

## Expected result

Finish the authorized task, then report the changed files, verification performed, and any remaining limitation. Keep this guide about lasting project rules rather than inserting temporary task notes.

## Standing rules

- Follow the active user's and workspace's authorization rules before changing files, installing software, running intrusive tests, or taking remote actions. Do not infer permission from this guide.
- Run focused checks for changed work. Use broader system tests only when their scope and authorization allow them.
- Write project documentation in English under **docs/*.md** without nested documentation folders. Use **docs/README.md** as the documentation entry point and keep affected contracts aligned. Reserve the root **README.md** for setup and run instructions.
- Dock UI text defaults to English. Keep visible strings separate from layout logic so localization can be added later.
- Target GNOME Shell on Wayland without requiring a particular Linux distribution. Use TypeScript source compiled to readable GJS JavaScript, St/Clutter widgets, and CSS. Do not use HTML/DOM or load GTK into the **gnome-shell** process.
- Check the supported GNOME versions and their APIs before using internal Shell behavior. Do not assume private APIs remain compatible across versions.
- The host owns panel layout, slots, registry, lifecycle, and a versioned context API. Slot-specific behavior belongs in component packages, including defaults.
- Every component must follow **component-contract.md**: manifest, one declared slot, API version, mount/destroy lifecycle, and complete resource cleanup.
- The CLI must follow **component-lifecycle.md**: stage and validate before switching, retain a rollback path, record owned files, and make pending session changes visible.
- Do not run scripts supplied by a component repository automatically. Do not describe component code in GNOME Shell as sandboxed or immediately unloadable.
- If a contract change affects another file outside the authorized scope, report the impact instead of editing that file.
