// Fails tests on console.error(): https://ionic.zendesk.com/hc/en-us/requests/31510
let error = console.error;
console.error = function (message: any, ...args: any[]) {
  error.call(console, message, ...args); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};
