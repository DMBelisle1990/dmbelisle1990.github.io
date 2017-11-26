var home = document.getElementById('home');
var work = document.getElementById('work');
var workContent = document.getElementById('work-content');
var returnHome = document.getElementById('return-home');
work.addEventListener('click', () => {
  home.style.right = '100%';
  workContent.style.left = '0%';
});

returnHome.addEventListener('click', () => {
  home.style.right = '0';
  workContent.style.left = '100%';
});