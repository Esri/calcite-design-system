((): void => {
  const DEMO_ROOT = "demos";
  const ASSETS_PATH = "demos/_assets";

  const parseTemplate = (text: string): HTMLTemplateElement => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.head.querySelector("template");
  };

  const loadToggles = async (): Promise<void> => {
    const root = window.location.pathname.split(DEMO_ROOT).shift();
    const response = await window.fetch(`${root}${ASSETS_PATH}/nav.html`);
    const text = await response.text();
    const template = parseTemplate(text);
    const firstChild = document.body.firstChild;
    firstChild && document.body.insertBefore(template.content, firstChild);
  };

  if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", loadToggles);
  } else {
    // `DOMContentLoaded` has already fired
    loadToggles();
  }
})();
