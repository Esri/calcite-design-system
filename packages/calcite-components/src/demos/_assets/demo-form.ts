class DemoForm extends HTMLElement {
  connectedCallback() {
    this.addEventListener("submit", this.onFormSubmit);
    this.addEventListener("formdata", this.onFormData);
  }

  disconnectedCallback() {
    this.removeEventListener("submit", this.onFormSubmit);
    this.removeEventListener("formdata", this.onFormData);
  }

  onFormSubmit(event) {
    event.preventDefault();
    if (event.target) {
      new FormData(event.target);
    }
  }

  onFormData(event) {
    const data = {};
    for (const pair of event.formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
  }
}
customElements.define("demo-form", DemoForm);
