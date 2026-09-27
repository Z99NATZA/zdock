import { mountTopbar } from './components/topbar.js';
import { mountRail } from './components/rail.js';
import { mountClockWeather } from './components/clock-weather.js';
import { mountMusic } from './components/music.js';
import { mountLauncher } from './components/launcher.js';
import { mountStats } from './components/stats.js';
import { mountTasks } from './components/tasks.js';
import { mountCalendar } from './components/calendar.js';
import { mountDock } from './components/dock.js';

const app = document.querySelector('#app');
if (!window.webkit?.messageHandlers?.inputRegions)
  document.body.classList.add('browser-preview');
app.innerHTML = [
  '<main class="desktop" aria-label="zdock desktop preview">',
  '  <header id="topbar" class="topbar glass"></header>',
  '  <aside id="rail" class="rail glass" aria-label="Favorite apps"></aside>',
  '  <section class="left-stack" aria-label="Desktop widgets">',
  '    <div id="clock-weather"></div>',
  '    <div id="music"></div>',
  '    <div id="launcher"></div>',
  '  </section>',
  '  <section class="right-stack" aria-label="Desktop information">',
  '    <div id="stats"></div>',
  '    <div id="tasks"></div>',
  '    <div id="calendar"></div>',
  '  </section>',
  '  <nav id="dock" class="dock glass" aria-label="Dock"></nav>',
  '  <div id="toast" class="toast glass" role="status" aria-live="polite"></div>',
  '</main>'
].join('');

const events = new EventTarget();
let toastTimer;
const context = {
  events,
  notify(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  }
};

events.addEventListener('app-open', event => {
  context.notify(event.detail + ' — UI preview only');
});

const mounts = [
  ['#topbar', mountTopbar],
  ['#rail', mountRail],
  ['#clock-weather', mountClockWeather],
  ['#music', mountMusic],
  ['#launcher', mountLauncher],
  ['#stats', mountStats],
  ['#tasks', mountTasks],
  ['#calendar', mountCalendar],
  ['#dock', mountDock]
];

const cleanups = mounts.map(([selector, mount]) => mount(document.querySelector(selector), context));
// The native preview gives pointer input only to visible widget rectangles.
const inputSelectors = [
  '.topbar', '.rail', '.clock-card', '.music-card', '.launcher-card',
  '.stats-card', '.tasks-card', '.calendar-card', '.dock'
];
let previousRegions = '';
const updateInputRegions = () => {
  const handler = window.webkit?.messageHandlers?.inputRegions;
  if (!handler) return;
  const rectangles = inputSelectors.flatMap(selector => {
    const element = document.querySelector(selector);
    if (!element || getComputedStyle(element).pointerEvents === 'none') return [];
    const { x, y, width, height } = element.getBoundingClientRect();
    return [{ x: Math.floor(x), y: Math.floor(y), width: Math.ceil(width), height: Math.ceil(height) }];
  });
  const encoded = JSON.stringify(rectangles);
  if (encoded !== previousRegions) {
    handler.postMessage(encoded);
    previousRegions = encoded;
  }
};
const inputRegionTimer = setInterval(updateInputRegions, 300);
updateInputRegions();
window.addEventListener('beforeunload', () => {
  cleanups.forEach(cleanup => cleanup?.());
  clearInterval(inputRegionTimer);
  clearTimeout(toastTimer);
});
