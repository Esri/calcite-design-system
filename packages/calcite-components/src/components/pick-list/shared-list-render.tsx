import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { InteractiveContainer } from "../../utils/interactive";
import { CSS, SLOTS } from "./resources";
import { handleFilter, handleFilterEvent } from "./shared-list-logic";

type DOMAttributes = JSXBase.DOMAttributes<any>;

interface ListProps extends DOMAttributes {
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
    filteredItems: HTMLCalcitePickListItemElement | HTMLCalciteValueListItemElement[],
  ) => void;
  dragEnabled?: boolean;
  storeAssistiveEl?: (el: HTMLSpanElement) => void;
}

export const List: FunctionalComponent<{ props: ListProps }> = ({
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
}): VNode => {
  const defaultSlot = <slot />;
  return (
    <InteractiveContainer disabled={disabled}>
      <section>
        {dragEnabled ? (
          <span aria-live="assertive" class="assistive-text" ref={storeAssistiveEl} />
        ) : null}
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              aria-label={filterPlaceholder}
              disabled={disabled}
              items={dataForFilter}
              onCalciteFilterChange={handleFilterEvent}
              placeholder={filterPlaceholder}
              ref={setFilterEl}
              value={filterText}
            />
          ) : null}
          <slot name={SLOTS.menuActions} />
        </header>
        {loading ? <calcite-scrim loading={loading} /> : null}
        {defaultSlot}
      </section>
    </InteractiveContainer>
  );
};

export default List;
