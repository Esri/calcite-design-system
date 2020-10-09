import { Component, Host, h, Element, Prop, VNode, Listen } from "@stencil/core";
import { focusElement } from "../../utils/dom";
import { Scale, Theme } from "../../interfaces/common";

type OptionOrGroup = HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement;
type NativeOptionOrGroup = HTMLOptionElement | HTMLOptGroupElement;

function isOption(optionOrGroup: OptionOrGroup): optionOrGroup is HTMLCalciteOptionElement {
  return optionOrGroup.tagName === "CALCITE-OPTION";
}

function isOptionGroup(
  optionOrGroup: OptionOrGroup
): optionOrGroup is HTMLCalciteOptionGroupElement {
  return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}

@Component({
  tag: "calcite-select",
  styleUrl: "calcite-select.scss",
  shadow: true
})
export class CalciteSelect {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  /**
   * When true, it prevents the option from being selected.
   */
  @Prop({
    reflect: true
  })
  disabled = false;

  /**
   * The component scale.
   */
  @Prop({
    reflect: true
  })
  scale: Scale = "m";

  /**
   * The component theme.
   */
  @Prop({
    reflect: true
  })
  theme: Theme = "light";

  //--------------------------------------------------------------------------
  //
  //  Variables
  //
  //--------------------------------------------------------------------------

  @Element()
  private el: HTMLCalciteSelectElement;

  private componentToNativeEl = new Map<OptionOrGroup, NativeOptionOrGroup>();

  private mutationObserver = new MutationObserver(() => this.populateInternalSelect());

  private selectEl: HTMLSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback(): void {
    const { el } = this;

    this.mutationObserver.observe(el, {
      subtree: true,
      childList: true
    });
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  async setFocus(): Promise<void> {
    focusElement(this.el);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Listen("calciteOptionChange")
  @Listen("calciteOptionGroupChange")
  protected handleOptionOrGroupChange(event: CustomEvent): void {
    event.stopPropagation();

    const nativeEl = this.componentToNativeEl.get(event.target as OptionOrGroup);

    if (!nativeEl) {
      return;
    }

    this.syncProps(nativeEl, event.target as OptionOrGroup);
  }

  private syncProps(nativeOptionOrGroup: NativeOptionOrGroup, optionOrGroup: OptionOrGroup): void {
    nativeOptionOrGroup.disabled = optionOrGroup.disabled;
    nativeOptionOrGroup.label = optionOrGroup.label;

    if (isOption(optionOrGroup)) {
      const option = nativeOptionOrGroup as HTMLOptionElement;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private populateInternalSelect = (): void => {
    this.emptyInternalSelect();

    Array.from(this.el.children as HTMLCollectionOf<OptionOrGroup>).forEach((optionOrGroup) =>
      this.selectEl.append(this.toNativeElement(optionOrGroup as any))
    );
  };

  private emptyInternalSelect(): void {
    Array.from(this.selectEl.children as HTMLCollectionOf<NativeOptionOrGroup>).forEach(
      (optionOrGroup) => {
        this.componentToNativeEl.clear();
        optionOrGroup.remove();
      }
    );
  }

  private storeSelectRef = (node: HTMLSelectElement): void => {
    this.selectEl = node;
    this.populateInternalSelect();
  };

  private toNativeElement(
    optionOrGroup: HTMLCalciteOptionElement | HTMLCalciteOptionGroupElement
  ): NativeOptionOrGroup {
    if (isOption(optionOrGroup)) {
      const option = document.createElement("option");

      option.disabled = optionOrGroup.disabled;
      option.label = optionOrGroup.label;
      option.selected = optionOrGroup.selected;
      option.value = optionOrGroup.value;

      this.componentToNativeEl.set(optionOrGroup, option);

      return option;
    }

    if (isOptionGroup(optionOrGroup)) {
      const group = document.createElement("optgroup");

      group.disabled = optionOrGroup.disabled;
      group.label = optionOrGroup.label;

      Array.from(optionOrGroup.children).forEach((option) => {
        const nativeOption = this.toNativeElement(option as HTMLCalciteOptionElement);
        group.append(nativeOption);
        this.componentToNativeEl.set(optionOrGroup, nativeOption);
      });

      this.componentToNativeEl.set(optionOrGroup, group);

      return group;
    }

    throw new Error("unsupported element child provided");
  }

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <select disabled={this.disabled} ref={this.storeSelectRef}>
          <slot />
        </select>
      </Host>
    );
  }
}
