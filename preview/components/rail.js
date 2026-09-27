import { appMark, icon } from '../shared/icons.js';

export function mountRail(root, context) {
  const favorites = ['Files', 'Browser', 'Terminal', 'Code', 'Discord', 'Spotify', 'Photos'];
  root.innerHTML = [
    '<div class="rail-apps">',
    favorites.map(name => '<button class="rail-button" type="button" data-app="' + name + '" aria-label="' + name + '">' + appMark(name) + '</button>').join(''),
    '</div>',
    '<button class="rail-button rail-apps-button" type="button" aria-label="Show applications">' + icon('apps', 23) + '</button>'
  ].join('');
  root.querySelectorAll('[data-app]').forEach(button => {
    button.addEventListener('click', () => context.events.dispatchEvent(new CustomEvent('app-open', {
      detail: button.dataset.app
    })));
  });
  root.querySelector('.rail-apps-button').addEventListener('click', () => {
    context.events.dispatchEvent(new Event('toggle-launcher'));
  });
}
