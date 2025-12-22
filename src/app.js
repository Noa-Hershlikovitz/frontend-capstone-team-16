let currentIndex = 0;
const imagesPerSlide = 3;

function getStep() {
  const track = document.getElementById("carouselTrack");
  const firstImg = track.querySelector("img");
  if (!firstImg) return 0;

  const imgWidth = firstImg.getBoundingClientRect().width; // כולל border
  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  return imgWidth + gap;
}

function updateCarousel() {
  const track = document.getElementById("carouselTrack");
  const step = getStep();
  track.style.transform = `translateX(${-currentIndex * step}px)`;
}

function nextSlide() {
  const track = document.getElementById("carouselTrack");
  const totalImages = track.querySelectorAll("img").length;

  if (currentIndex <= totalImages - imagesPerSlide - imagesPerSlide) {
    currentIndex += imagesPerSlide;
    updateCarousel();
  }
}

function prevSlide() {
  if (currentIndex >= imagesPerSlide) {
    currentIndex -= imagesPerSlide;
    updateCarousel();
  }
}

// אופציונלי: כדי שיעדכן אם משנים גודל חלון
window.addEventListener("resize", updateCarousel);
