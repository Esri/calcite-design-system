const toggleDir = (): void => {
  document.dir = document.dir === "rtl" ? "ltr" : "rtl";
};

const toggleTheme = (): void => {
  document.body.classList.toggle("calcite-theme-dark");
};

window.onload = () => {
  document.getElementById("demo-heading").textContent = document.title;
  document.getElementById("toggle-dir").addEventListener("calciteSwitchChange", toggleDir);
  document.getElementById("toggle-theme").addEventListener("calciteSwitchChange", toggleTheme);
};
