((): void => {
  const DEMO_ROOT = "demos";
  const ASSETS_PATH = "demos/_assets";
  const CSS = [`${ASSETS_PATH}/demos.css`, "build/calcite.css"];
  const urlParams = new URLSearchParams(window.location.search);
  const DISABLE_HEADER_URL_PARAM = "header-disabled";

  interface Script {
    src: string;
    type?: "module";
  }

  const SCRIPTS: Script[] = [
    {
      src: "build/calcite.esm.js",
      type: "module",
    },
    {
      src: "demos/_assets/demo-dom-swapper.js",
    },
  ];

  const parseTemplate = (text: string): HTMLTemplateElement | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.head.querySelector("template");
  };

  const loadHeader = async (): Promise<void> => {
    const root = window.location.pathname.split(DEMO_ROOT).shift();
    const response = await window.fetch(`${root}${ASSETS_PATH}/demo-template.html`);
    const text = await response.text();
    const template = parseTemplate(text);
    if (template) {
      const firstChild = document.body.firstChild;
      firstChild && document.body.insertBefore(template.content, firstChild);
    }
  };

  if (window.location.pathname.includes("/demos/") && !urlParams.has(DISABLE_HEADER_URL_PARAM)) {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", loadHeader) : loadHeader();
  }

  const ROOT = window.location.pathname.split(DEMO_ROOT).shift();

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
})();
