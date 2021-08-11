((): void => {
  const DEMO_ROOT = "demos";
  const ASSETS_PATH = "demos/_assets";
  const DISABLE_HEADER_URL_PARAM = "disable-header";

  const parseTemplate = (text: string): HTMLTemplateElement => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.head.querySelector("template");
  };

  const loadHeader = async (): Promise<void> => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has(DISABLE_HEADER_URL_PARAM)) {
      return;
    }

    const root = window.location.pathname.split(DEMO_ROOT).shift();
    const response = await window.fetch(`${root}${ASSETS_PATH}/demo-template.html`);
    const text = await response.text();
    const template = parseTemplate(text);
    const firstChild = document.body.firstChild;
    firstChild && document.body.insertBefore(template.content, firstChild);
  };

  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", loadHeader);
  } else {
    // `DOMContentLoaded` has already fired
    loadHeader();
  }
})();
