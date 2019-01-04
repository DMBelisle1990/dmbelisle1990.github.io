(function() {
  // TODO: Add randomness to typeSpeed and startDelay
  const typeSpeed = 60;
  const typeDelay = 700;
  const enterDelay = 300;
  const blank = document.getElementById('blank');
  const terminalLines = [
    {
      activeEl: document.getElementById('ls'),
      command: 'ls',
      resultingEl: document.getElementById('my-contact')
    },
    {
      activeEl: document.getElementById('whoami'),
      command: 'whoami',
      resultingEl: document.getElementById('my-name')
    }
  ];


  /**
   * Recursively type each terminal command and display corresponding results
   *
   * @param {HTMLElement} activeEl - element containing command
   * @param {String} command - command to be typed
   * @param {HTMLElement} resultingEl - element containing results
   */
  function type({activeEl, command, resultingEl}) {
    activeEl.style.display = 'block';
    activeEl.classList.add('active');
    setTimeout(() => {
      let i = 0;

      const typeLetter = setInterval(() => {
        if (i === command.length - 1) {
          clearInterval(typeLetter);

          setTimeout(() => {
            resultingEl.style.display = 'block';
            activeEl.classList.remove('active');

            if (terminalLines.length) {
              type(terminalLines.pop());
            } else {
              blank.style.display = 'block';
              blank.classList.add('active');
            }
          }, enterDelay);
        }

        activeEl.innerHTML += command[i] === ' ' ? '&nbsp;' : command[i];
        i++;
      }, typeSpeed);
    }, typeDelay);
  }

  type(terminalLines.pop());
})();