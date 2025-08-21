class DemoForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
    this.removeEventListener("formdata", this.onFormData);
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
}
customElements.define("demo-form", DemoForm);
