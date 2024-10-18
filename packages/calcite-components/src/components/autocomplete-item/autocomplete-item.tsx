import { Component, Element, h, Prop, VNode } from "@stencil/core";
import { FlipContext, Scale } from "../interfaces";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { getIconScale } from "../../utils/component";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { IconNameOrString } from "../icon/interfaces";
import { SLOTS as STACK_SLOTS } from "../stack/resources";
import { CSS, SLOTS } from "./resources";

/**
 * @slot content-end - todo
 * @slot content-start - todo
 */
@Component({
  tag: "calcite-autocomplete-item",
  styleUrl: "autocomplete-item.scss",
  shadow: true,
})
export class AutocompleteItem implements InteractiveComponent, LoadableComponent {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**
   * A description for the component. Displays below the label text.
   */
  @Prop() description: string;

  /**
   * When `true`, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /** Specifies heading text for the component. */
  @Prop() heading: string;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @Prop({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @Prop({ reflect: true }) iconStart: IconNameOrString;

  /** Specifies an icon to display at the end of the component. */
  @Prop({ reflect: true }) iconEnd: IconNameOrString;

  /** Accessible name for the component. */
  @Prop() label: string;

  /**
   * Specifies the size of the component inherited from `calcite-dropdown`, defaults to `m`.
   *
   * @internal
   */
  @Prop({ reflect: true }) scale: Scale = "m";

  /**
   * The component's value.
   */
  @Prop() value: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const { heading, disabled } = this;

    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-stack class={CSS.container}>
          {this.renderIconStart()}
          <slot name={SLOTS.contentStart} slot={STACK_SLOTS.contentStart} />
          {heading}
          <slot name={SLOTS.contentEnd} slot={STACK_SLOTS.contentEnd} />
          {this.renderIconEnd()}
        </calcite-stack>
      </InteractiveContainer>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteAutocompleteItemElement;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private renderIconStart(): VNode {
    const { iconStart, iconFlipRtl } = this;

    return iconStart ? (
      <calcite-icon
        class={CSS.iconStart}
        flipRtl={iconFlipRtl === "start" || iconFlipRtl === "both"}
        icon={iconStart}
        scale={getIconScale(this.scale)}
        slot={STACK_SLOTS.contentStart}
      />
    ) : null;
  }

  private renderIconEnd(): VNode {
    const { iconEnd, iconFlipRtl } = this;

    return iconEnd ? (
      <calcite-icon
        class={CSS.iconEnd}
        flipRtl={iconFlipRtl === "end" || iconFlipRtl === "both"}
        icon={iconEnd}
        scale={getIconScale(this.scale)}
        slot={STACK_SLOTS.contentEnd}
      />
    ) : null;
  }
}
