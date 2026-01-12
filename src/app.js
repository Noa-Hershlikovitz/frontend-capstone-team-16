let currentIndex = 0;
const MOVE_BY = 1;

function getCarouselEls() {
  const track = document.getElementById("carouselTrack");
  if (!track) return { track: null, win: null, imgs: [] };

  const win = track.closest(".CvCarousel")?.querySelector(".CarouselWindow") || null;
  const imgs = Array.from(track.querySelectorAll("img"));
  return { track, win, imgs };
}

function getStep(track, firstImg) {
  if (!track || !firstImg) return 0;

  const imgWidth = firstImg.getBoundingClientRect().width; // כולל border
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  return imgWidth + gap;
}

function getVisibleCount(win, step, gap) {
  if (!win || !step) return 1;

  const w = win.getBoundingClientRect().width;
  const visible = Math.floor((w + gap) / step);
  return Math.max(1, visible);
}

function clampIndex(index, maxIndex) {
  return Math.max(0, Math.min(index, maxIndex));
}

function updateCarousel({ clamp = true } = {}) {
  const { track, win, imgs } = getCarouselEls();
  if (!track || imgs.length === 0) return;

  const firstImg = imgs[0];
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const step = getStep(track, firstImg);
  if (!step) return;

  const visibleCount = getVisibleCount(win, step, gap);
  const maxIndex = Math.max(0, imgs.length - visibleCount);

  if (clamp) currentIndex = clampIndex(currentIndex, maxIndex);

  track.style.transform = `translateX(${-currentIndex * step}px)`;
}

function nextSlide() {
  const { track, win, imgs } = getCarouselEls();
  if (!track || imgs.length === 0) return;

  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const step = getStep(track, imgs[0]);
  const visibleCount = getVisibleCount(win, step, gap);
  const maxIndex = Math.max(0, imgs.length - visibleCount);

  currentIndex = clampIndex(currentIndex + MOVE_BY, maxIndex);
  updateCarousel({ clamp: false });
}

function prevSlide() {
  currentIndex = Math.max(0, currentIndex - MOVE_BY);
  updateCarousel({ clamp: false });
}

window.addEventListener("resize", () => updateCarousel({ clamp: true }));
window.addEventListener("load", () => updateCarousel({ clamp: true }));
document.addEventListener("DOMContentLoaded", () => updateCarousel({ clamp: true }));
