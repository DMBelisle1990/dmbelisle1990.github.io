let content = document.getElementById('content');
let work = document.getElementById('work');
let workContent = document.getElementById('work-content');
let returnHome = document.getElementById('return-home');
work.addEventListener('click', () => {
  content.style.right = '100%';
  workContent.style.left = '0%';
});

returnHome.addEventListener('click', () => {
  content.style.right = '0';
  workContent.style.left = '100%';
});