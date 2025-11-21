export function shadowQuery(el: HTMLElement, selector: string): HTMLElement {
  return el.shadowRoot!.querySelector(selector)!;
}
