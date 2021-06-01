"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const userRouter = express_1.default.Router({ mergeParams: true });
userRouter.use(express_fileupload_1.default());
userRouter.get("/:id", user_controller_1.default.findById);
userRouter.put("/:id", user_controller_1.default.updateUser);
userRouter.get('/profile', (req, res, next) => {
    return user_controller_1.default.getSignedInUser(req, res, next);
});
userRouter.post("/assets", user_controller_1.default.uploadAssets);
userRouter.post("/", user_controller_1.default.createUser);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map