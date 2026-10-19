import type { Label } from "../components/label/label";

interface LabelTextComponent {
  label?: string;
  labelEl?: Label["el"];
}

/**
 * Helper to get the label text from a component.
 *
 * @param component
 */
export function getLabelText(component: LabelTextComponent): string {
  return component.label || component.labelEl?.textContent?.trim() || "";
}
