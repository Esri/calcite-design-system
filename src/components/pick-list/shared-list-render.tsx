import { FunctionalComponent, h, Host, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { toAriaBoolean } from "../../utils/dom";
import { CSS, SLOTS } from "./resources";
import { handleFilter } from "./shared-list-logic";
import DOMAttributes = JSXBase.DOMAttributes;

interface ListProps extends DOMAttributes<any> {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  filterPlaceholder: string;
  el: HTMLCalcitePickListElement | HTMLCalciteValueListElement;
  setFilterEl: (el: HTMLCalciteFilterElement) => void;
}

export const List: FunctionalComponent<{ props: ListProps } & DOMAttributes<any>> = ({
  props: {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilter,
    filterPlaceholder,
    setFilterEl
  },
  ...rest
}): VNode => {
  const defaultSlot = <slot />;
  return (
    <Host aria-busy={toAriaBoolean(loading)} role="menu" {...rest}>
      <section>
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              aria-label={filterPlaceholder}
              disabled={loading || disabled}
              items={dataForFilter}
              onCalciteFilterChange={handleFilter}
              placeholder={filterPlaceholder}
              ref={setFilterEl}
            />
          ) : null}
          <slot name={SLOTS.menuActions} />
        </header>
        {loading ? <calcite-scrim loading={loading} /> : null}
        {defaultSlot}
      </section>
    </Host>
  );
};

export default List;
