// TODO: Add randomness to typeSpeed and startDelay

const name = document.getElementById('name');
const me = 'Daniel Belisle';
const typeSpeed = 60;
const startDelay = 700;

/**
 * Type name into terminal
 */
const enterName = function() {
  let i = 0;
  const interval = setInterval(() => {
    if (i === me.length - 1) {
      clearInterval(interval);
      // setTimeout(enterLs, startDelay);
    }

    name.innerHTML += me[i] === ' ' ? '&nbsp;' : me[i];
    i++;
  }, typeSpeed);
};

setTimeout(enterName, startDelay);