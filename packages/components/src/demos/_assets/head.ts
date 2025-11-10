((): void => {
  const ASSETS_PATH = "/src/demos/_assets";
  const CSS = [`${ASSETS_PATH}/demos.css`];

  interface Script {
    src: string;
    type?: "module";
  }

  const SCRIPTS: Script[] = [
    {
      src: "/src/demos/_assets/demo-dom-swapper.ts",
    },
    {
      src: "/src/demos/_assets/demo-theme.ts",
      type: "module",
    },
  ];

  const ROOT = "";

  function loadCss(url: string): void {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = ROOT + url;
    document.head.appendChild(link);
  }

  function loadScript(script: Script): void {
    const scriptElement = document.createElement("script");

    Object.keys(script).forEach((key) => {
      scriptElement[key] = key === "src" ? ROOT + script[key] : script[key];
    });

    document.head.appendChild(scriptElement);
  }

  CSS.forEach(loadCss);
  SCRIPTS.forEach(loadScript);

  document.addEventListener("DOMContentLoaded", () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      document.body.classList.add("calcite-mode-dark");
    } else {
      document.body.classList.remove("calcite-mode-dark");
    }
  });
})();
