(function() {
  const NUM_SLICES = 203;
  let bonusPtsDark = document.getElementById('bonusPtsDark');
  let tl = new TimelineLite();

  function shineText() {
    let spans = [];
    for (let i = 0; i < NUM_SLICES; i++) {
      let span = document.createElement('span');
      TweenLite.set(span, {
        width: 1,
        left: i
      });
      bonusPtsDark.appendChild(span);
      spans.push(span);
    }
    tl.staggerTo(spans, 1, {
      opacity: 1
    }, .003).staggerTo(spans, 1, {
      opacity: 0
    }, .003, '-= 1.4');
  }

  function startAnimation() {
    tl.set(bonusPtsWhite, {
      opacity: 0,
      rotationX: 90,
      transformPerspective: 400,
      perspective: 400,
      transformStyle: 'preserve-3d'
    }).set(fivePts, {
      opacity: 1,
      transformPerspective: 400,
      perspective: 400,
      transformStyle: 'preserve-3d'
    }).set(freeNight, {
      opacity: 0,
      rotationX: 90,
      transformPerspective: 400,
      perspective: 400,
      transformStyle: 'preserve-3d'
    }).to(bonusPtsWhite, .75, {
      rotationX: 0,
      opacity: 1
    }, '+=.7');
    shineText();
    tl.to(fivePts, .75, {
      rotationX: -90,
      opacity: 0
    }, "-=.2").to(freeNight, .75, {
      rotationX: 0,
      opacity: 1
    }).set(cardShine, {
      top: "-30%",
      left: "-30%"
    });
    tl.play();
  }

  window.addEventListener('DOMContentLoaded', startAnimation, false);

  // Pause animation when space is pressed
  document.onkeypress = e => {
    if (e.keyCode == '32') {
      tl.paused() ? tl.play() : tl.pause();
    }
  };
})();
