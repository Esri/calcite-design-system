var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
(function () {
    var IS_IE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);
    if (!IS_IE11) {
        var DEMO_ROOT_1 = "demos";
        var ASSETS_PATH_1 = "demos/_assets";
        var parseTemplate_1 = function (text) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(text, "text/html");
            return doc.head.querySelector("template");
        };
        var components_1 = null;
        var excludedComponents_1 = ["calcite-button"];
        var toggleProperty_1 = function (property) {
            components_1 = components_1 || Array.from(document.body.querySelectorAll("[hydrated]"));
            components_1.forEach(function (component) {
                if (!excludedComponents_1.includes(component.tagName.toLowerCase())) {
                    component.toggleAttribute(property);
                }
            });
        };
        var attachHandlers_1 = function () {
            var buttons = document.querySelectorAll(".toggles calcite-button");
            buttons.forEach(function (button) {
                return button.addEventListener("click", function (event) { return toggleProperty_1(event.target.dataset.jsId); });
            });
        };
        var loadToggles = function () { return __awaiter(_this, void 0, void 0, function () {
            var root, response, text, template, firstChild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        root = window.location.pathname.split(DEMO_ROOT_1).shift();
                        return [4 /*yield*/, window.fetch("" + root + ASSETS_PATH_1 + "/toggles.template")];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        text = _a.sent();
                        template = parseTemplate_1(text);
                        firstChild = document.body.firstChild;
                        firstChild && document.body.insertBefore(template.content, firstChild);
                        attachHandlers_1();
                        return [2 /*return*/];
                }
            });
        }); };
        if (document.readyState === "loading") {
            // Loading hasn't finished yet
            document.addEventListener("DOMContentLoaded", loadToggles);
        }
        else {
            // `DOMContentLoaded` has already fired
            loadToggles();
        }
    }
})();
