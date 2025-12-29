const form = document.querySelector(".testimonial-form");

const banner = document.getElementById("success-banner");

function showBanner() {
  banner.style.display = "block";

  setTimeout(() => {
    banner.style.display = "none";
  }, 3000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  showBanner();
  form.reset(); 
});
