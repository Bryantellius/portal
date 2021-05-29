"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = __importDefault(require("../../controllers/auth.controller"));
const authRouter = express_1.default.Router({ mergeParams: true });
authRouter.use(express_fileupload_1.default());
authRouter.post("/login", passport_1.default.authenticate("local"), auth_controller_1.default.login);
authRouter.post("/register", auth_controller_1.default.register);
authRouter.post("/bulk-register", auth_controller_1.default.bulkRegister);
authRouter.post("/forgot-password", auth_controller_1.default.startPasswordReset);
authRouter.post("/reset-password", auth_controller_1.default.resetPassword);
authRouter.get("/roles", auth_controller_1.default.listRoles);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map