
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewsForm");

  console.log("JS loaded, form:", form); // בדיקה

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Your review was submitted successfully! ✅");
    form.reset();
  });
});
