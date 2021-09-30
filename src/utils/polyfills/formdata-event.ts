/**
 * This polyfill is only needed for Safari as it does not support `formdata` natively (https://caniuse.com/?search=formdataevent)
 *
 * Based on https://github.com/webcomponents/polyfills/issues/172#issuecomment-930011955
 */

interface FormValueElement extends HTMLElement {
  value: string;
}

type PolyfillableFormDataWindow = Window & { FormData: typeof FormData };

interface FormDataEventInit extends EventInit {
  formData: FormData;
}

class FormDataEvent extends Event {
  get formData(): FormData {
    return this._formData;
  }

  private _formData: FormData;

  constructor(type: string, eventInitDict?: FormDataEventInit) {
    super(type);

    if (eventInitDict?.formData) {
      this._formData = eventInitDict.formData;
    }
  }
}

class PolyfilledFormData extends FormData {
  private form: HTMLFormElement;

  constructor(form) {
    super(form);
    this.form = form;
    form.dispatchEvent(new FormDataEvent("formdata", { formData: this }));
  }

  append(name, value): void {
    let input = this.form.elements[name] as FormValueElement;

    if (!input) {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = name;

      this.form.appendChild(hiddenInput);
      input = hiddenInput;
    }

    // if the name already exists, there is already a hidden input in the dom
    // and it will have been picked up by FormData during construction.
    // in this case, we can't just blindly append() since that will result in two entries.
    // nor can we blindly delete() the entry, since there can be multiple entries per name (e.g. checkboxes).
    // so we must carefully splice out the old value, and add back in the new value
    if (this.has(name)) {
      const entries = this.getAll(name);
      const index = entries.indexOf(input.value);

      if (index !== -1) {
        entries.splice(index, 1);
      }

      entries.push(value);

      // we reconstruct the values for each key on
      // each append call since we can't replace values with append nor set
      this.delete(name);
      entries.forEach((entry) => super.append(name, entry));
    } else {
      super.append(name, value);
    }

    input.value = value;
  }
}

function polyfillFormData(win: Window): void {
  const supportsFormDataEvent = "FormDataEvent" in win;

  if (supportsFormDataEvent) {
    return;
  }

  (win as PolyfillableFormDataWindow).FormData = PolyfilledFormData;

  win.addEventListener("submit", (event) => {
    if (!event.defaultPrevented) {
      new FormData(event.target as HTMLFormElement);
    }
  });
}

polyfillFormData(window);
