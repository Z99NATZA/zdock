import { appMark, icon } from '../shared/icons.js';

export function mountDock(root, context) {
  root.innerHTML = [
    '<label class="dock-search">',
    icon('search', 21),
    '<input type="search" placeholder="Search apps, files, web..." aria-label="Search apps" />',
    '</label>',
    '<span class="dock-divider"></span>',
    '<div class="dock-apps">',
    ['Files', 'Browser', 'Code', 'Spotify'].map(name =>
      '<button class="dock-app" type="button" data-app="' + name + '" aria-label="' + name + '">' + appMark(name) + '</button>'
    ).join(''),
    '<button class="dock-app dock-all" type="button" aria-label="Show applications">' + icon('apps', 23) + '</button>',
    '</div>'
  ].join('');

  const input = root.querySelector('input');
  const focusSearch = () => input.focus();
  context.events.addEventListener('focus-search', focusSearch);
  input.addEventListener('input', () => {
    context.events.dispatchEvent(new CustomEvent('search-apps', { detail: input.value }));
  });
  root.querySelectorAll('[data-app]').forEach(button => {
    button.addEventListener('click', () => context.events.dispatchEvent(new CustomEvent('app-open', {
      detail: button.dataset.app
    })));
  });
  root.querySelector('.dock-all').addEventListener('click', () => {
    context.events.dispatchEvent(new Event('toggle-launcher'));
  });
  return () => context.events.removeEventListener('focus-search', focusSearch);
}
