import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { isActivationKey } from "../../utils/key";
import { getLabelText } from "../../utils/label";
import { type LabelableComponent, useLabel } from "../../controllers/useLabel";
import { Scale } from "../types";
import type { Label } from "../label/label";
import { InternalLabel } from "../functional/InternalLabel";
import { useFocusable } from "../../controllers/useFocusable";
import { useInteractive } from "../../controllers/useInteractive";
import { useForm } from "../../controllers/useForm";
import { CSS } from "./resources";
import { styles } from "./switch.scss";

declare global {
  interface DeclareElements {
    "calcite-switch": Switch;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     *
     * @public
     */
    "--calcite-switch-background-color": "*";
    /**
     * Specifies the component's background color when hovered or pressed.
     *
     * @public
     */
    "--calcite-switch-background-color-hover": "*";
    /**
     * Specifies the component's border color.
     *
     * @deprecated in v3.2.0, removal target v6.0.0 - No longer necessary.
     * @public
     */
    "--calcite-switch-border-color": "*";
    /**
     * Specifies the component's corner radius.
     *
     * @public
     */
    "--calcite-switch-corner-radius": "*";
    /**
     * Specifies the handle's background color.
     *
     * @public
     */
    "--calcite-switch-handle-background-color": "*";
    /**
     * Specifies the handle's border color.
     *
     * @deprecated in v3.2.0, removal target v6.0.0 - No longer necessary.
     * @public
     */
    "--calcite-switch-handle-border-color": "*";
    /**
     * Specifies the handle's shadow.
     *
     * @deprecated in v3.2.0, removal target v6.0.0 - No longer necessary.
     * @public
     */
    "--calcite-switch-handle-shadow": "*";
  }
}

/** @public */
export class Switch extends LitElement implements LabelableComponent {
  //#region Static Members

  static formAssociated = true;

  static override styles = styles;

  //#endregion

  //#region Private Properties

  defaultChecked?: boolean;

  defaultValue?: Switch["checked"];

  formSupport = useForm<this>({
    inputType: "checkbox",
  })(this);

  labelEl?: Label["el"];

  private switchRef = createRef<HTMLDivElement>();

  private focusSetter = useFocusable<this>()(this);

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) checked = false;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   *
   * @public
   */
  @property({ reflect: true }) disabled = false;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) form?: string;

  /**
   * @public
   * @copyDoc
   */
  @property() label?: string;

  /**
   * Specifies the component's end label text.
   *
   * @public
   */
  @property() labelTextEnd?: string;

  /**
   * Specifies the component's start label text.
   *
   * @public
   */
  @property() labelTextStart?: string;

  /**
   * @public
   * @copyDoc
   */
  @property({ reflect: true }) name?: string;

  /**
   * When `true` and the component resides in a form,
   * the component must have a value in order for the form to submit.
   *
   * @public
   */
  @property({ reflect: true }) required = false;

  /**
   * Specifies the component's size.
   *
   * @public
   */
  @property({ reflect: true }) scale: Scale = "m";

  /**
   * @public
   * @copyDoc
   * @see [MDN - ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property({ readOnly: true }) validity!: ValidityState;

  /**
   * The component's value.
   *
   * @public
   */
  @property() value: any;

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component.
   *
   * @public
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   * @see [MDN - focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => this.switchRef.value, options);
  }

  //#endregion

  //#region Events

  /**
   * Fires when the `checked` value has changed.
   *
   * @public
   */
  calciteSwitchChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  constructor() {
    super();
    useLabel(this);
    this.listen("click", this.clickHandler);
    this.listen("keydown", this.keyDownHandler);
  }

  //#endregion

  //#region Private Methods

  private keyDownHandler(event: KeyboardEvent): void {
    if (!this.disabled && isActivationKey(event.key)) {
      this.toggle();
      event.preventDefault();
    }
  }

  onLabelClick(): void {
    if (!this.disabled) {
      this.toggle();
      this.setFocus();
    }
  }

  private toggle(): void {
    this.checked = !this.checked;
    this.calciteSwitchChange.emit();
  }

  private clickHandler(): void {
    if (this.disabled) {
      return;
    }

    this.toggle();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return (
      <this.interactiveContainer disabled={this.disabled}>
        <div
          ariaChecked={this.checked}
          ariaLabel={getLabelText(this)}
          class={CSS.container}
          ref={this.switchRef}
          role="switch"
          tabIndex={0}
        >
          {this.labelTextStart && (
            <InternalLabel
              alignmentCenter={true}
              bottomSpacingDisabled={true}
              labelText={this.labelTextStart}
              spacingInlineEnd={true}
            />
          )}
          <div class={CSS.track}>
            <div class={CSS.handle} />
          </div>
          {this.labelTextEnd && (
            <InternalLabel
              alignmentCenter={true}
              bottomSpacingDisabled={true}
              labelText={this.labelTextEnd}
              spacingInlineStart={true}
            />
          )}
        </div>
      </this.interactiveContainer>
    );
  }

  //#endregion
}
