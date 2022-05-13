import dedent from "dedent";

/**
 * Use this tagged template to help Prettier format any HTML template literals.
 *
 * @param strings the
 * @example
 *
 * ```ts
 * // select.e2e.ts
 * const page = await newE2EPage({
 *   html: html`
 *     <calcite-select>
 *       <calcite-option id="1">uno</calcite-option>
 *       <calcite-option id="2">dos</calcite-option>
 *       <calcite-option id="3">tres</calcite-option>
 *     </calcite-select>
 *   `
 * });
 * ```
 *
 * ```ts
 * icon.stories.ts
 * export const simple = (): string => html`
 *   <calcite-select>
 *     <calcite-option id="1">uno</calcite-option>
 *     <calcite-option id="2">dos</calcite-option>
 *     <calcite-option id="3">tres</calcite-option>
 *   </calcite-select>
 * `;
 * ```
 */
export function html(strings: string): string;
export function html(strings: TemplateStringsArray, ...placeholders: any[]): string;
export function html(strings: any, ...placeholders: any[]): string {
  return dedent(strings, ...placeholders);
}
