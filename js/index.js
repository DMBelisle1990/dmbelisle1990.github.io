var home = document.getElementById('home');
var work = document.getElementById('work');
var workContent = document.getElementById('work-content');
var returnHome = document.getElementById('return-home');
var modalOverlay = document.getElementById('modal-overlay');
var modalToggles = document.getElementsByClassName('open-modal');
var modalOpen = false;

function toggleModal() {
  modalOverlay.classList.toggle('visible');
  if (modalOpen) {

  } else {

  }
  modalOpen = !modalOpen;
}

Array.from(modalToggles).forEach(element => {
  element.addEventListener('click', toggleModal)
});

work.addEventListener('click', () => {
  home.style.right = '100%';
  workContent.style.left = '0%';
});

returnHome.addEventListener('click', () => {
  home.style.right = '0';
  workContent.style.left = '100%';
});

