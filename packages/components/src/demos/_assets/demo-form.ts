import type { FormComponent } from "../../controllers/useForm";

class DemoForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
    this.addEventListener("invalid", this.onFormInvalid, true);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
    this.removeEventListener("formdata", this.onFormData);
    this.removeEventListener("invalid", this.onFormInvalid, true);
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
    const componentForm = invalidComponent.closest("form");
    let componentFormId = componentForm ? componentForm?.id || "1" : "none";

    const forms = Array.from(document.querySelectorAll("form"));
    if (forms.length > 0) {
      forms.forEach((form, i) => {
        if (form === componentForm) {
          componentFormId = form.id || String(i + 1);
        }
      });
    }

    console.log(
      `<${invalidComponent.tagName.toLowerCase()} form="${componentFormId}" name="${invalidComponent.name}" value="${invalidComponent.value}"${invalidComponent.required ? " required" : ""}>`,
      invalidComponent?.validity,
    );
  }
}
customElements.define("demo-form", DemoForm);
