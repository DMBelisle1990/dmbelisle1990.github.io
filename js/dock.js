(function() {
  const about = document.getElementById('about');
  const work = document.getElementById('work');
  const terminal = document.getElementById('terminal');
  const chrome = document.getElementById('chrome');
  const panels = document.querySelectorAll('.panel');
  const dock = document.getElementById('dock');

  function showPanel(panel) {
    panels.forEach((p) => p.classList.remove('last-clicked'));
    panel.style.display = 'flex';
    panel.classList.add('last-clicked');
  }

  about.addEventListener('click', () => showPanel(terminal));

  work.addEventListener('click', () => showPanel(chrome));

  work.addEventListener('touchstart', () => {
    // dock.classList.add('collapsed');
    showPanel(chrome);
  });
})();