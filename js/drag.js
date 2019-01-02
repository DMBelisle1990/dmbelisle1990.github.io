(function() {
  const panels = document.querySelectorAll('.panel');
  const desktop = document.getElementById('desktop');

  // TODO: Add these for mobile
  // desktop.addEventListener("touchstart", dragStart, false);
  // desktop.addEventListener("touchend", dragEnd, false);

  /**
   * Find all panels and make them draggable. If no panel-header is found the panel
   * itself may be grabbed.
   */
  panels.forEach((panel) => {
    panel.addEventListener('mousedown', (e) => {
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

    const closeButton = panel.querySelector('.red');
    if (closeButton) {
      closeButton.addEventListener('click', () => panel.style.display = 'none');
    }

    desktop.addEventListener('mouseup', () => {
      desktop.onmousemove = null
    });

    desktop.addEventListener('mouseout', (e) => {
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        desktop.onmousemove = null;
      }
    });
  });

})();