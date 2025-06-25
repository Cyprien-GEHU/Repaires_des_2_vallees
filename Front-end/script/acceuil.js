let currentIndex = 0;

const track = document.getElementById('imageTrack');
const upBtn = document.getElementById('arrowUp');
const downBtn = document.getElementById('arrowDown');
const images = track.querySelectorAll('img');

function updateImagePosition() {
  const offset = currentIndex * 600;
  track.style.transform = `translateY(-${offset}px)`;
}

// Flèche haut
upBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateImagePosition();
  }
});

// Flèche bas
downBtn.addEventListener('click', () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateImagePosition();
  }
});
