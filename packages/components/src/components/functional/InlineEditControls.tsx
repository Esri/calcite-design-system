import { TemplateResult } from "lit";
import { Ref } from "lit/directives/ref.js";
import { h } from "@arcgis/lumina";
import { Scale } from "../types";
import type { Action } from "../action/action";

interface InlineEditControlsProps {
  cancelEditingLabel: string;
  confirmChangesLabel: string;
  inlineEditing: boolean;
  enableEditingLabel: string;
  enableEditingButtonRef?: Ref<Action["el"]>;
  loading: boolean;
  onCancelEditing: (event: MouseEvent) => void;
  onConfirmChanges: (event: MouseEvent) => Promise<void> | void;
  onEnableEditing: (event: MouseEvent) => void;
  scale: Scale;
  showControls: boolean;
}

export const CSS = {
  container: "inline-edit--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing",
};

export const InlineEditControls = ({
  cancelEditingLabel,
  confirmChangesLabel,
  inlineEditing,
  enableEditingLabel,
  enableEditingButtonRef,
  loading,
  onCancelEditing,
  onConfirmChanges,
  onEnableEditing,
  scale,
  showControls,
}: InlineEditControlsProps): TemplateResult => (
  <div class={CSS.container}>
    {!inlineEditing && (
      <calcite-action
        ariaLabel={enableEditingLabel}
        class={CSS.enableEditing}
        icon="pencil"
        onClick={onEnableEditing}
        ref={enableEditingButtonRef}
        scale={scale}
        text={enableEditingLabel}
        title={enableEditingLabel}
        type="button"
      />
    )}
    {showControls && [
      <calcite-action
        ariaLabel={confirmChangesLabel}
        class={CSS.confirmChanges}
        disabled={loading}
        icon="check"
        loading={loading}
        onClick={onConfirmChanges}
        scale={scale}
        text={confirmChangesLabel}
        title={confirmChangesLabel}
        type="button"
      />,
      <calcite-action
        ariaLabel={cancelEditingLabel}
        class={CSS.cancelEditing}
        disabled={loading}
        icon="x"
        onClick={onCancelEditing}
        scale={scale}
        text={cancelEditingLabel}
        title={cancelEditingLabel}
        type="button"
      />,
    ]}
  </div>
);
