(function() {
  const about = document.getElementById('about');
  const work = document.getElementById('work');
  const terminal = document.getElementById('terminal');
  const chrome = document.getElementById('chrome');
  const panels = document.querySelectorAll('.panel');
  const dock = document.getElementById('dock');

  if (window.innerWidth < 821) {
    dock.classList.add('collapsed');
    setTimeout(() => {
      dock.style.display = 'flex';
    }, 300);
  }

  function showPanel(panel) {
    panels.forEach((p) => p.classList.remove('last-clicked'));
    panel.style.display = 'flex';
    panel.classList.add('last-clicked');
  }

  about.addEventListener('click', () => showPanel(terminal));
  about.addEventListener('touchstart', () => {
    dock.classList.add('collapsed');
    showPanel(terminal);
  });

  work.addEventListener('click', () => showPanel(chrome));
  work.addEventListener('touchstart', () => {
    dock.classList.add('collapsed');
    showPanel(chrome);
  });
})();