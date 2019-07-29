(function() {
  const panels = document.querySelectorAll('.panel');
  const desktop = document.getElementById('desktop');
  const dock = document.getElementById('dock');

  function addButtonEvents(panel) {
    const closeButton = panel.querySelector('.red');
    const maxButton = panel.querySelector('.green');
    const minButton = panel.querySelector('.yellow');

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        panel.style.display = 'none';
        panel.classList.remove('full-screen');
        dock.classList.remove('collapsed');
      });
    }

    if (maxButton) {
      maxButton.addEventListener('click', () => {
        if (window.innerWidth < 821) return;
        dock.classList.add('collapsed');
        panel.classList.add('full-screen');
      });
    }

    if (minButton) {
      minButton.addEventListener('click', () => {
        if (window.innerWidth < 821) return;
        dock.classList.remove('collapsed');
        panel.classList.remove('full-screen');
      });
    }
  }

  /**
   * Find all panels and make them draggable. If no panel-header is found the panel
   * itself may be grabbed.
   */
  panels.forEach((panel) => {
    panel.addEventListener('mousedown', () => {
      panels.forEach((panel) => panel.classList.remove('last-clicked'));
      panel.classList.add('last-clicked');
    });

    const header = panel.querySelector('.panel-header') || panel;
    header.addEventListener('mousedown', (e) => {
      const shiftX = e.clientX - panel.getBoundingClientRect().left;
      const shiftY = e.clientY - panel.getBoundingClientRect().top;

      desktop.onmousemove = (e) => {
        panel.style.left = e.pageX - shiftX + 'px';
        panel.style.top = e.pageY - shiftY + 'px';
      };
    });

    addButtonEvents(panel);

    desktop.addEventListener('mouseup', () => desktop.onmousemove = null);

    desktop.addEventListener('mouseout', (e) => {
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        desktop.onmousemove = null;
      }
    });
  });

})();