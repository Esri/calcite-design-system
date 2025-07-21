// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import {
  associateExplicitLabelToUnlabeledComponent,
  labelConnectedEvent,
  labelDisconnectedEvent,
} from "../../utils/label";
import { Alignment, Scale } from "../interfaces";
import { CSS } from "./resources";
import { styles } from "./label.scss";

declare global {
  interface DeclareElements {
    "calcite-label": Label;
  }
}

/** @slot - A slot for adding text and a component that can be labeled. */
export class Label extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** Specifies the text alignment of the component. */
  @property({ reflect: true }) alignment: Alignment = "start";

  /** Specifies the `id` of the component the label is bound to. Use when the component the label is bound to does not reside within the component. */
  @property({ reflect: true }) for: string;

  /** Defines the layout of the label in relation to the component. Use `"inline"` positions to wrap the label and component on the same line.  `"default"` is deprecated.  Use `"block"` instead. */
  @property({ reflect: true }) layout: "block" | "inline" | "inline-space-between" | "default" =
    "block";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Events

  /** @private */
  calciteInternalLabelClick = createEvent<{
    sourceEvent: MouseEvent;
  }>({ bubbles: false, cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("click", this.labelClickHandler);
  }

  override connectedCallback(): void {
    document.dispatchEvent(new CustomEvent(labelConnectedEvent));
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("for")) {
      associateExplicitLabelToUnlabeledComponent(this.el);
    }
  }

  override disconnectedCallback(): void {
    document.dispatchEvent(new CustomEvent(labelDisconnectedEvent));
  }

  // #endregion

  // #region Private Methods
  private labelClickHandler(event: MouseEvent): void {
    if (window.getSelection()?.type === "Range") {
      return;
    }

    this.calciteInternalLabelClick.emit({
      sourceEvent: event,
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <slot />
      </div>
    );
  }

  // #endregion
}
