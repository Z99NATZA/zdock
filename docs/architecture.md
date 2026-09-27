# zdock architecture

## Goal and scope

zdock provides a GNOME Shell dock assembled from separately maintained component packages. The host controls panel layout, slots, lifecycle, and a versioned API. Components own their UI and behavior. The host source must not contain Wi-Fi, Bluetooth, or other slot-specific implementations.

zdock targets GNOME Shell on Wayland across Linux distributions. Supported GNOME versions must be declared and verified per release; this document does not certify a particular version. Visible dock text defaults to English. All user-facing strings should be kept ready for localization rather than embedded in layout logic.

## System map

~~~text
Linux distribution: kernel, drivers, package manager, system services
  └─ GNOME Shell + Mutter: desktop session and Wayland compositor
       └─ zdock GNOME Shell extension: panel, popovers, slots, component API
            ├─ launcher / taskbar / tray components
            └─ quick.wifi / quick.bluetooth / quick.audio / ... components

zdock CLI: fetch, validate, build, install, activate, replace, remove
~~~

The GNOME Shell extension runs JavaScript through GJS. TypeScript is the source language; it compiles to readable JavaScript. UI widgets use St/Clutter and CSS. This runtime has no HTML or browser DOM. Heavy work can run in a separate process and communicate with the extension through D-Bus.

GNOME Quick Settings belong to GNOME Shell. Extensions such as Dash to Panel can move access to that menu into another panel. zdock will render its own dock and popovers; it will use GNOME Shell/Mutter APIs and relevant system services to implement their actions. It must not treat GNOME Quick Settings as a Dash to Panel API.

## Responsibilities

| Part | Responsibility |
| --- | --- |
| Host extension | Render the panel and popovers, manage slots and component lifecycle, expose the versioned context API |
| Slot registry | Track installed, active, and fallback component for each slot |
| Service adapters | Provide stable access to windows, apps, workspaces, and system services |
| Component package | Render and control one slot; may be maintained in a separate repository |
| zdock CLI | Manage sources, manifest validation, builds, activation, rollback, and owned files |

Version 1 permits one active component per slot. Initial slots are **launcher**, **taskbar**, **tray**, **quick.wifi**, **quick.bluetooth**, **quick.audio**, and **quick.power**. A new slot needs a documented placement and context contract before components can target it.

## Boundaries

The host passes components a versioned context rather than requiring them to use GNOME Shell internals directly. The context includes only documented capabilities, such as windows, apps, menus, settings, and slot-specific service adapters. A breaking contract change increments the API version.

All UI components still execute inside the same **gnome-shell** process. The context organizes code; it is not a security sandbox. A component can affect Shell stability, so the CLI must show its source and exact revision before installation.

Default components are ordinary packages fetched from separately maintained repositories during initial setup. They use the same manifest, lifecycle, and removal path as external components. The fallback designation is local zdock state, not a privilege that a third-party manifest can claim.

The generated runtime contains the active package and any installed fallback needed for each slot. Only the active widget mounts. If an active component fails during mount, the host reports that failure and may mount its fallback so the slot stays usable. A successful startup writes an activation receipt for the CLI; a missing or failed receipt leaves the prior build available for rollback.

## Proposed filesystem ownership

Paths use the XDG base directories. When unset, their conventional defaults are **~/.local/share** for data, **~/.config** for configuration, and **~/.cache** for cache.

| Path | Owner and purpose |
| --- | --- |
| $XDG_DATA_HOME/zdock/packages/<component-id>/ | Source and metadata installed by the CLI |
| $XDG_CONFIG_HOME/zdock/config.json | User options, including the GitHub owner used for short component names |
| $XDG_CONFIG_HOME/zdock/state.json | Installed, active, fallback, and pending state |
| $XDG_CACHE_HOME/zdock/ | Temporary download and build data |
| $XDG_DATA_HOME/gnome-shell/extensions/<zdock-uuid>/ | Generated extension runtime loaded by GNOME Shell |

The CLI builds the runtime from host and selected packages. It must not copy component source into the host repository. Every generated path needs an owner record so removal affects only zdock-managed files. The extension UUID must be chosen from a stable project namespace before distribution. These paths are design targets and should be checked against the real build before implementation.

## Delivery sequence

The standalone [UI preview](preview.md) explores component layout and interaction with browser technologies in a separate transparent GTK/WebKit window. It does not use GNOME Shell APIs and is not the production component loader.

1. Build a host extension with an empty panel, slots, and one separately packaged default component.
2. Publish the component SDK and make the default use the exact same loading path as an external package.
3. Implement the CLI operations and transactional replacement described in [Component lifecycle](component-lifecycle.md).
4. Add service adapters and Quick Settings components one at a time, including fallback and startup-failure recovery.

Keep access to GNOME's system menu until zdock covers essential actions such as lock, sound, and network. Hiding the original menu is a separate change after those actions are verified.

## Primary references

- [GNOME Shell extension architecture](https://gjs.guide/extensions/overview/architecture.html)
- [GJS TypeScript guide](https://gjs.guide/extensions/development/typescript.html)
- [GNOME extension review guidelines](https://gjs.guide/extensions/review-guidelines/review-guidelines.html)
