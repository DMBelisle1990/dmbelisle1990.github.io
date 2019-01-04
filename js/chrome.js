(function() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const windows = Array.from(document.querySelectorAll('.window'));
  let activeIndex = 0;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs[activeIndex].classList.remove('active');
      windows[activeIndex].classList.remove('active');
      activeIndex = tabs.indexOf(tab);
      tabs[activeIndex].classList.add('active');
      windows[activeIndex].classList.add('active');
    })
  });
})();