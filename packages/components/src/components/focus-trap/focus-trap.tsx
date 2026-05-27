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

  private _active = false;

  private focusTrapController = useFocusTrap<this>({
    focusTrapOptions: {
      onActivate: () => {
        this.setActive(true);
      },
      onDeactivate: () => {
        this.setActive(false);
      },
    },
  })(this);

  //#endregion

  //#region Public Properties

  /** When `true`, prevents focus trapping. */
  @property({ reflect: true }) focusTrapDisabled = false;

  /** Indicates whether the component's focus trap is currently active. */
  @property()
  get active(): boolean {
    return this._active;
  }

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
  @property() focusTrapOptions?: Partial<FocusTrapOptions>;

  //#endregion

  //#region Public Methods

  /** Activates the component's focus trap. */
  @method()
  async activate(): Promise<void> {
    this.focusTrapController.activate();
  }

  /** Deactivates the component's focus trap. */
  @method()
  async deactivate(): Promise<void> {
    this.focusTrapController.deactivate();
  }

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

  /** Fires when the focus-trap active state has changed. */
  calciteFocusTrapActiveChange = createEvent<void>({ cancelable: false });

  //#endregion

  //#region Private Methods

  private setActive(active: boolean): void {
    if (this._active === active) {
      return;
    }

    const oldActive = this._active;
    this._active = active;
    this.requestUpdate("active", oldActive);

    if (this.el.isConnected) {
      this.calciteFocusTrapActiveChange.emit();
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <slot />;
  }

  //#endregion
}
