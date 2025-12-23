const $ = (id) => document.getElementById(id);

const form = $("cvForm");

// Preview elements
const p_fullName = $("p_fullName");
const p_email = $("p_email");
const p_phone = $("p_phone");
const p_linkedin = $("p_linkedin");
const p_education = $("p_education");
const p_skills = $("p_skills");
const p_languages = $("p_languages");
const p_workExperience = $("p_workExperience");

// Inputs
const i_fullName = $("fullName");
const i_email = $("email");
const i_phone = $("phone");
const i_linkedin = $("linkedin");
const i_education = $("education");
const i_skills = $("skills");
const i_languages = $("languages");
const i_workExperience = $("workExperience");

function setText(el, value, fallback) {
  const v = (value ?? "").trim();
  el.textContent = v ? v : fallback;
  el.classList.toggle("muted", !v);
}

function setLink(a, value, fallbackText) {
  const v = (value ?? "").trim();
  if (v) {
    a.textContent = v.replace(/^https?:\/\//, "");
    a.href = v.startsWith("http") ? v : `https://${v}`;
    a.classList.remove("muted");
  } else {
    a.textContent = fallbackText;
    a.href = "#";
    a.classList.add("muted");
  }
}

function setCommaList(ul, value, fallback) {
  const items = (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  ul.innerHTML = "";

  if (items.length === 0) {
    const li = document.createElement("li");
    li.textContent = fallback;
    ul.appendChild(li);
    ul.classList.add("muted");
    return;
  }

  ul.classList.remove("muted");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function setMultiline(el, value, fallback) {
  const v = (value ?? "").trim();
  el.innerHTML = "";

  if (!v) {
    el.textContent = fallback;
    el.classList.add("muted");
    return;
  }

  el.classList.remove("muted");

  // turn each non-empty line into a bullet-like paragraph
  v.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const p = document.createElement("p");
      p.style.margin = "0 0 6px";
      p.textContent = "• " + line;
      el.appendChild(p);
    });
}

function updatePreview() {
  setText(p_fullName, i_fullName.value, "Your Name");
  setText(p_email, i_email.value, "email@example.com");
  setText(p_phone, i_phone.value, "+972...");
  setLink(p_linkedin, i_linkedin.value, "linkedin.com");

  setText(p_education, i_education.value, "Add your education here");
  setCommaList(p_skills, i_skills.value, "Add skills (comma separated)");
  setCommaList(p_languages, i_languages.value, "Add languages (comma separated)");
  setMultiline(p_workExperience, i_workExperience.value, "Add your work experience here");
}

// Live updates
[
  i_fullName,
  i_email,
  i_phone,
  i_linkedin,
  i_education,
  i_skills,
  i_languages,
  i_workExperience,
].forEach((el) => el.addEventListener("input", updatePreview));

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page refresh
  updatePreview();
  // optional: show a small message or auto-print
});

$("resetBtn").addEventListener("click", () => {
  form.reset();
  updatePreview();
});

$("printBtn").addEventListener("click", () => {
  window.print();
});

// Initial
updatePreview();


// ===== Theme (Dark/Light) =====
const THEME_KEY = "cv_theme";
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "🌙 Dark" : "☀️ Light";
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "dark" || saved === "light") {
    setTheme(saved);
    return;
  }

  // if no saved theme, follow system preference
  const prefersDark = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

initTheme();
