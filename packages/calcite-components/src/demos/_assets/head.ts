((): void => {
  const ASSETS_PATH = "/src/demos/_assets";
  const CSS = [`${ASSETS_PATH}/demos.css`];
  const urlParams = new URLSearchParams(window.location.search);
  const DISABLE_HEADER_URL_PARAM = "header-disabled";

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

  const parseTemplate = (text: string): HTMLTemplateElement | null => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.head.querySelector("template");
  };

  const loadHeader = async (): Promise<void> => {
    const response = await window.fetch(`${ROOT}${ASSETS_PATH}/demo-template.html`);
    const text = await response.text();
    const template = parseTemplate(text);
    if (template) {
      const firstChild = document.body.firstChild;
      if (firstChild) {
        document.body.insertBefore(template.content, firstChild);
      }
    }
  };

  if (window.location.pathname.includes("/src/demos/") && !urlParams.has(DISABLE_HEADER_URL_PARAM)) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadHeader);
    } else {
      loadHeader();
    }
  }

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
})();
