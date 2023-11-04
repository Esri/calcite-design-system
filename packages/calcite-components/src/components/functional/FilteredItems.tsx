import { FunctionalComponent, h } from "@stencil/core";

interface ExpandToggleProps {
  filterEnabled: boolean;
  items: string[];
}

export const ExpandToggle: FunctionalComponent<ExpandToggleProps> = ({ filterEnabled, items }) => {
  return (
    <div aria-live="polite">
      {filterEnabled ? "Filter enabled." : ""}
      Displaying {items.length} items.
      {items.map((item, index) => `Item ${index + 1}: ${item}.`)}
    </div>
  );
};
