var content = document.getElementById('content');
var work = document.getElementById('work');
var workContent = document.getElementById('work-content');
var returnHome = document.getElementById('return-home');
work.addEventListener('click', () => {
  content.style.right = '100%';
  workContent.style.left = '0%';
});

returnHome.addEventListener('click', () => {
  content.style.right = '0';
  workContent.style.left = '100%';
});