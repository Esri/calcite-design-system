export interface LoadableComponent {
  componentWillLoad: () => Promise<void> | void;

  componentDidLoad: () => Promise<void> | void;
}

const resolveMap = new WeakMap<LoadableComponent, (value: void | PromiseLike<void>) => void>();

const promiseMap = new WeakMap<LoadableComponent, Promise<void>>();

export function connectLoadableComponent(component: LoadableComponent): void {
  promiseMap.set(component, new Promise((resolve) => resolveMap.set(component, resolve)));
}

export function setComponentLoaded(component: LoadableComponent): void {
  resolveMap.get(component)?.();
}

export async function loadComponent(component: LoadableComponent): Promise<void> {
  await promiseMap.get(component);
}
