import { FunctionalComponent, h, Host, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { handleFilter } from "./shared-list-logic";
import DOMAttributes = JSXBase.DOMAttributes;
import { Theme } from "../interfaces";

interface ListProps extends DOMAttributes {
  disabled: boolean;
  loading: boolean;
  filterEnabled: boolean;
  dataForFilter: any;
  handleFilter: typeof handleFilter;
  filterPlaceholder: string;
  theme: Theme;
  el: HTMLCalcitePickListElement | HTMLCalciteValueListElement;
  setFilterEl: (el: HTMLCalciteFilterElement) => void;
}

export const List: FunctionalComponent<{ props: ListProps } & DOMAttributes> = ({
  props: {
    disabled,
    loading,
    filterEnabled,
    dataForFilter,
    handleFilter,
    filterPlaceholder,
    el,
    setFilterEl,
    theme
  },
  ...rest
}): VNode => {
  const defaultSlot = <slot />;
  return (
    <Host aria-busy={loading.toString()} aria-disabled={disabled.toString()} role="menu" {...rest}>
      <section>
        <header class={{ [CSS.sticky]: true }}>
          {filterEnabled ? (
            <calcite-filter
              aria-label={filterPlaceholder}
              data={dataForFilter}
              dir={getElementDir(el)}
              disabled={loading || disabled}
              onCalciteFilterChange={handleFilter}
              placeholder={filterPlaceholder}
              ref={setFilterEl}
            />
          ) : null}
          <slot name="menu-actions" />
        </header>
        {loading || disabled ? <calcite-scrim loading={loading} theme={theme} /> : null}
        {defaultSlot}
      </section>
    </Host>
  );
};

export default List;
