"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../db/models"));
const tokens_1 = require("../utils/security/tokens");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        roleId: req.body.roleId,
        avatarUrl: req.body.avatarUrl,
        password: "temp"
    };
    const createResult = yield models_1.default.User.create(user);
    const subscribeResult = yield models_1.default.ClassList.create({
        courseID: req.body.classList.courseID,
        userID: createResult.get('id'),
    });
    const accessToken = yield tokens_1.CreateToken({ userid: subscribeResult.get('id') });
});
//# sourceMappingURL=register.controller.js.map