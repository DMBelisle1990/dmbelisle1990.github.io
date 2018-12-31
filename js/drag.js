const panels = document.querySelectorAll('.panel');
const desktop = document.querySelector('#desktop');

// TODO: Add these for mobile
// desktop.addEventListener("touchstart", dragStart, false);
// desktop.addEventListener("touchend", dragEnd, false);

/**
 * Find all panels and make them draggable. If no panel-header is found the panel
 * itself may be grabbed.
 */
panels.forEach((panel) => {
  const header = panel.querySelector('.panel-header') || panel;
  header.addEventListener('mousedown', (e) => {
    const shiftX = e.clientX - panel.getBoundingClientRect().left;
    const shiftY = e.clientY - panel.getBoundingClientRect().top;

    desktop.onmousemove = (e) => {
      panel.style.left = e.pageX - shiftX + 'px';
      panel.style.top = e.pageY - shiftY + 'px';
    };
  });
});

desktop.addEventListener('mouseup', () => {
  desktop.onmousemove = null;
});

desktop.addEventListener('mouseout', (e) => {
  const from = e.relatedTarget || e.toElement;
  if (!from || from.nodeName === 'HTML') {
    desktop.onmousemove = null;
  }
});
