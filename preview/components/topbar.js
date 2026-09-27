import { icon } from '../shared/icons.js';

export function mountTopbar(root, context) {
  root.innerHTML = [
    '<div class="topbar-left">',
    '  <button class="profile-chip" type="button" aria-label="Profile"><span class="profile-avatar">✿</span><span>znnn</span></button>',
    '  <div class="workspaces" role="group" aria-label="Workspaces">',
    '    <button class="workspace active" type="button" aria-pressed="true">1</button>',
    '    <button class="workspace" type="button" aria-pressed="false">2</button>',
    '    <button class="workspace" type="button" aria-pressed="false">3</button>',
    '    <button class="workspace" type="button" aria-pressed="false">4</button>',
    '    <button class="workspace workspace-circle" type="button" aria-label="Add workspace">○</button>',
    '  </div>',
    '</div>',
    '<div class="topbar-date" id="topbar-date"></div>',
    '<div class="topbar-right">',
    '  <button class="top-icon" type="button" data-toggle="sound" aria-label="Sound" aria-pressed="true">' + icon('volume', 18) + '</button>',
    '  <button class="top-icon" type="button" data-toggle="bluetooth" aria-label="Bluetooth" aria-pressed="true">' + icon('bluetooth', 18) + '</button>',
    '  <button class="top-icon" type="button" data-toggle="wifi" aria-label="Wi-Fi" aria-pressed="true">' + icon('wifi', 19) + '</button>',
    '  <button class="battery-pill" type="button" aria-label="Battery at 85 percent">' + icon('battery', 22) + '<span>85%</span></button>',
    '  <span class="top-divider"></span>',
    '  <button class="top-icon" type="button" data-action="search" aria-label="Search">' + icon('search', 20) + '</button>',
    '  <button class="top-icon" type="button" data-action="power" aria-label="Power">' + icon('power', 20) + '</button>',
    '</div>'
  ].join('');

  const date = root.querySelector('#topbar-date');
  const updateClock = () => {
    const now = new Date();
    date.textContent = new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit',
      minute: '2-digit', hour12: false
    }).format(now);
  };
  updateClock();
  const timer = setInterval(updateClock, 15000);

  root.querySelectorAll('.workspace').forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('workspace-circle')) {
        context.notify('Workspace control is a visual preview');
        return;
      }
      root.querySelectorAll('.workspace:not(.workspace-circle)').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });
  root.querySelectorAll('[data-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const active = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('muted', !active);
      context.notify(button.getAttribute('aria-label') + (active ? ' on' : ' off') + ' — preview only');
    });
  });
  root.querySelector('[data-action="search"]').addEventListener('click', () => {
    context.events.dispatchEvent(new Event('focus-search'));
  });
  root.querySelector('[data-action="power"]').addEventListener('click', () => {
    context.notify('Power menu — preview only');
  });
  root.querySelector('.battery-pill').addEventListener('click', () => {
    context.notify('Battery at 85% — sample data');
  });
  root.querySelector('.profile-chip').addEventListener('click', () => {
    context.notify('Hello, znnn');
  });

  return () => clearInterval(timer);
}
