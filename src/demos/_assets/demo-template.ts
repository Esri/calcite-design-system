const toggleDir = (): void => {
  document.dir = document.dir === "rtl" ? "ltr" : "rtl";
};

const toggleTheme = (): void => {
  document.body.classList.toggle("calcite-theme-dark");
};

window.onload = () => {
  document.getElementById("toggle-dir").addEventListener("click", toggleDir);
  document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
};
