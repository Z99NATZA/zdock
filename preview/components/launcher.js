import { apps } from '../shared/apps.js';
import { appMark } from '../shared/icons.js';

export function mountLauncher(root, context) {
  root.className = 'launcher-card glass card';
  root.innerHTML = [
    '<div class="launcher-grid">',
    apps.map(app => '<button class="launcher-item" type="button" data-app="' + app.name + '">' + appMark(app.icon) + '<span>' + app.name + '</span></button>').join(''),
    '</div>',
    '<p class="launcher-empty" hidden>No matching apps</p>'
  ].join('');

  root.querySelectorAll('[data-app]').forEach(button => {
    button.addEventListener('click', () => context.events.dispatchEvent(new CustomEvent('app-open', {
      detail: button.dataset.app
    })));
  });
  const onSearch = event => {
    const query = event.detail.trim().toLowerCase();
    let visible = 0;
    root.querySelectorAll('[data-app]').forEach(button => {
      const matches = button.dataset.app.toLowerCase().includes(query);
      button.hidden = !matches;
      visible += Number(matches);
    });
    root.querySelector('.launcher-empty').hidden = visible > 0;
    root.classList.remove('launcher-hidden');
  };
  const onToggle = () => root.classList.toggle('launcher-hidden');
  context.events.addEventListener('search-apps', onSearch);
  context.events.addEventListener('toggle-launcher', onToggle);
  return () => {
    context.events.removeEventListener('search-apps', onSearch);
    context.events.removeEventListener('toggle-launcher', onToggle);
  };
}
