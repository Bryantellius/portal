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
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = __importDefault(require("passport-http-bearer"));
const tokens_1 = require("../utils/security/tokens");
const models_1 = __importDefault(require("../db/models"));
passport_1.default.use(new passport_http_bearer_1.default.Strategy((token, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = yield tokens_1.ValidToken(token);
        let [user] = yield models_1.default.User.findByPk(authToken.userId);
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    }
    catch (error) {
        next(error);
    }
})));
//# sourceMappingURL=bearerstrategy.js.map