// example for alerts appended to dom
function createExampleAlert(id: string): void {
  const exampleAlert = [
    "<calcite-alert id=" + id + " color='red'>",
    "<div slot='title'>Something failed</div>",
    "<div slot='message'>" + id + " That thing you wanted to do didn't work as expected</div>",
    "<calcite-link slot='alert-link' title='my action' appearance='inline'>Take action</calcite-link>",
    "</calcite-alert>"
  ].join("\n");

  // if the id element doesn't exist, insert into page
  if (!document.querySelector("#" + id)) {
    document.querySelector("body").insertAdjacentHTML("beforeend", exampleAlert);
  }

  // open the alert we just created
  document.querySelector("#" + id).setAttribute("active", "");
}
