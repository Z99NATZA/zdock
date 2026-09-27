import { icon } from '../shared/icons.js';

export function mountCalendar(root) {
  root.className = 'calendar-card glass card';
  const today = new Date();
  let viewed = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  root.innerHTML = [
    '<div class="card-heading">',
    '  <h2 class="calendar-month"></h2>',
    '  <div class="calendar-actions">',
    '    <button type="button" data-direction="-1" aria-label="Previous month">' + icon('chevronLeft', 18) + '</button>',
    '    <button type="button" data-direction="1" aria-label="Next month">' + icon('chevronRight', 18) + '</button>',
    '  </div>',
    '</div>',
    '<div class="calendar-weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>',
    '<div class="calendar-days" role="grid" aria-label="Calendar dates"></div>'
  ].join('');

  const days = root.querySelector('.calendar-days');
  const render = () => {
    root.querySelector('.calendar-month').textContent = new Intl.DateTimeFormat('en-US', {
      month: 'long', year: 'numeric'
    }).format(viewed);
    const start = new Date(viewed.getFullYear(), viewed.getMonth(), 1).getDay();
    const count = new Date(viewed.getFullYear(), viewed.getMonth() + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < start; i++) cells.push('<span class="calendar-blank"></span>');
    for (let day = 1; day <= count; day++) {
      const isToday = viewed.getFullYear() === today.getFullYear() &&
        viewed.getMonth() === today.getMonth() && day === today.getDate();
      const isSelected = viewed.getFullYear() === selected.getFullYear() &&
        viewed.getMonth() === selected.getMonth() && day === selected.getDate();
      cells.push('<button class="calendar-day' + (isToday ? ' today' : '') +
        (isSelected ? ' selected' : '') + '" type="button" data-day="' + day +
        '" aria-label="' + day + ' ' + root.querySelector('.calendar-month').textContent + '">' +
        day + '</button>');
    }
    days.innerHTML = cells.join('');
  };
  render();
  root.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => {
      viewed = new Date(viewed.getFullYear(), viewed.getMonth() + Number(button.dataset.direction), 1);
      render();
    });
  });
  days.addEventListener('click', event => {
    const button = event.target.closest('[data-day]');
    if (!button) return;
    selected = new Date(viewed.getFullYear(), viewed.getMonth(), Number(button.dataset.day));
    render();
  });
}
