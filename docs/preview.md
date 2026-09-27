# Standalone UI preview

The **preview/** directory is a visual prototype based on the provided desktop reference. Its transparent GTK/WebKit window shows the real desktop behind the widgets and runs alongside Dash to Panel. The interface uses dark translucent surfaces with pink accents and scales its visual proportions for larger desktop work areas. It does not install a GNOME Shell extension, change GNOME settings, or call GNOME Shell APIs.

## Run

From the repository root:

~~~sh
make preview-desktop
~~~

The command starts a local server and opens a maximized, transparent, undecorated preview window in the monitor's available work area. It needs Python 3, GJS, GTK 3, and WebKit2GTK 4.1. Press Escape or Alt+F4 to close it. Pointer input passes through empty areas; widget cards remain interactive. This is a regular Wayland application window, so the compositor controls its placement and stacking.

For a browser-only preview, run `make preview` and open **http://127.0.0.1:8765/**. This mode displays the bundled wallpaper behind the widgets. The desktop window stays transparent and displays the current system wallpaper.

## Component boundaries

**preview/main.js** mounts separate modules for the top bar, app rail, clock/weather, music player, launcher, sample metrics, tasks, calendar, and bottom dock. Shared icon and app data live under **preview/shared/**. The browser preview bundles a wallpaper under **preview/assets/**; the desktop window uses the system wallpaper.

The workspace selector, status icons, app search, launcher visibility, music controls, task list, and calendar respond to input. Weather, battery, system metrics, app launches, and power controls are visual samples. Browser interaction here is not evidence of GNOME Shell integration.

The production extension remains governed by [Architecture](architecture.md) and the [Component contract](component-contract.md).
