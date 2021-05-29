"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("../query"));
const getAllRoles = () => {
    return query_1.default("SELECT * FROM ROLES");
};
exports.default = { getAllRoles };
//# sourceMappingURL=roles.js.map