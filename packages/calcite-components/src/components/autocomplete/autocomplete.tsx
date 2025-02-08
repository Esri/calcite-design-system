import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { useWatchAttributes } from "@arcgis/components-controllers";
import { debounce } from "lodash-es";
import {
  FlipPlacement,
  FloatingCSS,
  FloatingLayout,
  FloatingUIComponent,
  MenuPlacement,
  OverlayPositioning,
  connectFloatingUI,
  defaultMenuPlacement,
  disconnectFloatingUI,
  reposition,
} from "../../utils/floating-ui";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { onToggleOpenCloseComponent, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Alignment, Scale, Status } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { connectLabel, disconnectLabel, LabelableComponent } from "../../utils/label";
import { TextualInputComponent } from "../input/common/input";
import {
  afterConnectDefaultValueSet,
  FormComponent,
  HiddenFormInputSlot,
  MutableValidityState,
  connectForm,
  disconnectForm,
  submitForm,
} from "../../utils/form";
import { slotChangeHasAssignedElement } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { useT9n } from "../../controllers/useT9n";
import type { Input } from "../input/input";
import type { AutocompleteItem } from "../autocomplete-item/autocomplete-item";
import type { AutocompleteItemGroup } from "../autocomplete-item-group/autocomplete-item-group";
import type { Label } from "../label/label";
import { Validation } from "../functional/Validation";
import { createObserver } from "../../utils/observers";
import { styles } from "./autocomplete.scss";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, IDS, SLOTS } from "./resources";

const groupItemSelector = "calcite-autocomplete-item-group";
const itemSelector = "calcite-autocomplete-item";

declare global {
  interface DeclareElements {
    "calcite-autocomplete": Autocomplete;
  }
}

/**
 * @slot - A slot for adding `calcite-autocomplete-item` elements.
 * @slot content-bottom - A slot for adding content below `calcite-autocomplete-item` elements.
 * @slot content-top - A slot for adding content above `calcite-autocomplete-item` elements.
 */
