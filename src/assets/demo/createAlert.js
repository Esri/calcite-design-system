// example for alerts appended to dom
function createExampleAlert (id) {
  const exampleAlert =
  `<calcite-alert id=${id} color='red'>
      <div slot='alert-title'>Something failed</div>
      <div slot='alert-message'>${id} That thing you wanted to do didn't work as expected</div>
      <a slot='alert-link' href=''>Retry</a>
  </calcite-alert>`;

  // if the id element doesn't exist, insert into calcite-alerts
  if (!document.querySelector(`#${id}`)) {
    document.querySelector('#my-alert-container').insertAdjacentHTML('beforeend', exampleAlert);
  }

  // open the alert we just created
  document.querySelector(`#${id}`).openCalciteAlert();
}
