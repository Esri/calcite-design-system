export function updateElementAria(trigger: HTMLElement, ariaRules: Record<`aria-${string}`, string>): void {
  for (const ariaKey in ariaRules) {
    const ariaProp = ariaRules[ariaKey];
    trigger.setAttribute(ariaKey, ariaProp);
  }
}
