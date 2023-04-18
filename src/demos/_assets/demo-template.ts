const toggleDir = (): void => {
  document.dir = document.dir === "rtl" ? "ltr" : "rtl";
};

const toggleMode = (): void => {
  document.body.classList.toggle("calcite-mode-dark");
};

const closeHeader = (): void => {
  document.getElementById("demo-header")?.remove();
};

const toggleDom = ({ currentTarget }): void => {
  const mover = document.querySelector<DomSwapper>("demo-dom-swapper");
  if (!mover) {
    return;
  }
  if (currentTarget.checked) {
    mover.moveTo("shadow");
  } else {
    mover.moveTo("light");
  }
};

const loadDemoToggles = () => {
  document.querySelectorAll("h1:not(#demo-heading)").forEach((h1) => h1.remove());
  const demoHeading = document.getElementById("demo-heading");
  if (demoHeading) {
    demoHeading.textContent = document.title;
  }
  document.getElementById("toggle-dir")?.addEventListener("calciteSwitchChange", toggleDir);
  document.getElementById("toggle-mode")?.addEventListener("calciteSwitchChange", toggleMode);
  document.getElementById("toggle-dom")?.addEventListener("calciteSwitchChange", toggleDom);
  document.getElementById("close-header")?.addEventListener("click", closeHeader);
};

document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", loadDemoToggles) : loadDemoToggles();
