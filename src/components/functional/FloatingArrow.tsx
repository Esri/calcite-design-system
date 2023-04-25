import { FunctionalComponent, h } from "@stencil/core";
import { EffectivePlacement } from "../../utils/floating-ui";
import { JSXAttributes } from "@stencil/core/internal";

interface FloatingArrowProps extends JSXAttributes {
  effectivePlacement: EffectivePlacement;
}

const CSS = {
  arrow: "calcite-floating-ui-arrow",
  arrowStroke: "calcite-floating-ui-arrow__stroke"
};

const DEFAULTS = {
  width: 12,
  height: 6,
  strokeWidth: 1
};

export const FloatingArrow: FunctionalComponent<FloatingArrowProps> = ({
  effectivePlacement,
  key,
  ref
}) => {
  const { width, height, strokeWidth } = DEFAULTS;
  const svgX = width / 2;
  const [side] = effectivePlacement?.split("-") || "";
  const isVerticalSide = side === "top" || side === "bottom";

  const dValue =
    "M0,0" +
    ` H${width}` +
    ` L${width - svgX},${height}` +
    ` Q${svgX},${height} ${svgX},${height}` +
    " Z";

  const rotation = {
    top: "",
    left: "rotate(-90deg)",
    bottom: "rotate(180deg)",
    right: "rotate(90deg)"
  }[side];

  return (
    <svg
      aria-hidden="true"
      class={CSS.arrow}
      height={width}
      key={key}
      ref={ref}
      style={{
        [side]: "100%",
        transform: `${rotation}`
      }}
      viewBox={`0 0 ${width} ${width + (!isVerticalSide ? strokeWidth : 0)}`}
      width={width + (isVerticalSide ? strokeWidth : 0)}
    >
      {strokeWidth > 0 && (
        <path
          class={CSS.arrowStroke}
          d={dValue}
          fill="none"
          // Account for the stroke on the fill path rendered below.
          stroke-width={strokeWidth + 1}
        />
      )}
      {/* In Firefox, for left/right placements there's a ~0.5px gap where the
  border can show through. Adding a stroke on the fill removes it. */}
      <path d={dValue} stroke="none" />
    </svg>
  );
};
