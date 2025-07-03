// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  Fragment,
  h,
  JsxNode,
  setAttribute,
  stringOrBoolean,
} from "@arcgis/lumina";
import { setRequestedIcon } from "../../utils/dom";
import { Scale, Status } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { StatusIconDefaults } from "./interfaces";
import { styles } from "./input-message.scss";
import { CSS } from "./resources";

declare global {
  interface DeclareElements {
    "calcite-input-message": InputMessage;
  }
}

/** @slot - A slot for adding text. */
export class InputMessage extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /** the computed icon to render */
  private requestedIcon?: IconNameOrString;

  //#endregion

  //#region Public Properties

  /** Specifies an icon to display. */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("status") && (this.hasUpdated || this.status !== "idle")) ||
      changes.has("icon")
    ) {
      this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const hidden = this.el.hidden;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, add a check for this.el.hasAttribute() before calling setAttribute() here */
    setAttribute(this.el, "calcite-hydrated-hidden", hidden);
    return (
      <>
        {this.renderIcon(this.requestedIcon)}
        <slot />
      </>
    );
  }

  private renderIcon(iconName: IconNameOrString): JsxNode {
    if (iconName) {
      return (
        <calcite-icon
          class={CSS.inputMessageIcon}
          flipRtl={this.iconFlipRtl}
          icon={iconName}
          scale="s"
        />
      );
    }
  }

  //#endregion
}
