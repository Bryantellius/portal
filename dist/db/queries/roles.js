"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var getAllRoles = function () {
    return models_1.default("SELECT * FROM ROLES");
};
exports.default = { getAllRoles: getAllRoles };
//# sourceMappingURL=roles.js.map