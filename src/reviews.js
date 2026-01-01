
// ✨ עובד עכשיו כי form מוגדר
form.addEventListener("submit", function (e) {
  e.preventDefault();
  showBanner();
  form.reset(); // ✨ אופציונלי – מנקה את הטופס
});