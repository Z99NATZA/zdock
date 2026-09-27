const paths = {
  apps: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4"/><rect x="5" y="10" width="11" height="4" rx="1" fill="currentColor" stroke="none"/>',
  bluetooth: '<path d="M7 7l10 10-5 4V3l5 4L7 17"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  cloud: '<path d="M20 16.6A4.5 4.5 0 0 0 17 9a6 6 0 0 0-11.5 1.8A4 4 0 0 0 7 19h12a3 3 0 0 0 1-2.4Z"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>',
  disc: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/><path d="M12 3v7"/>',
  docker: '<rect x="3" y="11" width="3" height="3"/><rect x="7" y="11" width="3" height="3"/><rect x="11" y="11" width="3" height="3"/><rect x="7" y="7" width="3" height="3"/><rect x="11" y="7" width="3" height="3"/><path d="M2 16c2.3 3 5.2 4 9 4 4.8 0 8-2.5 9-6-1.4.7-2.8.6-4-.2"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  gear: '<path d="M10 2h4l.6 2.4 1.8.8 2.1-1.3 2.8 2.8-1.3 2.1.8 1.8L23 11v4l-2.4.6-.8 1.8 1.3 2.1-2.8 2.8-2.1-1.3-1.8.8L14 23h-4l-.6-2.4-1.8-.8-2.1 1.3-2.8-2.8 1.3-2.1-.8-1.8L1 15v-4l2.4-.6.8-1.8-1.3-2.1 2.8-2.8 2.1 1.3 1.8-.8Z"/><circle cx="12" cy="13" r="3"/>',
  heart: '<path d="M20.5 8.5c0 4.2-8.5 10-8.5 10s-8.5-5.8-8.5-10a4.5 4.5 0 0 1 8.5-1.8 4.5 4.5 0 0 1 8.5 1.8Z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m4 18 5-5 3 3 3-4 5 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  moon: '<path d="M20 16.6A9 9 0 0 1 7.4 4 9 9 0 1 0 20 16.6Z"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none"/>',
  play: '<path d="m8 4 12 8-12 8Z" fill="currentColor" stroke="none"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  power: '<path d="M12 2v10M6.2 5.8a9 9 0 1 0 11.6 0"/>',
  repeat: '<path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  shuffle: '<path d="M4 4h2c5 0 7 16 12 16h2m-4-4 4 4-4 4M4 20h2c2 0 3-2 4-4m4-8c1-2 2-4 4-4h2m-4-4 4 4-4 4"/>',
  skipBack: '<path d="M5 5v14m14-14L8 12l11 7Z" fill="currentColor" stroke="none"/>',
  skipForward: '<path d="M19 5v14M5 5l11 7-11 7Z" fill="currentColor" stroke="none"/>',
  sliders: '<path d="M4 7h8m4 0h4M4 17h4m4 0h8"/><circle cx="14" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  volume: '<path d="M4 9v6h4l5 4V5L8 9Zm12-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16"/>',
  wifi: '<path d="M2 9a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a5.5 5.5 0 0 1 7 0M12 19h.01"/>',
  x: '<path d="M5 5 19 19M19 5 5 19"/>'
};

export function icon(name, size = 20, extraClass = '') {
  return '<svg class="icon ' + extraClass + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.apps) + '</svg>';
}

function brandIcon(shapes) {
  return '<svg class="brand-icon" viewBox="0 0 48 48" aria-hidden="true">' + shapes + '</svg>';
}

export function appMark(name) {
  const marks = {
    Code: brandIcon('<path fill="#28a8ec" d="M34 2 47 8v32l-13 6-20-16-8 6-5-4V16l5-4 8 6L34 2Zm0 11L20 24l14 11V13ZM6 19v10l5-5-5-5Z"/><path fill="#1476bb" d="m14 18 6 6-6 6-5-6Z"/>'),
    Browser: brandIcon('<circle cx="24" cy="24" r="22" fill="#703db3"/><path fill="#ff9a24" d="M10 11c1 5 3 8 8 10-5 1-9 6-9 12 0 9 8 14 17 14 12 0 20-9 20-20 0-7-3-12-9-17 1 5-1 8-5 10-3-8-11-12-22-9Z"/><path fill="#ffd64a" d="M35 14c1 5-2 8-5 10-3-5-8-7-14-7 3 4 4 7 2 10-3 5-1 12 5 15 8 4 17-1 18-10 1-7-1-13-6-18Z"/><circle cx="26" cy="29" r="10" fill="#ffeabc"/>'),
    Terminal: '<span class="app-glyph terminal-mark">&gt;_</span>',
    Files: icon('folder', 34),
    Docker: icon('docker', 34),
    Git: brandIcon('<path fill="#f45d45" d="M24 1 47 24 24 47 1 24Z"/><path d="M15 15 33 33M24 24v11" fill="none" stroke="#fff0ec" stroke-width="3" stroke-linecap="round"/><circle cx="15" cy="15" r="3.4" fill="#fff0ec"/><circle cx="24" cy="24" r="3.4" fill="#fff0ec"/><circle cx="24" cy="35" r="3.4" fill="#fff0ec"/>'),
    Music: icon('music', 32),
    Settings: icon('gear', 31),
    Discord: brandIcon('<path fill="#fff" d="M12 13c7-5 17-5 24 0l4 19c-4 4-7 5-10 6l-2-3c2-.5 3-1 4-2-6 3-11 3-16 0 1 1 2 1.5 4 2l-2 3c-4-1-7-3-10-6Z"/><circle cx="19" cy="25" r="2.6" fill="#5865f2"/><circle cx="29" cy="25" r="2.6" fill="#5865f2"/>'),
    Spotify: brandIcon('<path d="M8 17c11-5 24-4 33 1M10 24c10-4 21-3 29 1M12 31c8-3 17-2 24 1" fill="none" stroke="#14392f" stroke-width="4" stroke-linecap="round"/>'),
    Photos: icon('image', 30)
  };
  return '<span class="app-icon app-' + name.toLowerCase() + '">' + (marks[name] || name.slice(0, 1)) + '</span>';
}
