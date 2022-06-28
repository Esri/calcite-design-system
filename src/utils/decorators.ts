/**
 * binds keyword `this` to the original owner of the method (e.g. class, object)
 *
 * @param _target binding target
 * @param _methodName name of the method to which this decorator is attached
 * @param descriptor descriptor of the method
 * @returns decorated method
 */
export const autobind = (_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
  // extract the original method
  const originalMethod = descriptor.value;

  if (typeof originalMethod !== "function") {
    throw new TypeError(`@boundMethod decorator can only be applied to methods not: ${typeof originalMethod}`);
  }

  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true, // can always change it,
    get() {
      const boundFunction = originalMethod.bind(this); // bind `this` to a new function
      return boundFunction;
    }
  };

  return adjustedDescriptor;
};
