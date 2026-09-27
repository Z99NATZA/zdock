import { icon } from '../shared/icons.js';

export function mountClockWeather(root) {
  root.className = 'clock-card glass card';
  root.innerHTML = [
    '<div class="clock-half">',
    '  <div class="hero-time" id="hero-time"></div>',
    '  <div class="hero-date" id="hero-date"></div>',
    '</div>',
    '<div class="clock-rule"></div>',
    '<div class="weather-half">',
    '  <div class="weather-head"><div class="weather-symbol"><span class="weather-moon">' + icon('moon', 30) + '</span>' + icon('cloud', 54) + '<span class="weather-spark">✦</span></div><div><strong>24°</strong><span>Partly cloudy</span></div></div>',
    '  <div class="weather-range"><span>↑ 29°</span><span>↓ 22°</span></div>',
    '  <div class="weather-location">⌖ &nbsp; Bangkok · sample weather</div>',
    '</div>'
  ].join('');

  const time = root.querySelector('#hero-time');
  const date = root.querySelector('#hero-date');
  const update = () => {
    const now = new Date();
    time.textContent = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', hour12: false}).format(now);
    date.textContent = new Intl.DateTimeFormat('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}).format(now);
  };
  update();
  const timer = setInterval(update, 15000);
  return () => clearInterval(timer);
}
