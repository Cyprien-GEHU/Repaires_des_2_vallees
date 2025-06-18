document.getElementById('btn-articles').addEventListener('click', () => {
  window.location.href = 'manage.html?type=articles';
});

document.getElementById('btn-events').addEventListener('click', () => {
  window.location.href = 'manage.html?type=events';
});

document.getElementById('btn-agenda').addEventListener('click', () => {
  window.location.href = 'manage.html?type=agenda';
});
