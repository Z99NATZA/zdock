import { icon } from '../shared/icons.js';

export function mountMusic(root, context) {
  root.className = 'music-card glass card';
  root.innerHTML = [
    '<div class="track-row">',
    '  <div class="album-art" aria-label="Sakura themed album art"></div>',
    '  <div class="track-copy"><strong>Sakura</strong><span>Hoshimachi Suisei</span></div>',
    '  <button class="icon-button favorite active" type="button" aria-label="Favorite track" aria-pressed="true">' + icon('heart', 20) + '</button>',
    '</div>',
    '<input class="music-progress" type="range" min="0" max="252" value="87" aria-label="Track position" />',
    '<div class="music-time"><span id="elapsed">1:27</span><span>4:12</span></div>',
    '<div class="music-controls">',
    '  <button class="icon-button shuffle" type="button" aria-label="Shuffle" aria-pressed="false">' + icon('shuffle', 19) + '</button>',
    '  <button class="icon-button" type="button" data-action="back" aria-label="Previous track">' + icon('skipBack', 20) + '</button>',
    '  <button class="play-button" type="button" aria-label="Pause">' + icon('pause', 24) + '</button>',
    '  <button class="icon-button" type="button" data-action="forward" aria-label="Next track">' + icon('skipForward', 20) + '</button>',
    '  <button class="icon-button repeat" type="button" aria-label="Repeat" aria-pressed="false">' + icon('repeat', 19) + '</button>',
    '</div>'
  ].join('');

  const progress = root.querySelector('.music-progress');
  const elapsed = root.querySelector('#elapsed');
  const play = root.querySelector('.play-button');
  let playing = true;
  let position = Number(progress.value);
  const updateProgress = () => {
    progress.value = String(position);
    progress.style.setProperty('--progress', (position / 252 * 100) + '%');
    elapsed.textContent = Math.floor(position / 60) + ':' + String(position % 60).padStart(2, '0');
  };
  updateProgress();
  const timer = setInterval(() => {
    if (!playing) return;
    position = (position + 1) % 253;
    updateProgress();
  }, 1000);
  progress.addEventListener('input', () => {
    position = Number(progress.value);
    updateProgress();
  });
  play.addEventListener('click', () => {
    playing = !playing;
    play.innerHTML = icon(playing ? 'pause' : 'play', 24);
    play.setAttribute('aria-label', playing ? 'Pause' : 'Play');
  });
  root.querySelectorAll('.favorite, .shuffle, .repeat').forEach(button => {
    button.addEventListener('click', () => {
      const active = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('active', active);
    });
  });
  root.querySelector('[data-action="back"]').addEventListener('click', () => {
    position = 0;
    updateProgress();
  });
  root.querySelector('[data-action="forward"]').addEventListener('click', () => {
    position = 0;
    updateProgress();
    context.notify('Next track — preview only');
  });
  return () => clearInterval(timer);
}
