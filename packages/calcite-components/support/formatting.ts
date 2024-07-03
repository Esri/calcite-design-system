import dedent from "dedent";

/**
 * Use this tagged template to help Prettier format any HTML template literals.
 *
 * @param strings the input HTML text
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
 * // select.stories.ts
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

/**
 * Use this tagged template to help Prettier format any CSS template literals.
 *
 * **Note**: this should only be used when the input string only contains CSS. For style tags and style attributes, use the `html` tagged template literal.
 *
 * @param strings the input CSS text
 * @example
 *
 * ```ts
 * const page = await newE2EPage();
 * await page.setContent(html`...`);
 * await page.addStyleTag({
 *   content: css`
 *     .my-component {
 *        color: red;
 *      }
 * `
 * });
 * ```
 */
export function css(strings: string): string;
export function css(strings: TemplateStringsArray, ...placeholders: any[]): string;
export function css(strings: any, ...placeholders: any[]): string {
  return dedent(strings, ...placeholders);
}
