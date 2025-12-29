// ✨ חדש – תפיסת הטופס לפי class
const form = document.querySelector(".testimonial-form");

const banner = document.getElementById("success-banner");

function showBanner() {
  banner.style.display = "block";

  setTimeout(() => {
    banner.style.display = "none";
  }, 3000);
}

// ✨ עובד עכשיו כי form מוגדר
form.addEventListener("submit", function (e) {
  e.preventDefault();
  showBanner();
  form.reset(); // ✨ אופציונלי – מנקה את הטופס
});
