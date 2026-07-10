import { TemplateResult } from "lit";
import { Ref } from "lit/directives/ref.js";
import { h } from "@arcgis/lumina";
import { Scale } from "../interfaces";
import type { Action } from "../action/action";

interface InlineEditableControlsProps {
  cancelEditingLabel: string;
  confirmChangesLabel: string;
  editingEnabled: boolean;
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
  container: "inline-editable--container",
  enableEditing: "enable-editing",
  confirmChanges: "confirm-changes",
  cancelEditing: "cancel-editing",
};

export const InlineEditableControls = ({
  cancelEditingLabel,
  confirmChangesLabel,
  editingEnabled,
  enableEditingLabel,
  enableEditingButtonRef,
  loading,
  onCancelEditing,
  onConfirmChanges,
  onEnableEditing,
  scale,
  showControls,
}: InlineEditableControlsProps): TemplateResult => (
  <div class={CSS.container}>
    {!editingEnabled && (
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
