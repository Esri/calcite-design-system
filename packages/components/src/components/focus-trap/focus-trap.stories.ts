import { html } from "../../../support/formatting";

export default {
  title: "Components/Support/Focus Trap",
};

export const simple = (): string => html`
  <p>Use <code>Tab</code> to test focus looping between the inner buttons when <code>focusTrap</code> is enabled.</p>
  <calcite-button class="toggle-focus-trap" style="margin-bottom: 0.75rem" width="auto"
    >Toggle focusTrap (Off)</calcite-button
  >
  <calcite-focus-trap>
    <calcite-panel closable heading="Focus Trap Example">
      <p>
        Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum
        venenatis fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut
        auctor potenti. Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in.
        Elementum, nascetur gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan
        posuere curabitur fermentum diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus
        magnis nunc.
      </p>
      <p>
        <calcite-button width="auto">Inside button one</calcite-button>
        <calcite-button width="auto">Inside button two</calcite-button>
      </p>
    </calcite-panel>
  </calcite-focus-trap>
  <p>
    <calcite-button width="auto">Outside button</calcite-button>
  </p>
  <script>
    const toggleButton = document.querySelector(".toggle-focus-trap");
    const focusTrap = document.querySelector("calcite-focus-trap");
    const panel = focusTrap?.querySelector("calcite-panel");

    const syncButtonLabel = () => {
      if (!toggleButton || !focusTrap) {
        return;
      }

      toggleButton.textContent = "Toggle focusTrap (" + (focusTrap.focusTrap ? "On" : "Off") + ")";
    };

    if (toggleButton && focusTrap) {
      syncButtonLabel();
      focusTrap.addEventListener("calciteFocusTrapChange", syncButtonLabel);

      toggleButton.addEventListener("click", () => {
        panel.closed = false;
        focusTrap.focusTrap = !focusTrap.focusTrap;
      });

      panel?.addEventListener("calcitePanelClose", () => {
        focusTrap.focusTrap = false;
      });
    }
  </script>
`;
