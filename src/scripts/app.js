let currentIndex = 0;
const MOVE_BY = 1;

let cached = {
  track: null,
  win: null,
  imgs: [],
};

let metrics = {
  step: 0,
  gap: 0,
  visibleCount: 1,
  maxIndex: 0,
};

function getCarouselEls() {
  if (cached.track) return cached;

  const track = document.getElementById("carouselTrack");
  if (!track) return { track: null, win: null, imgs: [] };

  const win =
    track.closest(".CvCarousel")?.querySelector(".CarouselWindow") || null;
  const imgs = Array.from(track.querySelectorAll("img"));

  cached = { track, win, imgs };
  return cached;
}

function computeMetrics() {
  const { track, win, imgs } = getCarouselEls();
  if (!track || !win || imgs.length === 0) return false;

  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  const firstImg = imgs[0];
  const imgRect = firstImg.getBoundingClientRect();
  const winRect = win.getBoundingClientRect();

  const step = imgRect.width + gap;
  if (!step) return false;

  const visible = Math.max(1, Math.floor((winRect.width + gap) / step));
  const maxIndex = Math.max(0, imgs.length - visible);

  metrics = { step, gap, visibleCount: visible, maxIndex };
  return true;
}

function clampIndex(index) {
  return Math.max(0, Math.min(index, metrics.maxIndex));
}

function applyTransform() {
  const { track } = getCarouselEls();
  if (!track) return;

  track.style.willChange = "transform";
  track.style.transform = `translateX(${-currentIndex * metrics.step}px)`;

  window.clearTimeout(applyTransform._t);
  applyTransform._t = window.setTimeout(() => {
    track.style.willChange = "auto";
  }, 600);
}

function updateCarousel({ clamp = true } = {}) {
  const ok = computeMetrics();
  if (!ok) return;

  if (clamp) currentIndex = clampIndex(currentIndex);
  applyTransform();
}

function nextSlide() {
  const ok = computeMetrics();
  if (!ok) return;

  currentIndex = clampIndex(currentIndex + MOVE_BY);
  applyTransform();
}

function prevSlide() {
  const ok = computeMetrics();
  if (!ok) return;

  currentIndex = clampIndex(currentIndex - MOVE_BY);
  applyTransform();
}

let resizeTimer = null;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => updateCarousel({ clamp: true }), 120);
});

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => updateCarousel({ clamp: true }));
});
