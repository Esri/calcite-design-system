// Default
let modeStore: Mode = "light";
// TODO: is this the right local storage key name?
export const storageKey = "calcite-theme";
export type Mode = "dark" | "light";
export type Disconnect = () => void;

export type ModePublisher<T> = () => {
  (value: T): void;
  subscribe(listener: (msg: T) => void): () => boolean;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const modePublisher = <T>() => {
  const listeners = new Set<(value: T) => void>();
  function createPublisher(value: T) {
    for (const cb of listeners) {
      cb(value);
    }
  }
  createPublisher.subscribe = (listener: (msg: T) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return createPublisher;
};

type GetMode<T> = {
  (): T;
  subscribe(cb: (arg: T) => void): Disconnect;
};

if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
  // is light
  modeStore = "light";
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  // is dark
  modeStore = "dark";
}

let pub: ReturnType<ModePublisher<Mode>>;

export const getMode: GetMode<Mode> = () => (localStorage.getItem(storageKey) as Mode) ?? modeStore;

getMode.subscribe = (cb: (arg: Mode) => void) => {
  pub = pub ?? modePublisher<Mode>();
  return pub.subscribe(cb);
};

export const setMode = (mode: Mode): void => {
  localStorage.setItem(storageKey, mode);
  pub && pub(mode);
};
