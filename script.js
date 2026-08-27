const header = document.querySelector('.topbar');
const menuButton = document.querySelector('.menu-button');
const themeButton = document.querySelector('.theme-button');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeButton.setAttribute('aria-pressed', 'true');
  themeButton.setAttribute('aria-label', 'Switch to light theme');
  themeButton.querySelector('.theme-icon').textContent = '☀';
}

themeButton.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
});

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('nav-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
