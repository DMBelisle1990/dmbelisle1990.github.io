(function () {
  let magGlass = document.getElementById('mag-glass'),
      visibleArea = document.getElementById('visible-area'),
      searcher = document.getElementById('searcher'),
      seeHow = document.getElementById('see-how'),
      logo = document.getElementById('logo'),
      yourGrade = document.getElementById('your-grade');
  
  
  function stepOne() {
    TweenLite.to(searcher, 1, {'margin-left': 5, 'margin-top': -68});
    setTimeout(stepTwo, 2000);
  }

  function stepTwo() {
    TweenLite.to(searcher, 1, {'margin-left': -100, 'margin-top': -53});
    TweenLite.to(visibleArea, 1, {'background-position': '4px -63px'});
    setTimeout(stepThree, 2000);
  }

  function stepThree() {
    TweenLite.to(searcher, 1, {'margin-left': -103, 'margin-top': 30});
    TweenLite.to(visibleArea, 1, {'background-position': '-6px -392px'});
    setTimeout(stepFour, 2000);
  }

  function stepFour() {
    TweenLite.to(searcher, 1, {'margin-left': 19, 'margin-top': -6});
    TweenLite.to(visibleArea, 1, {'background-position': '-462px -424px'});
    setTimeout(stepFive, 2000);
  }

  function stepFive() {
    TweenLite.to(searcher, 1, {'margin-left': -232, 'margin-top': -106, opacity: 0});
    TweenLite.to(magGlass, 1, {width: 500, height: 500});
    TweenLite.to(website, 1, {width: 527, top: -1, left: -402});
    TweenLite.to([lorem1, lorem2], 1, {left: -400});
    setTimeout(stepSix, 1000);
  }

  function stepSix() {
    TweenLite.to(seeHow, 1, {opacity: 1, 'margin-left': 0});
    TweenLite.to(logo, .5, {opacity: 1, 'margin-top': 0, delay: .25});
    TweenLite.to(yourGrade, .5, {opacity: 1, 'margin-top': 0, delay: .25});
  }

  window.addEventListener('DOMContentLoaded', stepOne, false);
})();