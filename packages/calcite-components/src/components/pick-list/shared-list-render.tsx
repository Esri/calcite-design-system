import { FunctionalComponent, h, Host, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";
import { handleFilter, handleFilterEvent } from "./shared-list-logic";
import DOMAttributes = JSXBase.DOMAttributes;
import { InteractiveContainer } from "../../utils/interactive";

interface ListProps extends DOMAttributes<any> {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  filterText: string;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  handleFilterEvent: typeof handleFilterEvent;
  filterPlaceholder: string;
  el: HTMLCalcitePickListElement | HTMLCalciteValueListElement;
  setFilterEl: (el: HTMLCalciteFilterElement) => void;
  setFilteredItems: (
    filteredItems: HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement[]
  ) => void;
  dragEnabled?: boolean;
  storeAssistiveEl?: (el: HTMLSpanElement) => void;
}

export const List: FunctionalComponent<{ props: ListProps } & DOMAttributes<any>> = ({
  props: {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilterEvent,
    filterPlaceholder,
    filterText,
    setFilterEl,
    dragEnabled,
    storeAssistiveEl,
  },
  ...rest
}): VNode => {
  const defaultSlot = <slot />;
  return (
    <Host aria-busy={toAriaBoolean(loading)} role="menu" {...rest}>
      <InteractiveContainer disabled={disabled}>
        <section>
          {dragEnabled ? (
            <span
              aria-live="assertive"
              class="assistive-text"
              // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
              ref={storeAssistiveEl}
            />
          ) : null}
          <header class={{ [CSS.sticky]: true }}>
            {filterEnabled ? (
              <calcite-filter
                aria-label={filterPlaceholder}
                disabled={loading || disabled}
                items={dataForFilter}
                onCalciteFilterChange={handleFilterEvent}
                placeholder={filterPlaceholder}
                value={filterText}
                // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
                ref={setFilterEl}
              />
            ) : null}
            <slot name={SLOTS.menuActions} />
          </header>
          {loading ? <calcite-scrim loading={loading} /> : null}
          {defaultSlot}
        </section>
      </InteractiveContainer>
    </Host>
  );
};

export default List;
