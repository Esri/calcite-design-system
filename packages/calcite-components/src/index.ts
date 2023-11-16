// ⚠️  Please reach out to Franco (or Ben if he's out) before editing this file ⚠️
// This file follows the same setup as `stencil-ds-output-targets` (https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/example-project/component-library/src/index.ts).
export * from "./components";

// Event detail types need to be exported from this entry point
// because that's where the Angular output target expects them to be.
// For more details, see: https://github.com/Esri/calcite-design-system/pull/8177
export { HandleChange } from "./components/handle/interfaces";
export { HandleNudge } from "./components/handle/interfaces";
export { ListDragDetail } from "./components/list/interfaces";
export { DragDetail } from "./utils/sortableComponent";
