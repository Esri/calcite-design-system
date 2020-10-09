((): void => {
  const IS_IE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
  if (!IS_IE11) {
    const DEMO_ROOT = "demos";
    const ASSETS_PATH = "demos/_assets";

    const parseTemplate = (text: string): HTMLTemplateElement => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      return doc.head.querySelector("template");
    };

    let components: HTMLElement[] = null;
    const excludedComponents = ["calcite-button"];
    const toggleProperty = (property: string): void => {
      components = components || Array.from(document.body.querySelectorAll("[calcite-hydrated]"));

      components.forEach((component) => {
        if (!excludedComponents.includes(component.tagName.toLowerCase())) {
          component.toggleAttribute(property);
        }
      });
    };

    const attachHandlers = (): void => {
      const buttons = document.querySelectorAll<HTMLButtonElement>(".toggles calcite-button");
      buttons.forEach((button) =>
        button.addEventListener("click", (event) => toggleProperty((event.target as HTMLElement).dataset.jsId))
      );
    };

    const loadToggles = async (): Promise<void> => {
      const root = window.location.pathname.split(DEMO_ROOT).shift();
      const response = await window.fetch(`${root}${ASSETS_PATH}/toggles.template`);
      const text = await response.text();
      const template = parseTemplate(text);
      const firstChild = document.body.firstChild;
      firstChild && document.body.insertBefore(template.content, firstChild);
      attachHandlers();
    };

    if (document.readyState === "loading") {
      // Loading hasn't finished yet
      document.addEventListener("DOMContentLoaded", loadToggles);
    } else {
      // `DOMContentLoaded` has already fired
      loadToggles();
    }
  }
})();
