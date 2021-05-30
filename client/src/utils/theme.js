"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darkModeLoader = void 0;
var darkModeLoader = function () {
    var toggleMode = document.getElementById("checkbox");
    var currentMode = localStorage.getItem("theme");
    if (currentMode) {
        document.documentElement.setAttribute("data-theme", currentMode);
        if (currentMode === "DarkOcean") {
            toggleMode.checked = true;
        }
    }
    var handleThemeChange = function (event) {
        if (event.target.checked) {
            document.documentElement.setAttribute("data-theme", "DarkOcean");
            localStorage.setItem("theme", "DarkOcean");
        }
        else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    };
    toggleMode.addEventListener("change", handleThemeChange);
};
exports.darkModeLoader = darkModeLoader;
