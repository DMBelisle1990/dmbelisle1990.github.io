let content = document.getElementById('content');
let work = document.getElementById('work');
let temp = document.getElementById('temp');
work.addEventListener('click', () => {
  content.style.right = '100%';
  temp.style.left = '10%';
});

temp.addEventListener('click', () => {
  content.style.right = '0';
  temp.style.left = '100%';
});