// Year in footer
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

// Mobile nav toggle
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger?.addEventListener("click", () => {
  nav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

// Close menu on nav click (mobile)
nav?.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  })
);

// Highlight current nav link
const path = location.pathname.split("/").pop();
document.querySelectorAll("nav a").forEach(a => {
  if (a.getAttribute("href") === path) a.classList.add("active");
});
