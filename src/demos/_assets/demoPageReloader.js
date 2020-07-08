(function () {
    // based on pieces of https://github.com/ionic-team/stencil/blob/4960fbe11444a18def3ce48ab46b018c416f9472/src/dev-server/dev-client/client-web-socket.ts
    var getSocketUrl = function (_a) {
        var hostname = _a.hostname, port = _a.port, protocol = _a.protocol;
        return protocol === "https:" ? "wss:" : "ws:" + "//" + hostname + ":" + port + "/";
    };
    var clientWebSocket = new window.WebSocket(getSocketUrl(window.location), ["xmpp"]);
    clientWebSocket.addEventListener("message", function (message) {
        if (message.data.indexOf("rebuild finished") > -1) {
            window.location.reload();
        }
    });
})();
