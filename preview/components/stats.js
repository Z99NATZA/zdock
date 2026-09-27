
export function mountStats(root) {
  root.className = 'stats-card glass card';
  const stats = [
    { name: 'CPU', value: 18, color: '#e993c2' },
    { name: 'RAM', value: 42, color: '#c37be9' },
    { name: 'Disk', value: 19, color: '#74b9fa' }
  ];
  root.innerHTML = [
    '<div class="stats-list">',
    stats.map(stat => [
      '<div class="stat">',
      '  <div class="stat-ring" style="--value: ' + stat.value + '%; --ring-color: ' + stat.color + '">',
      '    <div class="stat-ring-inner"><span>' + stat.name + '</span><strong>' + stat.value + '%</strong></div>',
      '  </div>',
      '  <span class="stat-label">' + stat.name + '</span>',
      '</div>'
    ].join('')).join(''),
    '</div>',
    '<span class="sample-indicator">Sample metrics</span>'
  ].join('');
}
