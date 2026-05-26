import { PropertyValues } from "lit";
import { createEvent, h, JsxNode, LitElement, method, property } from "@arcgis/lumina";
import { FocusTrapOptions, useFocusTrap } from "../../controllers/useFocusTrap";
import { styles } from "./focus-trap.scss";

declare global {
  interface DeclareElements {
    "calcite-focus-trap": FocusTrap;
  }
}

/** @slot - A slot for adding focus-trapped content. */
export class FocusTrap extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private focusTrapController = useFocusTrap<this>({
    triggerProp: "focusTrap",
    focusTrapOptions: {
      onDeactivate: () => {
        if (this.focusTrap) {
          this.focusTrap = false;
        }
      },
    },
  })(this);

  //#endregion

  //#region Public Properties

  /** When `true`, activates the component's focus trap. */
  @property({ reflect: true }) focusTrap = false;

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /** When defined, provides a condition to disable focus trapping. When `true`, prevents focus trapping. */
  @property() focusTrapDisabledOverride?: () => boolean;

  /**
   * Specifies custom focus trap configuration on the component, where
   *
   * `"allowOutsideClick"` allows outside clicks,
   * `"initialFocus"` enables initial focus,
   * `"returnFocusOnDeactivate"` returns focus when not active,
   * `"extraContainers"` specifies additional focusable elements external to the trap, and
   * `"setReturnFocus"` customizes the element to which focus is returned when the trap is deactivated.
   */
  @property() focusTrapOptions: Partial<FocusTrapOptions>;

  //#endregion

  //#region Public Methods

  /**
   * Updates the element(s) that are included in the focus-trap of the component.
   *
   * @param extraContainers - Additional elements to include in the focus trap. This is useful for including elements that may have related parts rendered outside the main focus trapping element.
   */
  @method()
  async updateFocusTrapElements(
    extraContainers?: FocusTrapOptions["extraContainers"],
  ): Promise<void> {
    this.focusTrapController.setExtraContainers(extraContainers);
    this.focusTrapController.updateContainerElements();
  }

  //#endregion

  //#region Events

  /** Fires when the `focusTrap` value has changed. */
  calciteFocusTrapChange = createEvent<boolean>({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override updated(changes: PropertyValues<this>): void {
    if (changes.has("focusTrap")) {
      if (this.el.isConnected) {
        this.calciteFocusTrapChange.emit(this.focusTrap);
      }

      if (this.focusTrap) {
        this.focusTrapController.activate();
      } else {
        this.focusTrapController.deactivate();
      }
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot />;
  }

  //#endregion
}
