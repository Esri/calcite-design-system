function gen(counts) {
    return counts
        .map(function (count) {
        var out = "";
        for (var i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    })
        .join("-");
}
var guid = function () { return gen([2, 1, 1, 1, 3]); };
export { guid as g };
