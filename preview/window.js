#!/usr/bin/gjs
// Native transparent host for the UI prototype. This process never enters GNOME Shell.
imports.gi.versions.Gtk = '3.0';
imports.gi.versions.Gdk = '3.0';
imports.gi.versions.WebKit2 = '4.1';

const Gtk = imports.gi.Gtk;
const Gdk = imports.gi.Gdk;
const WebKit2 = imports.gi.WebKit2;
const Cairo = imports.cairo;

Gtk.init(null);

const window = new Gtk.Window({ title: 'zdock UI preview' });
window.set_decorated(false);
window.set_app_paintable(true);
window.maximize();

const screen = window.get_screen();
const rgbaVisual = screen.get_rgba_visual();
if (rgbaVisual)
  window.set_visual(rgbaVisual);

const webview = new WebKit2.WebView();
const contentManager = webview.get_user_content_manager();
let inputRegionReady = false;
contentManager.connect('script-message-received::inputRegions', (_manager, result) => {
  try {
    const rectangles = JSON.parse(result.get_js_value().to_string());
    const region = new Cairo.Region();
    for (const rect of rectangles) {
      if (rect.width > 0 && rect.height > 0)
        region.unionRectangle(rect);
    }
    window.get_window().input_shape_combine_region(region, 0, 0);
    if (!inputRegionReady) {
      print('zdock preview: transparent widget regions active');
      inputRegionReady = true;
    }
  } catch (error) {
    logError(error);
  }
});
contentManager.register_script_message_handler('inputRegions');
const transparent = new Gdk.RGBA();
transparent.parse('rgba(0, 0, 0, 0)');
webview.set_background_color(transparent);
webview.load_uri(ARGV[0]);
window.add(webview);

window.connect('destroy', () => Gtk.main_quit());
window.connect('key-press-event', (_widget, event) => {
  if (event.keyval === Gdk.KEY_Escape) {
    window.close();
    return true;
  }
  return false;
});

window.show_all();
Gtk.main();
