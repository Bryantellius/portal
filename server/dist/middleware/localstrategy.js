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
const passport_local_1 = __importDefault(require("passport-local"));
const models_1 = __importDefault(require("../db/models"));
const passwords_1 = require("../utils/security/passwords");
passport_1.default.serializeUser((user, next) => next(null, user));
passport_1.default.deserializeUser((user, next) => next(null, user));
passport_1.default.use(new passport_local_1.default.Strategy({ usernameField: "email", session: false }, (email, password, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield models_1.default.User.findOne({
            where: {
                email: email
            },
            include: [models_1.default.Role]
        });
        if (user && (yield passwords_1.comparePassword(password, user.password))) {
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
//# sourceMappingURL=localstrategy.js.map