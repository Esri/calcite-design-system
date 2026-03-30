import { FormComponent } from "../../controllers/useForm";

class DemoForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
    this.addEventListener("invalid", this.onFormInvalid, true);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
    this.removeEventListener("formdata", this.onFormData);
    this.removeEventListener("invalid", this.onFormInvalid);
  }

  onFormSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (event.target) {
      new FormData(event.target as HTMLFormElement);
    }
  }

  onFormData(event: FormDataEvent) {
    const data: Record<string, FormDataEntryValue> = {};
    for (const pair of event.formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
  }

  onFormInvalid(event: Event) {
    const invalidComponent = event.target as FormComponent;
    console.log(invalidComponent, invalidComponent?.validity);
  }
}
customElements.define("demo-form", DemoForm);
