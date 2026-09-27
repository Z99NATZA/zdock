# Component installation and removal

The commands here define the intended CLI behavior; no CLI implementation exists yet.

## Commands

| Command | Intended result |
| --- | --- |
| zdock add <component-ref> | Fetch, validate, build, and select a package for its declared slot |
| zdock remove <id> | Remove an installed package; activate the installed default if the removed package was active |
| zdock use <id> | Select an already installed package for its slot |
| zdock list | Show installed packages by slot, including active and fallback |
| zdock status | Show pending session changes and the last failure |
| zdock rollback | Restore the prior activation and build after a failed replacement |

**add** replaces the active package in the same slot. An old custom package is removed after the replacement is confirmed. An old default package stays installed as fallback until explicitly removed. Re-adding the same package is an update, not a second installed copy.

## Add transaction

1. Resolve the reference to a GitHub repository and exact revision. Fetch into zdock-owned staging storage.
2. Validate the manifest, id, slot, API version, GNOME Shell version, and every package path. Build GJS-compatible JavaScript and required CSS/assets with the host toolchain.
3. Prepare a complete new runtime tree and state record while retaining the previous build for rollback.
4. Commit the new files and state using a transaction record. If this fails, restore the previous tree and state.
5. Mark the new build as pending until a new GNOME session loads it and the host writes an activation receipt. Once confirmed, remove the replaced custom package and temporary/rollback files. If activation fails or no receipt appears, retain the previous build for **zdock rollback**.

Download, validation, or build failure leaves the previous active package untouched. The CLI does not use sudo, execute package install scripts, or remove files outside its ownership inventory.

## Fallback rules

| Event | Active package afterward |
| --- | --- |
| Initial zdock setup | Installed default for each supplied slot |
| Add first custom package | New custom; default remains installed |
| Add another custom package | New custom; previous custom removed after confirmation |
| Remove active custom | Installed default, or an empty slot if none exists |
| Remove default while custom is active | Custom remains active; fallback becomes empty |
| Remove active default | Empty slot |

If a package is removed while its code is loaded in the current session, zdock records the on-disk change as pending. The loaded JavaScript remains in the process until GNOME Shell starts a new session.

## Ownership and cleanup

For each package, zdock records the source revision, generated runtime files, package files, and cache entries it owns. Removal clears those files and registry entries after any required replacement is staged. Shared SDK/runtime files belong to the host and are never removed as part of one component.

Component user settings live in separate namespaces. Normal removal preserves those settings so a later reinstall can restore them. An explicit purge action may delete them; this behavior must be shown to the user before implementation.

UI components run in the GNOME Shell process without a separate sandbox. A bad component can affect the session. The CLI presents the source and revision to the user, while compatibility checks and a retained prior build provide recovery from installation failures.

## GNOME session behavior

GNOME Shell cannot unload imported JavaScript from its current process. The CLI must distinguish **files installed** from **component active in the running session**. Installing or removing code requires a new GNOME session before the change is fully effective. Runtime widget toggling is possible only for code already loaded and still requires complete signal/timer cleanup.

See [GNOME's extension reload guidance](https://gjs.guide/extensions/development/debugging.html).
