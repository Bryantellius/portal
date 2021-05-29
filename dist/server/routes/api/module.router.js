"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const module_controller_1 = __importDefault(require("../../controllers/module.controller"));
const moduleRouter = express_1.Router({ mergeParams: true });
moduleRouter.get('/:id', module_controller_1.default.findById);
moduleRouter.get('/', module_controller_1.default.findAll);
exports.default = moduleRouter;
//# sourceMappingURL=module.router.js.map