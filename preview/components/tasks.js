import { icon } from '../shared/icons.js';

export function mountTasks(root) {
  root.className = 'tasks-card glass card';
  const tasks = [
    { id: 1, text: 'Finish RAG chunking', done: true },
    { id: 2, text: 'Update wfchat UI', done: true },
    { id: 3, text: 'Read Rust book', done: false },
    { id: 4, text: 'Game prototype (web)', done: false },
    { id: 5, text: 'Plan tomorrow', done: false }
  ];
  let nextId = 6;
  root.innerHTML = [
    '<div class="card-heading">',
    '  <h2>Today</h2>',
    '  <div class="tasks-actions"><span class="tasks-count"></span><button class="round-add" type="button" aria-label="Add task">' + icon('plus', 17) + '</button></div>',
    '</div>',
    '<ul class="task-list"></ul>',
    '<form class="task-form" hidden><input type="text" maxlength="80" placeholder="New task..." aria-label="New task" /><button type="submit">Add</button></form>'
  ].join('');

  const list = root.querySelector('.task-list');
  const form = root.querySelector('.task-form');
  const input = form.querySelector('input');
  const render = () => {
    root.querySelector('.tasks-count').textContent = tasks.filter(task => task.done).length + '/' + tasks.length;
    list.innerHTML = tasks.map(task => [
      '<li class="task-row' + (task.done ? ' done' : '') + '">',
      '  <label><input type="checkbox" data-id="' + task.id + '"' + (task.done ? ' checked' : '') + ' />',
      '  <span class="task-checkbox">' + icon('check', 14) + '</span><span class="task-text">' + task.text + '</span></label>',
      '</li>'
    ].join('')).join('');
  };
  render();
  list.addEventListener('change', event => {
    const checkbox = event.target.closest('input[data-id]');
    if (!checkbox) return;
    const task = tasks.find(item => item.id === Number(checkbox.dataset.id));
    if (task) task.done = checkbox.checked;
    render();
  });
  root.querySelector('.round-add').addEventListener('click', () => {
    form.hidden = !form.hidden;
    if (!form.hidden) input.focus();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ id: nextId++, text, done: false });
    input.value = '';
    form.hidden = true;
    render();
  });
}
