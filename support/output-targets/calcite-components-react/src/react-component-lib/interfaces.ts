// General types important to applications using stencil built components
export interface EventEmitter<T = any> {
  emit: (data?: T) => CustomEvent<T>;
}

export interface StyleReactProps {
  class?: string;
  className?: string;
  style?: { [key: string]: any };
}