export class Autocomplete
  extends LitElement
  implements
    FloatingUIComponent,
    FormComponent,
    InteractiveComponent,
    LabelableComponent,
    LoadableComponent,
    OpenCloseComponent,
    TextualInputComponent
{
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid = guid();

  attributeWatch = useWatchAttributes(
    ["autofocus", "enterkeyhint", "inputmode"],
    this.handleGlobalAttributesChanged,
  );

  defaultValue: Autocomplete["value"];

  floatingEl: HTMLDivElement;

  floatingLayout?: FloatingLayout;

  formEl: HTMLFormElement;

  private inputId = `autocomplete-input-${this.guid}`;

  labelEl: Label["el"];

  private listId = `autocomplete-list-${this.guid}`;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  openTransitionProp = "opacity";

  referenceEl: Input["el"];

  transitionEl: HTMLDivElement;

  // #endregion

  // #region State Properties

  @state() activeDescendant = "";

  @state() activeIndex = -1;

  @state() hasContentBottom = false;

  @state() hasContentTop = false;

  @state() items: AutocompleteItem["el"][] = [];

  @state() groups: AutocompleteItemGroup["el"][] = [];

  @state()
  get isOpen(): boolean {
    return this.open && (this.hasContentTop || this.hasContentBottom || this.items.length > 0);
  }

  @state()
  get enabledItems(): AutocompleteItem["el"][] {
    return this.items.filter((item) => !item.disabled);
  }

  // #endregion

  // #region Public Properties

  /** Specifies the text alignment of the component's value. */
  @property({ reflect: true }) alignment: Extract<"start" | "end", Alignment> = "start";

  /**
   * Specifies the type of content to autocomplete, for use in forms.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  @property() autocomplete: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** Specifies the component's fallback `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() flipPlacements: FlipPlacement[];

  /**
   * The `id` of the form that will be associated with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   */
  @property({ reflect: true }) form: string;

  /** When `true`, shows a default recommended icon. Alternatively, pass a Calcite UI Icon name to display a specific icon. */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** The component's input value. */
  @property() inputValue: string;

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * Specifies the maximum length of text for the component's value.
   *
   * @mdn [maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength)
   */
  @property({ reflect: true }) maxLength: number;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Specifies the minimum length of text for the component's value.
   *
   * @mdn [minlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength)
   */
  @property({ reflect: true }) minLength: number;

  /**
   * Specifies the name of the component.
   *
   * Required to pass the component's `value` on form submission.
   *
   * @mdn [name](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)
   */
  @property({ reflect: true }) name: string;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Specifies a regex pattern the component's `value` must match for validation.
   * Read the native attribute's documentation on MDN for more info.
   *
   * @mdn [step](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern)
   */
  @property() pattern: string;

  /**
   * Specifies placeholder text for the component.
   *
   * @mdn [placeholder](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder)
   */
  @property() placeholder: string;

  /**
   * Determines where the component will be positioned relative to the container element.
   *
   * @default "bottom-start"
   */
  @property({ reflect: true }) placement: MenuPlacement = defaultMenuPlacement;

  /** Adds text to the start of the component. */
  @property() prefixText: string;

  /**
   * When `true`, the component's value can be read, but cannot be modified.
   *
   * @mdn [readOnly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
   */
  @property({ reflect: true }) readOnly = false;

  /** When `true`, the component must have a value in order for the form to submit. */
  @property({ reflect: true }) required = false;

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** Specifies the status of the input field, which determines message and icons. */
  @property({ reflect: true }) status: Status = "idle";

  /** Adds text to the end of the component. */
  @property() suffixText: string;

  /** Specifies the validation icon to display under the component. */
  @property({ reflect: true, converter: stringOrBoolean }) validationIcon:
    | IconNameOrString
    | boolean;

  /** Specifies the validation message to display under the component. */
  @property() validationMessage: string;

  /**
   * The current validation state of the component.
   *
   * @readonly
   * @mdn [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState)
   */
  @property() validity: MutableValidityState = {
    valid: false,
    badInput: false,
    customError: false,
    patternMismatch: false,
    rangeOverflow: false,
    rangeUnderflow: false,
    stepMismatch: false,
    tooLong: false,
    tooShort: false,
    typeMismatch: false,
    valueMissing: false,
  };

  /** The component's value. */
  @property() value = "";

  // #endregion

  // #region Public Methods

  /**
   * Updates the position of the component.
   *
   * @param delayed - `true` if the placement should be updated after the component is finished rendering.
   * @returns {Promise<void>}
   */
  @method()
  async reposition(delayed = false): Promise<void> {
    const { floatingEl, referenceEl, placement, overlayPositioning, flipPlacements } = this;

    return reposition(
      this,
      {
        floatingEl,
        referenceEl,
        overlayPositioning,
        placement,
        flipPlacements,
        type: "menu",
      },
      delayed,
    );
  }

  /**
   * Selects the text of the component's `value`.
   *
   * @returns {Promise<void>}
   */
  @method()
  async selectText(): Promise<void> {
    return this.referenceEl.selectText();
  }

  /**
   * Sets focus on the component's first focusable element.
   *
   * @returns {Promise<void>}
   */
  @method()
  async setFocus(): Promise<void> {
    return this.referenceEl.setFocus();
  }

  // #endregion

  // #region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteAutocompleteBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteAutocompleteBeforeOpen = createEvent({ cancelable: false });

  /** Fires each time a new `value` is typed and committed. */
  calciteAutocompleteChange = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteAutocompleteClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteAutocompleteOpen = createEvent({ cancelable: false });

  /** Fires each time a new `inputValue` is typed and committed. */
  calciteAutocompleteTextChange = createEvent({ cancelable: false });

  /** Fires each time a new `inputValue` is typed. */
  calciteAutocompleteTextInput = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listenOn(document, "click", this.documentClickHandler);
    this.listen("calciteInternalAutocompleteItemSelect", this.handleInternalAutocompleteItemSelect);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    connectLabel(this);
    connectForm(this);

    this.getAllItemsDebounced();

    if (this.open) {
      this.openHandler();
      onToggleOpenCloseComponent(this);
    }

    connectFloatingUI(this);
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
    this.getAllItemsDebounced();

    if (this.open) {
      onToggleOpenCloseComponent(this);
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handleDisabledChange(this.disabled);
    }

    if (changes.has("flipPlacements")) {
      this.reposition(true);
    }

    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (
      changes.has("overlayPositioning") &&
      (this.hasUpdated || this.overlayPositioning !== "absolute")
    ) {
      this.reposition(true);
    }

    if (changes.has("placement") && (this.hasUpdated || this.placement !== defaultMenuPlacement)) {
      this.reposition(true);
    }

    if (changes.has("scale") && (this.hasUpdated || this.scale !== "m")) {
      this.updateItems();
      this.updateGroups();
    }

    if (changes.has("activeIndex") && (this.hasUpdated || this.activeIndex !== -1)) {
      this.updateItems();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  loaded(): void {
    afterConnectDefaultValueSet(this, this.value || "");
    setComponentLoaded(this);
    connectFloatingUI(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this);
  }

  // #endregion

  // #region Private Methods

  private setFloatingElSize(): void {
    const { referenceEl, floatingEl } = this;

    if (!referenceEl || !floatingEl) {
      return;
    }

    floatingEl.style.inlineSize = `${referenceEl.clientWidth}px`;
  }

  private handleGlobalAttributesChanged(): void {
    this.requestUpdate();
  }

  private handleDisabledChange(value: boolean): void {
    if (!value) {
      this.open = false;
    }
  }

  private openHandler(): void {
    onToggleOpenCloseComponent(this);

    if (!this.open) {
      this.activeIndex = -1;
    }

    if (this.disabled) {
      this.open = false;
      return;
    }

    this.setFloatingElSize();
    this.reposition(true);
  }

  private async documentClickHandler(event: MouseEvent): Promise<void> {
    if (this.disabled || event.composedPath().includes(this.el)) {
      return;
    }

    this.open = false;
  }

  private handleInternalAutocompleteItemSelect(event: Event): void {
    this.value = (event.target as AutocompleteItem["el"]).value;
    event.stopPropagation();
    this.emitChange();
  }

  private mutationObserver = createObserver("mutation", () => this.getAllItemsDebounced());

  private resizeObserver = createObserver("resize", () => {
    this.setFloatingElSize();
  });

  onLabelClick(): void {
    this.setFocus();
  }

  onBeforeOpen(): void {
    this.calciteAutocompleteBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteAutocompleteOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteAutocompleteBeforeClose.emit();
  }

  onClose(): void {
    this.calciteAutocompleteClose.emit();
  }

  private emitChange(): void {
    this.open = false;
    this.calciteAutocompleteChange.emit();
  }

  private updateGroups(): void {
    this.groups.forEach((group, index, items) => {
      group.scale = this.scale;

      if (index === 0) {
        group.disableSpacing = true;
      }

      const nextGroupItem = items[index + 1];

      if (nextGroupItem) {
        nextGroupItem.disableSpacing = group.children.length === 0;
      }
    });
  }

  private updateItems(): void {
    let activeDescendant: string = null;

    this.items.forEach((item, index) => {
      const isActive = index === this.activeIndex;

      if (isActive) {
        activeDescendant = item.guid;
      }

      item.active = isActive;
      item.scale = this.scale;
    });

    this.activeDescendant = activeDescendant;
  }

  private handleInputFocus(): void {
    this.open = true;
  }

  private handleContentTopSlotChange(event: Event): void {
    this.hasContentTop = slotChangeHasAssignedElement(event);
  }

  private handleContentBottomSlotChange(event: Event): void {
    this.hasContentBottom = slotChangeHasAssignedElement(event);
  }

  private getAllItemsDebounced = debounce(this.getAllItems, 0);

  private getAllItems(): void {
    const { el } = this;
    this.groups = Array.from(el.querySelectorAll(groupItemSelector));
    this.items = Array.from(el.querySelectorAll(itemSelector));
    this.updateItems();
    this.updateGroups();
  }

  private getIcon(): IconNameOrString {
    const { icon } = this;

    return icon === true ? ICONS.search : icon || ICONS.search;
  }

  private setReferenceEl(el: Input["el"]): void {
    this.referenceEl = el;

    if (!el) {
      return;
    }

    this.resizeObserver?.observe(el);

    connectFloatingUI(this);

    // TODO: fixme when supported in jsx
    // https://devtopia.esri.com/WebGIS/arcgis-web-components/issues/2694
    const enterKeyHint = this.el.getAttribute("enterkeyhint");
    el.enterKeyHint = enterKeyHint;
  }

  private keyDownHandler(event: KeyboardEvent): void {
    const { defaultPrevented, key } = event;

    if (defaultPrevented) {
      return;
    }

    const { open, activeIndex, enabledItems } = this;

    switch (key) {
      case "Escape":
        if (open) {
          this.open = false;
          event.preventDefault();
        }
        break;
      case "Tab":
        this.open = false;
        break;
      case "Enter":
        if (open && activeIndex > -1) {
          this.value = enabledItems[activeIndex].value;
          this.emitChange();
          event.preventDefault();
        } else if (!event.defaultPrevented) {
          if (submitForm(this)) {
            event.preventDefault();
          }
        }
        break;
      case "ArrowDown":
        this.open = true;
        this.activeIndex =
          activeIndex !== -1 ? Math.min(activeIndex + 1, enabledItems.length - 1) : 0;
        event.preventDefault();
        break;
      case "ArrowUp":
        this.open = true;
        this.activeIndex =
          activeIndex !== -1 ? Math.max(activeIndex - 1, 0) : enabledItems.length - 1;
        event.preventDefault();
        break;
      case "Home":
        this.open = true;
        this.activeIndex = 0;
        event.preventDefault();
        break;
      case "End":
        this.open = true;
        this.activeIndex = enabledItems.length - 1;
        event.preventDefault();
        break;
    }
  }

  private changeHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.inputValue = (event.target as Input["el"]).value;
    this.calciteAutocompleteTextChange.emit();
  }

  private inputHandler(event: CustomEvent): void {
    event.stopPropagation();
    this.inputValue = (event.target as Input["el"]).value;
    this.calciteAutocompleteTextInput.emit();
  }

  private setFloatingEl(el: HTMLDivElement): void {
    this.floatingEl = el;
    connectFloatingUI(this);
  }

  private setTransitionEl(el: HTMLDivElement): void {
    this.transitionEl = el;
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { disabled, listId, inputId, isOpen } = this;

    const autofocus = this.el.autofocus || this.el.hasAttribute("autofocus") ? true : null;
    const inputMode = this.el.getAttribute("inputmode") as
      | "none"
      | "text"
      | "search"
      | "email"
      | "tel"
      | "url"
      | "numeric"
      | "decimal";

    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.inputContainer}>
          <calcite-input
            alignment={this.alignment}
            aria-activedescendant={this.activeDescendant}
            aria-controls={listId}
            aria-owns={listId}
            ariaAutoComplete="list"
            ariaExpanded={isOpen}
            ariaHasPopup="listbox"
            autocomplete={this.autocomplete}
            autofocus={autofocus}
            class={CSS.input}
            clearable={true}
            disabled={disabled}
            form={this.form}
            icon={this.getIcon()}
            iconFlipRtl={this.iconFlipRtl}
            id={inputId}
            inputMode={inputMode}
            label={this.label}
            loading={this.loading}
            maxLength={this.maxLength}
            messageOverrides={this.messages}
            minLength={this.minLength}
            name={this.name}
            onKeyDown={this.keyDownHandler}
            oncalciteInputChange={this.changeHandler}
            oncalciteInputInput={this.inputHandler}
            oncalciteInternalInputFocus={this.handleInputFocus}
            pattern={this.pattern}
            placeholder={this.placeholder}
            prefixText={this.prefixText}
            readOnly={this.readOnly}
            ref={this.setReferenceEl}
            role="combobox"
            scale={this.scale}
            status={this.status}
            suffixText={this.suffixText}
            type="search"
            value={this.inputValue}
          />
          {this.renderListBox()}
          <div
            class={{
              [CSS.contentContainer]: true,
              [CSS.floatingUIContainer]: true,
              [CSS.floatingUIContainerActive]: isOpen,
            }}
            ref={this.setFloatingEl}
          >
            <div
              class={{
                [CSS.contentAnimation]: true,
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: isOpen,
              }}
              ref={this.setTransitionEl}
            >
              <div class={{ [CSS.content]: true, [CSS.contentHidden]: !isOpen }}>
                <slot name={SLOTS.contentTop} onSlotChange={this.handleContentTopSlotChange} />
                <slot ariaHidden="true" />
                <slot
                  name={SLOTS.contentBottom}
                  onSlotChange={this.handleContentBottomSlotChange}
                />
              </div>
            </div>
          </div>
        </div>
        <HiddenFormInputSlot component={this} />
        {this.validationMessage && this.status === "invalid" ? (
          <Validation
            icon={this.validationIcon}
            id={IDS.validationMessage}
            message={this.validationMessage}
            scale={this.scale}
            status={this.status}
          />
        ) : null}
      </InteractiveContainer>
    );
  }

  private renderListBox(): JsxNode {
    return (
      <ul
        aria-labelledby={this.inputId}
        class={CSS.screenReadersOnly}
        id={this.listId}
        role="listbox"
        tabIndex={-1}
      >
        {this.renderListBoxOptions()}
      </ul>
    );
  }

  private renderListBoxOptions(): JsxNode {
    return this.items
      .filter((item) => !!(item.label || item.heading))
      .map((item) => (
        <li
          ariaDisabled={item.disabled}
          ariaLabel={item.label}
          id={item.guid}
          key={item.guid}
          role="option"
          tabIndex="-1"
        >
          {item.heading}
          {item.description}
        </li>
      ));
  }

  // #endregion
}
