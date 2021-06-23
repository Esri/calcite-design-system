// example for validating inputs and adding messages
function detectInputChanges(id: string): void {
  const input = document.querySelector(id);
  input.addEventListener("calciteInputInput", logInput);
  input.addEventListener("calciteInputFocus", logFocus);
  input.addEventListener("calciteInputBlur", logBlur);
}

function logFocus(event): void {
  const targetNotice = document.querySelector(`#validate-input-example-focus-notice`);
  if (targetNotice) {
    targetNotice.setAttribute("active", "true");
  }
  if (targetNotice) {
    targetNotice.innerHTML = `<span slot="message"><b>#${event.detail.element.id}</b> was focused</span>`;
  }
}

function logBlur(event): void {
  const targetNotice = document.querySelector(`#validate-input-example-blur-notice`);
  if (targetNotice) {
    targetNotice.setAttribute("active", "true");
  }
  if (targetNotice) {
    targetNotice.innerHTML = `<span slot="message"><b>#${event.detail.element.id}</b> was blurred</span>`;
  }
}

function logInput(event): void {
  const targetNotice = document.querySelector(`#validate-input-example-change-notice`);
  if (targetNotice) {
    targetNotice.setAttribute("active", "true");
  }
  if (targetNotice) {
    targetNotice.innerHTML = `<span slot="message"><b>#${event.detail.element.id}</b> was changed and the value is <b>"${event.detail.value}"</b></span>`;
  }
}

function validateInput(id: string): void {
  const input = document.querySelector(id);
  input.addEventListener("calciteInputInput", validatePasswordExample);
  input.addEventListener("calciteInputFocus", validatePasswordExampleFocusMessage);
}

function validatePasswordExampleFocusMessage(event): void {
  const targetInput = document.querySelectorAll(`#${event.detail.element.id}`)[0];
  const existingMessage = document.querySelector(`#pw-status-1`) as HTMLCalciteInputMessageElement;
  if (!existingMessage) {
    const message = document.createElement("calcite-input-message");
    message.active = true;
    message.id = "pw-status-1";
    message.type = "floating";
    message.innerHTML = `This should be at least 6 characters long`;
    targetInput.appendChild(message);
  } else {
    existingMessage.active = true;
  }
}

function validatePasswordExample(event): void {
  const message = document.querySelector(`#pw-status-1`) as HTMLCalciteInputMessageElement;
  if (event.detail.value.length === 0 || event.detail.value === "") {
    message.status = "idle";
    message.innerHTML = `This should be at least 6 characters long`;
  } else if (event.detail.value.length < 6) {
    message.status = "invalid";
    message.innerHTML = `You ain't there yet`;
  } else {
    message.status = "valid";
    message.innerHTML = `Bingo!`;
  }
}

function validateInputWithNativeEvents(id: string): void {
  const input = document.querySelector(id);
  input.addEventListener("input", validatePasswordExampleNative);
  input.addEventListener("focusin", validatePasswordExampleFocusMessageNative);

  input.addEventListener("focusin", logNativeFocusIn);
  input.addEventListener("focusout", logNativeFocusOut);
}

function validatePasswordExampleFocusMessageNative(event): void {
  const targetInput = document.querySelectorAll(`#${event.target.id}`)[0];
  const existingMessage = document.querySelector(`#pw-status-2`) as HTMLCalciteInputMessageElement;
  if (!existingMessage) {
    const message = document.createElement("calcite-input-message");
    message.active = true;
    message.icon = true;
    message.id = "pw-status-2";
    message.innerHTML = `This should be at least 6 characters long`;
    targetInput.appendChild(message);
  } else {
    existingMessage.active = true;
  }
}

function validatePasswordExampleNative(event): void {
  const message = document.querySelector(`#pw-status-2`) as HTMLCalciteInputMessageElement;
  if (event.target.value.length === 0 || event.target.value === "") {
    message.status = "idle";
    message.innerHTML = `This should be at least 6 characters long`;
  } else if (event.target.value.length < 6) {
    message.status = "invalid";
    message.innerHTML = `You ain't there yet`;
  } else {
    message.status = "valid";
    message.innerHTML = `Bingo!`;
  }
}

function logNativeFocusIn(event): void {
  console.log("native focusin", event.target.id);
}

function logNativeFocusOut(event): void {
  console.log("native focusout", event.target.id);
}
