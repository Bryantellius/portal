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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const passwords_1 = require("../utils/security/passwords");
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield models_1.default.User.findByPk(parseInt(id), {
            include: [{
                    all: true,
                    nested: true
                }]
        });
        console.log(user);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
const getSignedInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    console.log(authUser);
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, classList } = req.body;
        user.password = passwords_1.hashPassword(user.password);
        const createResponse = yield models_1.default.User.create(user);
        classList.userId = createResponse.insertId;
        const courseSubscriptionResponse = yield models_1.default.ClassList.create(classList);
        res.json(courseSubscriptionResponse);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.body;
        if (user.avatarUrl) {
            user.avatarUrl = user.avatarUrl + path_1.default.extname(user.fileName);
            delete user.fileName;
        }
        const updateUserResponse = yield models_1.default.User.update(user, {
            where: {
                id: id
            }
        });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
const uploadAssets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            res.json({ msg: 'no go bro' });
            return;
        }
        const newImage = req.files.image;
        const id = req.body.id;
        const imagePath = path_1.default.join(__dirname, `../public/assets/img/${id}${path_1.default.extname(newImage.name)}`);
        const buffer = Buffer.from(newImage.data, 'base64');
        fs_1.writeFile(imagePath, buffer, (err) => {
            if (err) {
                next(err);
            }
            res.send({ msg: 'File Uploaded' });
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    findById,
    createUser,
    updateUser,
    uploadAssets,
    getSignedInUser
};
//# sourceMappingURL=user.controller.js.map