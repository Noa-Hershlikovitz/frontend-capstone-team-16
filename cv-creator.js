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

// ===== CV Color (Background) =====
const COLOR_KEY = "cv_color";
const colorPicker = $("colorPicker");
const cvPreview = $("cvPreview");

function getTextColorForBg(hex) {
  const h = String(hex || "#ffffff").replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 140 ? "#ffffff" : "#111827";
}

function setCvColor(hex) {
  const v = (hex || "").trim() || "#ffffff";
  if (cvPreview) {
    cvPreview.style.setProperty("--cv-bg", v);
    cvPreview.style.setProperty("--cv-text", getTextColorForBg(v));
  }
  localStorage.setItem(COLOR_KEY, v);
  if (colorPicker) colorPicker.value = v;
}

function initCvColor() {
  const saved = localStorage.getItem(COLOR_KEY);
  setCvColor(saved || (colorPicker ? colorPicker.value : "#ffffff"));
}

if (colorPicker) {
  colorPicker.addEventListener("input", (e) => {
    setCvColor(e.target.value);
  });
}

// ===== Preview text helpers =====
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
].forEach((el) => el && el.addEventListener("input", updatePreview));

// Buttons
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updatePreview();
  });
}

$("resetBtn")?.addEventListener("click", () => {
  form?.reset();
  updatePreview();

  // Reset CV background color to white
  setCvColor("#ffffff");
  localStorage.removeItem(COLOR_KEY);
});

$("printBtn")?.addEventListener("click", () => {
  window.print();
});

// ===== Theme (Dark/Light) + Logo swap =====
const THEME_KEY = "cv_theme";
const themeToggle = document.getElementById("themeToggle");

// ננסה קודם לפי id, ואם אין – ניקח את התמונה הראשונה בתוך ה-navbar
const navLogo =
  document.getElementById("navLogo") ||
  document.querySelector(".navbar img[alt='small_Logo']") ||
  document.querySelector(".navbar img");

const footerLogo = document.getElementById("footerLogo");


// ✅ paths (שים לב: assets ולא assest)
const LOGO_DARK = "./src/assets/small_logo_dark_mode.png";
const LOGO_LIGHT = "./src/assets/small_logo_light_mode.png";

function applyLogo(theme) {
  const src = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;

  if (navLogo) {
    navLogo.src = src;
  }

  if (footerLogo) {
    footerLogo.src = src;
  }
}


function setTheme(theme) {
  // ✅ חשוב: dataTheme (ולא dataTheme)
  document.documentElement.setAttribute("dataTheme", theme);
  localStorage.setItem(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "🌙 Dark" : "☀️ Light";
  }

  applyLogo(theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "dark" || saved === "light") {
    setTheme(saved);
    return;
  }

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  setTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("dataTheme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// להבטיח שה-DOM נטען לפני init (במיוחד אם בעתיד תזיז את הסקריפט ל-head)
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
});

// ===== Init =====
initCvColor();
updatePreview();
