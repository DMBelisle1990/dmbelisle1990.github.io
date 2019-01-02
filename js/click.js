(function() {
  const about = document.getElementById('about');
  const work = document.getElementById('work');
  const terminal = document.getElementById('terminal');
  const chrome = document.getElementById('chrome');
  const panels = document.querySelectorAll('.panel');

  about.addEventListener('click', () => {
    panels.forEach((panel) => panel.classList.remove('last-clicked'));
    terminal.style.display = 'block';
    terminal.classList.add('last-clicked');
  });

  work.addEventListener('click', () => {
    panels.forEach((panel) => panel.classList.remove('last-clicked'));
    chrome.style.display = 'block';
    chrome.classList.add('last-clicked');
  });
})();