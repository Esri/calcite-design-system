(function () {
    var icons = {};
    var $icons = [];
    fetch("./icons.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (payload) {
        icons = payload.icons;
        document.querySelector(".js-version").innerHTML = payload.version;
        document.querySelector(".js-search").addEventListener("input", searchIcons);
        calcite.bus.on("modal:close", removeHash);
        startup();
    });
    function startup() {
        document.querySelector(".js-loader").classList.add("hide");
        var $iconContainer = document.querySelector(".js-icons");
        Object.keys(icons)
            .map(function (key) {
            return { name: key, icon: icons[key] };
        })
            .forEach(function (detail) {
            var $btn = document.createElement("button");
            $btn.classList =
                "js-modal-toggle block padding-leader-2 padding-trailer-2 trailer-1 js-icon-select icon-select btn btn-transparent";
            $btn.setAttribute("data-icon", detail.name);
            $btn.setAttribute("data-modal", "iconDetail");
            $btn.setAttribute("aria-label", "View details of icon: " + detail.name);
            $btn.appendChild(getSVG(detail.icon["32"], 32));
            var $name = document.createElement("span");
            $name.innerHTML = detail.name;
            $name.classList.add("icon-select--name");
            $btn.appendChild($name);
            $iconContainer.appendChild($btn);
            $btn.addEventListener("click", showDetail);
            $icons.push($btn);
        });
        calcite.init();
        if (window.location.hash.length > 1) {
            var active = window.location.hash.substring(1);
            if (icons[active]) {
                $iconContainer.querySelector('.js-icon-select[data-icon="' + active + '"]').click();
            }
        }
    }
    function searchIcons(e) {
        $icons.forEach(function ($btn) {
            var name = $btn.getAttribute("data-icon");
            var icon = icons[name];
            var iconText = name + icon.alias.join("");
            var terms = e.target.value.toLowerCase().split(" ");
            var matches = terms.reduce((acc, term) => acc && iconText.toLowerCase().includes(term), true);
            if (matches) {
                $btn.classList.remove("hide");
            }
            else {
                $btn.classList.add("hide");
            }
        });
    }
    function showDetail(e) {
        var key = e.target.getAttribute("data-icon");
        var icon = icons[key];
        var filled = key.substring(key.length - 2);
        var isFilled = filled === "-f";
        var baseName = isFilled ? key.substring(0, key.length - 2) : key;
        var baseURL = "https://raw.githubusercontent.com/Esri/calcite-design-system/main/packages/calcite-ui-icons/icons/" + encodeURIComponent(baseName) + "-";
        var suffix = ".svg";
        var tags = icon.alias
            .map(function (alias) {
            return ('<span class="label inline-block margin-right-quarter trailer-quarter">' +
                encodeURIComponent(alias) +
                "</span>");
        })
            .join("");
        window.location.hash = encodeURIComponent(key);
        document.querySelector(".js-detail-name").textContent = key;
        document.querySelector(".js-detail-aliases").innerHTML = (tags && tags) || "---";
        document.querySelector(".js-detail-category").textContent = (icon.category && icon.category) || "---";
        document.querySelector(".js-detail-release").textContent = (icon.release && icon.release) || "---";
        [16, 24, 32].forEach(function (size) {
            document.querySelector(".js-link-" + size).href =
                baseURL + size + (isFilled ? encodeURIComponent(filled) : "") + suffix;
            var iconDetail = document.querySelector(".js-detail-" + size);
            iconDetail.innerHTML = "";
            iconDetail.appendChild(getSVG(icon[size], size));
        });
    }
    function getSVG(paths, size) {
        var $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        $svg.setAttribute("width", size);
        $svg.setAttribute("height", size);
        if (typeof paths === "string") {
            paths = [paths];
        }
        paths.forEach(function (path) {
            var $path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            if (typeof path === "string") {
                $path.setAttribute("d", path);
            }
            else {
                $path.setAttribute("d", path.d);
                if (path.opacity) {
                    $path.setAttribute("opacity", path.opacity);
                }
            }
            $svg.appendChild($path);
        });
        return $svg;
    }
    function removeHash(fromOpen) {
        if (!fromOpen) {
            window.location.hash = "?";
        }
    }
})();
