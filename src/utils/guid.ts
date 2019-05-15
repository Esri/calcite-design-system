// from https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#Examples
function random() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 1e10;
}

function gen(count) {
  var out = "";
  for (var i = 0; i < count; i++) {
    out += (((1 + random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return out;
}

export function guid() {
  return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
}
