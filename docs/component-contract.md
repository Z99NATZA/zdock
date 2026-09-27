# Component package contract

This is the proposed version 1 contract for repositories that plug into zdock. Names and types may be refined during implementation, but slot ownership, API versioning, and cleanup are required properties.

## Package layout

~~~text
wifi-custom/
├─ zdock.component.json
├─ src/
│  └─ index.ts
└─ stylesheet.css       # optional
~~~

Example manifest:

~~~json
{
  "id": "wifi-custom",
  "version": "0.1.0",
  "apiVersion": 1,
  "slot": "quick.wifi",
  "gnomeShellVersions": [50],
  "entry": "src/index.ts",
  "requires": ["network"]
}
~~~

The GNOME Shell version in this example is illustrative; the project must test and declare actual supported versions before release.

The **id** is unique within an installation and is used in commands and storage paths. The **slot** must be declared by the host. The **entry** must resolve to a file inside the package. The CLI validates the manifest, file paths, and supported versions before building.

The optional **requires** list names host-provided capabilities, such as **network**. The CLI checks them during setup. Version 1 does not permit a package to request arbitrary OS package installation.

The CLI owns the TypeScript build toolchain and does not run package-defined install or build scripts. Version 1 component code uses the provided SDK types and GJS-compatible imports; it cannot assume Node.js or browser APIs are available at runtime.

## Source references

- **zdock add wifi-custom** resolves under the GitHub owner in **$XDG_CONFIG_HOME/zdock/config.json** (default **~/.config/zdock/config.json**).
- **zdock add owner/repo** identifies an explicit GitHub repository.
- **zdock add https://github.com/owner/repo** uses an explicit URL.

The CLI records the exact commit or release revision and displays it before installation. A package's manifest cannot declare itself the default or override another slot.

## Runtime interface

After compilation, the host loads a component entry and passes a context for the manifest's API version. The initial shape is:

~~~ts
interface ZDockComponent {
  mount(context: ZDockContext): St.Widget;
  destroy(): void;
}
~~~

**mount** creates the widget owned by its slot. **destroy** removes the widget, disconnects signals, cancels timers and pending work, and releases owned resources. The host calls **destroy** before deactivation, on a partial mount failure, and when the host extension stops. A component may modify only the slot it owns.

**ZDockContext** provides documented capabilities such as windows, apps, menus, settings, and slot-specific service adapters. Components should use these adapters instead of importing private GNOME Shell modules. If a direct internal API is necessary, the package must document why and test every declared GNOME Shell version.

Component CSS must use an id-specific class prefix to avoid changing other widgets. Visible text defaults to English and should be ready for localization. Widgets need accessible names and keyboard operation where applicable.

A component may use a separate Rust or other helper process when justified, preferably communicating over D-Bus. The Shell-facing UI and its lifecycle still run through GJS.

## Compatibility and lifecycle

The CLI rejects a package when **apiVersion**, **slot**, or **gnomeShellVersions** is incompatible. A slot has one active package. An installed default package may remain as fallback while a custom package is active.

Default packages use the same manifest, build, activation, and removal rules as external packages. zdock records which installed package is the fallback during initial setup. Removing that package clears the fallback.

For full installation and replacement semantics, see [Component lifecycle](component-lifecycle.md).
