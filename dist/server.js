/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/config/database.ts":
/*!***************************************!*\
  !*** ./src/server/config/database.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dbConfig = {
    "development": {
        "username": "portal",
        "password": "CW7WuqU2TfDJ",
        "database": "portal",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
exports.default = dbConfig;


/***/ }),

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envFound = dotenv.config();
if (!envFound) {
    throw new Error("Can't read .env file!");
}
exports.default = {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA,
    },
    port: parseInt(process.env.PORT, 10),
    secret_key: process.env.SECRET_KEY,
    lecturesDir: path.join(__dirname, "../src/server/lectures")
};


/***/ }),

/***/ "./src/server/controllers/auth.controller.ts":
/*!***************************************************!*\
  !*** ./src/server/controllers/auth.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tokens_1 = __webpack_require__(/*! ../utils/security/tokens */ "./src/server/utils/security/tokens.ts");
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const mailgun_1 = __webpack_require__(/*! ../utils/mail/mailgun */ "./src/server/utils/mail/mailgun.ts");
const passwords_1 = __webpack_require__(/*! ../utils/security/passwords */ "./src/server/utils/security/passwords.ts");
const listRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield models_1.default.Role.findAll();
    res.json(roles);
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const createUserResult = yield models_1.default.User.create(user);
        const userId = parseInt(createUserResult.get('id'));
        const accessToken = yield tokens_1.CreateToken({ userid: parseInt(createUserResult.get('id')) });
        const changePasswordLink = `http://localhost:3000/auth/password-reset?userId=${userId}&token=${accessToken}`;
        // Production:
        // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;
        // Email user with link to update password
        const sendEmailResult = yield mailgun_1.sendEmail(user.email, "Create Password", changePasswordLink);
        res.json({
            token: accessToken,
            msg: "User updated!",
            user: userId
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        delete req.user.password;
        const token = yield tokens_1.CreateToken({ userid: req.user.UserID });
        res.json({
            token,
            user: req.user,
        });
    }
    catch (error) {
        console.log("Incorrect Log In!");
        res.status(500).json(false);
    }
});
const bulkRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files) {
            res.json({ msg: "no go bro" });
            return;
        }
        const { roleID, courseID } = req.body;
        const csv = req.files.csv.data.toString().split("\n");
        const columns = csv[0].split(",");
        const subscribeTasks = Promise.all(csv.map((record, i) => __awaiter(void 0, void 0, void 0, function* () {
            if (i === 0) {
                return;
            }
            const user = {};
            record.split(",").forEach((col, idx) => {
                user[columns[idx]] = col;
            });
            user.roleID = roleID;
            user.password = "temp";
            const createUserResult = yield models_1.default.User.create(user);
            const userId = parseInt(createUserResult.get('id'));
            const classSubscribeResult = yield models_1.default.ClassList.create({
                courseID: courseID,
                userID: userId
            });
            const accessToken = yield tokens_1.CreateToken({ userid: userId });
            // Development:
            const link = `http://localhost:3000/auth/reset-password?userId=${userId}&token=${accessToken}`;
            // Production:
            // const link = `https://app.truecoders.io/update/${token}&${result.insertId}`;
            // Email user with link to update password
            const emailResult = yield mailgun_1.sendEmail(user.email, "Create Password", link);
        })));
        yield subscribeTasks;
        res.json({ msg: "Received csv" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const startPasswordReset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const userResult = yield models_1.default.User.findOne({
            where: {
                email: email
            }
        });
        const userId = parseInt(userResult.get('id'));
        const accessToken = yield tokens_1.CreateToken({ userid: userId });
        const link = `http://localhost:3000/auth/reset-password?userId=${userId}&token=${accessToken}`;
        // Email user with link to update password
        const emailResult = yield mailgun_1.sendEmail(email, "Reset Password", link);
        res.json({
            accessToken,
            msg: "Password reset link sent successfully",
            user: userResult,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(false);
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body.user;
    const { token } = req.body.creds;
    const userId = parseInt(req.body.creds.userId.toString());
    const isAuthenticated = yield tokens_1.ValidToken(token);
    if (!isAuthenticated) {
        throw new Error("Invalid token. Please try again later.");
    }
    const userUpdateModel = {
        id: userId,
        password: passwords_1.hashPassword(password)
    };
    const updateResult = yield models_1.default.User.update(userUpdateModel, {
        where: {
            id: userId
        }
    });
    res.json(updateResult);
});
exports.default = {
    login,
    register,
    bulkRegister,
    resetPassword,
    startPasswordReset,
    listRoles
};


/***/ }),

/***/ "./src/server/controllers/course.controller.ts":
/*!*****************************************************!*\
  !*** ./src/server/controllers/course.controller.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield models_1.default.Course.findAll();
    res.json(courses);
});
exports.default = {
    findAll
};


/***/ }),

/***/ "./src/server/controllers/lecture.controller.ts":
/*!******************************************************!*\
  !*** ./src/server/controllers/lecture.controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const { Lecture, Module } = models_1.default;
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    let includes = [
        { all: true, nested: true }
    ];
    if (req.params.curriculumId) {
        includes.push({
            model: Module,
            attributes: ["curriculumId"],
            where: {
                curriculumId: req.params.curriculumId
            }
        });
    }
    let whereCriteria = {};
    if (lectureId !== undefined) {
        whereCriteria.lectureId = req.params.lectureId;
    }
    const findOptions = {
        where: whereCriteria,
        include: includes
    };
    const lectures = yield Lecture.findAll(findOptions);
    res.json(lectures);
});
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const lecture = yield Lecture.findByPk(parseInt(req.params.id), {
        include: { all: true }
    });
    res.json(lecture);
});
const getLectureContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const lecture = yield models_1.default.Lecture.findByPk(id);
    const filePath = path_1.default.join(process.cwd(), "src/server/lectures", lecture.fileName);
    lecture.id;
    res.sendFile(filePath);
});
exports.default = {
    findAll,
    findById,
    getLectureContent
};


/***/ }),

/***/ "./src/server/controllers/module.controller.ts":
/*!*****************************************************!*\
  !*** ./src/server/controllers/module.controller.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const curriculumId = parseInt(req.params.curriculumId);
    const data = curriculumId !== undefined
        ? yield models_1.default.Module.findAll({
            where: {
                curriculumId: curriculumId
            }
        })
        : yield models_1.default.Module.findAll();
    res.json(data);
});
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const module = yield models_1.default.Module.findByPk(id);
    res.json(module);
});
const findByCurriculumId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const module = yield models_1.default.Module.findAll({
        where: {
            curriculumId: req.params.id
        }
    });
    res.json(module);
});
exports.default = {
    findById,
    findByCurriculumId,
    findAll
};


/***/ }),

/***/ "./src/server/controllers/quiz.controller.ts":
/*!***************************************************!*\
  !*** ./src/server/controllers/quiz.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const quiz = yield models_1.default.Quiz.findByPk(parseInt(id));
    return res.json(quiz);
});
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    const quiz = yield models_1.default.Quiz.findAll();
    return res.json(quiz);
});
const findByLectureId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { lectureId } = req.params;
    const quiz = yield models_1.default.Quiz.findAll({
        where: {
            lectureId
        }
    });
    return res.json(quiz);
});
const submitResponses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, responses } = req.body;
    for (let response of responses) {
        yield models_1.default.QuizQuestionResponse.create({
            quizQuestionId: response.quizQuestionId,
            value: response.value,
            userId: userId
        });
    }
    res.json({
        success: true
    });
});
exports.default = {
    findById,
    findAll,
    findByLectureId,
    submitResponses
};


/***/ }),

/***/ "./src/server/controllers/user.controller.ts":
/*!***************************************************!*\
  !*** ./src/server/controllers/user.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const fs_1 = __webpack_require__(/*! fs */ "fs");
const passwords_1 = __webpack_require__(/*! ../utils/security/passwords */ "./src/server/utils/security/passwords.ts");
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
            res.json({ msg: "no go bro" });
            return;
        }
        const newImage = req.files.image;
        const id = req.body.id;
        const imagePath = path_1.default.join(__dirname, `../public/assets/img/${id}${path_1.default.extname(newImage.name)}`);
        const buffer = Buffer.from(newImage.data, "base64");
        fs_1.writeFile(imagePath, buffer, (err) => {
            if (err) {
                next(err);
            }
            res.send({ msg: "File Uploaded" });
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
    uploadAssets
};


/***/ }),

/***/ "./src/server/db/models/accesstoken.ts":
/*!*********************************************!*\
  !*** ./src/server/db/models/accesstoken.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class AccessToken extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.user = this.belongsTo(models.User);
        }
    }
    ;
    AccessToken.init({
        userId: DataTypes.INTEGER,
        token: DataTypes.STRING,
        expires: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'AccessToken',
    });
    return AccessToken;
};


/***/ }),

/***/ "./src/server/db/models/classlist.ts":
/*!*******************************************!*\
  !*** ./src/server/db/models/classlist.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class ClassList extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    ;
    ClassList.init({
        courseId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ClassList',
    });
    return ClassList;
};


/***/ }),

/***/ "./src/server/db/models/course.ts":
/*!****************************************!*\
  !*** ./src/server/db/models/course.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Course extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.curriculum = this.hasOne(models.Curriculum, { foreignKey: 'curriculumId' });
        }
    }
    ;
    Course.init({
        instructorId: DataTypes.INTEGER,
        curriculumId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        currentlyActive: DataTypes.BOOLEAN,
        avatarUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};


/***/ }),

/***/ "./src/server/db/models/curriculum.ts":
/*!********************************************!*\
  !*** ./src/server/db/models/curriculum.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Curriculum extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.modules = this.hasMany(models.Module, { foreignKey: 'curriculumId' });
        }
    }
    ;
    Curriculum.init({
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Curriculum',
    });
    return Curriculum;
};


/***/ }),

/***/ "./src/server/db/models/index.ts":
/*!***************************************!*\
  !*** ./src/server/db/models/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
const database_1 = __importDefault(__webpack_require__(/*! ../../config/database */ "./src/server/config/database.ts"));
const accesstoken_1 = __importDefault(__webpack_require__(/*! ./accesstoken */ "./src/server/db/models/accesstoken.ts"));
const classlist_1 = __importDefault(__webpack_require__(/*! ./classlist */ "./src/server/db/models/classlist.ts"));
const course_1 = __importDefault(__webpack_require__(/*! ./course */ "./src/server/db/models/course.ts"));
const curriculum_1 = __importDefault(__webpack_require__(/*! ./curriculum */ "./src/server/db/models/curriculum.ts"));
const lecture_1 = __importDefault(__webpack_require__(/*! ./lecture */ "./src/server/db/models/lecture.ts"));
const module_1 = __importDefault(__webpack_require__(/*! ./module */ "./src/server/db/models/module.ts"));
const quiz_1 = __importDefault(__webpack_require__(/*! ./quiz */ "./src/server/db/models/quiz.ts"));
const quizquestion_1 = __importDefault(__webpack_require__(/*! ./quizquestion */ "./src/server/db/models/quizquestion.ts"));
const quizquestionoption_1 = __importDefault(__webpack_require__(/*! ./quizquestionoption */ "./src/server/db/models/quizquestionoption.ts"));
const quizquestionresponse_1 = __importDefault(__webpack_require__(/*! ./quizquestionresponse */ "./src/server/db/models/quizquestionresponse.ts"));
const role_1 = __importDefault(__webpack_require__(/*! ./role */ "./src/server/db/models/role.ts"));
const user_1 = __importDefault(__webpack_require__(/*! ./user */ "./src/server/db/models/user.ts"));
const basename = path_1.default.basename(__filename);
const env = "development" || 0;
// @ts-ignore
const envConfig = database_1.default[env];
if (envConfig.use_env_variable) {
    var sequelize = new sequelize_1.Sequelize(process.env[envConfig.use_env_variable], envConfig);
}
else {
    var sequelize = new sequelize_1.Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
}
const modelFiles = fs_1.default
    .readdirSync(path_1.default.resolve("src/server/db/models"))
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
});
const db = {
    sequelize,
    Sequelize: sequelize_1.Sequelize,
    AccessToken: accesstoken_1.default(sequelize, sequelize_1.Sequelize),
    ClassList: classlist_1.default(sequelize, sequelize_1.Sequelize),
    Course: course_1.default(sequelize, sequelize_1.Sequelize),
    Curriculum: curriculum_1.default(sequelize, sequelize_1.Sequelize),
    Lecture: lecture_1.default(sequelize, sequelize_1.Sequelize),
    Module: module_1.default(sequelize, sequelize_1.Sequelize),
    Quiz: quiz_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestion: quizquestion_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestionOption: quizquestionoption_1.default(sequelize, sequelize_1.Sequelize),
    QuizQuestionResponse: quizquestionresponse_1.default(sequelize, sequelize_1.Sequelize),
    Role: role_1.default(sequelize, sequelize_1.Sequelize),
    User: user_1.default(sequelize, sequelize_1.Sequelize)
};
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports.default = db;


/***/ }),

/***/ "./src/server/db/models/lecture.ts":
/*!*****************************************!*\
  !*** ./src/server/db/models/lecture.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Lecture extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureId' });
            this.module = this.belongsTo(models.Module, { foreignKey: 'moduleId' });
        }
    }
    ;
    Lecture.init({
        moduleId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        fileName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lecture',
    });
    return Lecture;
};


/***/ }),

/***/ "./src/server/db/models/module.ts":
/*!****************************************!*\
  !*** ./src/server/db/models/module.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Module extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    Module.init({
        curriculumId: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Module',
    });
    return Module;
};


/***/ }),

/***/ "./src/server/db/models/quiz.ts":
/*!**************************************!*\
  !*** ./src/server/db/models/quiz.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Quiz extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.questions = this.hasMany(models.QuizQuestion, { foreignKey: 'quizId', as: 'questions' });
        }
    }
    ;
    Quiz.init({
        lectureId: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Quiz',
    });
    return Quiz;
};


/***/ }),

/***/ "./src/server/db/models/quizquestion.ts":
/*!**********************************************!*\
  !*** ./src/server/db/models/quizquestion.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class QuizQuestion extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.options = this.hasMany(models.QuizQuestionOption, { foreignKey: 'quizQuestionId', as: 'options' });
        }
    }
    ;
    QuizQuestion.init({
        quizId: DataTypes.INTEGER,
        text: DataTypes.STRING,
        type: DataTypes.INTEGER,
        sortOrder: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'QuizQuestion',
    });
    return QuizQuestion;
};


/***/ }),

/***/ "./src/server/db/models/quizquestionoption.ts":
/*!****************************************************!*\
  !*** ./src/server/db/models/quizquestionoption.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class QuizQuestionOption extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    QuizQuestionOption.init({
        quizQuestionId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'QuizQuestionOption',
    });
    return QuizQuestionOption;
};


/***/ }),

/***/ "./src/server/db/models/quizquestionresponse.ts":
/*!******************************************************!*\
  !*** ./src/server/db/models/quizquestionresponse.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class QuizQuestionResponse extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    QuizQuestionResponse.init({
        quizQuestionId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'QuizQuestionResponse',
    });
    return QuizQuestionResponse;
};


/***/ }),

/***/ "./src/server/db/models/role.ts":
/*!**************************************!*\
  !*** ./src/server/db/models/role.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class Role extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    Role.init({
        title: DataTypes.STRING,
        access: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};


/***/ }),

/***/ "./src/server/db/models/user.ts":
/*!**************************************!*\
  !*** ./src/server/db/models/user.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.role = this.belongsTo(models.Role, { foreignKey: "roleId" });
        }
    }
    ;
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        avatarUrl: DataTypes.STRING,
        lastLectureId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};


/***/ }),

/***/ "./src/server/middleware/auth.ts":
/*!***************************************!*\
  !*** ./src/server/middleware/auth.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const authenticateUser = (req, res, next) => {
    passport_1.default.authenticate("bearer", { session: false }, (err, user, info) => {
        if (user) {
            req.user = user;
        }
        return next();
    })(req, res, next);
};
exports.default = authenticateUser;


/***/ }),

/***/ "./src/server/middleware/bearerstrategy.ts":
/*!*************************************************!*\
  !*** ./src/server/middleware/bearerstrategy.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const passport_http_bearer_1 = __importDefault(__webpack_require__(/*! passport-http-bearer */ "passport-http-bearer"));
const tokens_1 = __webpack_require__(/*! ../utils/security/tokens */ "./src/server/utils/security/tokens.ts");
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
passport_1.default.use(new passport_http_bearer_1.default.Strategy((token, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let payload = yield tokens_1.ValidToken(token);
        let [user] = yield models_1.default.User.findByPk(payload.userid);
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


/***/ }),

/***/ "./src/server/middleware/localstrategy.ts":
/*!************************************************!*\
  !*** ./src/server/middleware/localstrategy.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const passport_local_1 = __importDefault(__webpack_require__(/*! passport-local */ "passport-local"));
const models_1 = __importDefault(__webpack_require__(/*! ../db/models */ "./src/server/db/models/index.ts"));
const passwords_1 = __webpack_require__(/*! ../utils/security/passwords */ "./src/server/utils/security/passwords.ts");
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


/***/ }),

/***/ "./src/server/routes/api/admin.router.ts":
/*!***********************************************!*\
  !*** ./src/server/routes/api/admin.router.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const models_1 = __importDefault(__webpack_require__(/*! ../../db/models */ "./src/server/db/models/index.ts"));
const router = express_1.default.Router();
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lecture = req.body;
        const createLectureResponse = yield models_1.default.Lecture.create(lecture);
        res.json(createLectureResponse);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;


/***/ }),

/***/ "./src/server/routes/api/auth.router.ts":
/*!**********************************************!*\
  !*** ./src/server/routes/api/auth.router.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const express_fileupload_1 = __importDefault(__webpack_require__(/*! express-fileupload */ "express-fileupload"));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
const auth_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/auth.controller */ "./src/server/controllers/auth.controller.ts"));
const authRouter = express_1.default.Router({ mergeParams: true });
authRouter.use(express_fileupload_1.default());
authRouter.post("/login", passport_1.default.authenticate("local"), auth_controller_1.default.login);
authRouter.post("/register", auth_controller_1.default.register);
authRouter.post("/bulk-register", auth_controller_1.default.bulkRegister);
authRouter.post("/forgot-password", auth_controller_1.default.startPasswordReset);
authRouter.post("/reset-password", auth_controller_1.default.resetPassword);
authRouter.get("/roles", auth_controller_1.default.listRoles);
exports.default = authRouter;


/***/ }),

/***/ "./src/server/routes/api/course.router.ts":
/*!************************************************!*\
  !*** ./src/server/routes/api/course.router.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const course_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/course.controller */ "./src/server/controllers/course.controller.ts"));
const courseRouter = express_1.Router({ mergeParams: true });
courseRouter.get('/', course_controller_1.default.findAll);
exports.default = courseRouter;


/***/ }),

/***/ "./src/server/routes/api/lecture.router.ts":
/*!*************************************************!*\
  !*** ./src/server/routes/api/lecture.router.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const lecture_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/lecture.controller */ "./src/server/controllers/lecture.controller.ts"));
const lectureRouter = express_1.Router({ mergeParams: true });
lectureRouter.get("/", lecture_controller_1.default.findAll);
lectureRouter.get("/:id", lecture_controller_1.default.findById);
lectureRouter.get("/:id/content", lecture_controller_1.default.getLectureContent);
exports.default = lectureRouter;


/***/ }),

/***/ "./src/server/routes/api/module.router.ts":
/*!************************************************!*\
  !*** ./src/server/routes/api/module.router.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const module_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/module.controller */ "./src/server/controllers/module.controller.ts"));
const moduleRouter = express_1.Router({ mergeParams: true });
moduleRouter.get('/:id', module_controller_1.default.findById);
moduleRouter.get('/', module_controller_1.default.findAll);
exports.default = moduleRouter;


/***/ }),

/***/ "./src/server/routes/api/quiz.router.ts":
/*!**********************************************!*\
  !*** ./src/server/routes/api/quiz.router.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const quiz_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/quiz.controller */ "./src/server/controllers/quiz.controller.ts"));
const quizRouter = express_1.Router({ mergeParams: true });
quizRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return req.params.lectureId
        ? yield quiz_controller_1.default.findByLectureId(req, res, next)
        : yield quiz_controller_1.default.findAll(req, res, next);
}));
quizRouter.get("/:id", quiz_controller_1.default.findById);
quizRouter.post("/:id", quiz_controller_1.default.submitResponses);
exports.default = quizRouter;


/***/ }),

/***/ "./src/server/routes/api/user.router.ts":
/*!**********************************************!*\
  !*** ./src/server/routes/api/user.router.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const express_fileupload_1 = __importDefault(__webpack_require__(/*! express-fileupload */ "express-fileupload"));
const user_controller_1 = __importDefault(__webpack_require__(/*! ../../controllers/user.controller */ "./src/server/controllers/user.controller.ts"));
const userRouter = express_1.default.Router({ mergeParams: true });
userRouter.use(express_fileupload_1.default());
userRouter.get("/:id", user_controller_1.default.findById);
userRouter.put("/:id", user_controller_1.default.updateUser);
userRouter.post("/assets", user_controller_1.default.uploadAssets);
userRouter.post("/", user_controller_1.default.createUser);
exports.default = userRouter;


/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __webpack_require__(/*! express */ "express");
const admin_router_1 = __importDefault(__webpack_require__(/*! ./api/admin.router */ "./src/server/routes/api/admin.router.ts"));
const auth_router_1 = __importDefault(__webpack_require__(/*! ./api/auth.router */ "./src/server/routes/api/auth.router.ts"));
const lecture_router_1 = __importDefault(__webpack_require__(/*! ./api/lecture.router */ "./src/server/routes/api/lecture.router.ts"));
const quiz_router_1 = __importDefault(__webpack_require__(/*! ./api/quiz.router */ "./src/server/routes/api/quiz.router.ts"));
const user_router_1 = __importDefault(__webpack_require__(/*! ./api/user.router */ "./src/server/routes/api/user.router.ts"));
const auth_1 = __importDefault(__webpack_require__(/*! ../middleware/auth */ "./src/server/middleware/auth.ts"));
const course_router_1 = __importDefault(__webpack_require__(/*! ./api/course.router */ "./src/server/routes/api/course.router.ts"));
const module_router_1 = __importDefault(__webpack_require__(/*! ./api/module.router */ "./src/server/routes/api/module.router.ts"));
const router = express_1.Router();
router.use(auth_1.default);
router.use("/admin", admin_router_1.default);
router.use("/api/auth", auth_router_1.default);
router.use("/api/user", user_router_1.default);
router.use("/api/lecture", lecture_router_1.default);
router.use("/api/curriculum/:curriculumId/lecture", lecture_router_1.default);
router.use("/api/curriculum/:curriculumId/module", module_router_1.default);
router.use("/api/quiz", quiz_router_1.default);
router.use("/api/lecture/:lectureId/quiz", quiz_router_1.default);
router.use("/api/course", course_router_1.default);
router.use("/api/module", module_router_1.default);
exports.default = router;


/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const morgan_1 = __importDefault(__webpack_require__(/*! morgan */ "morgan"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const routes_1 = __importDefault(__webpack_require__(/*! ./routes */ "./src/server/routes/index.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ./config */ "./src/server/config/index.ts"));
const passport_1 = __importDefault(__webpack_require__(/*! passport */ "passport"));
__webpack_require__(/*! ./middleware/bearerstrategy */ "./src/server/middleware/bearerstrategy.ts");
__webpack_require__(/*! ./middleware/localstrategy */ "./src/server/middleware/localstrategy.ts");
const app = express_1.default();
app.use(express_1.default.static("public"));
app.use(passport_1.default.initialize());
app.use(express_1.default.json());
app.use(morgan_1.default("dev"));
app.use(routes_1.default);
app.use("*", (req, res, next) => {
    try {
        res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
    }
    catch (error) {
        next(error);
    }
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ name: err.name, msg: err.message });
});
app.listen(config_1.default.port, () => console.log("Server listening on port " + config_1.default.port));


/***/ }),

/***/ "./src/server/utils/mail/mailgun.ts":
/*!******************************************!*\
  !*** ./src/server/utils/mail/mailgun.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendEmail = void 0;
const mailgun_js_1 = __importDefault(__webpack_require__(/*! mailgun-js */ "mailgun-js"));
const mg = mailgun_js_1.default({
    apiKey: process.env.MAILGUNAPIKEY,
    domain: process.env.MAILGUNDOMAIN,
});
const sendEmail = (to, content, link) => {
    const todaysDate = new Date();
    let data = {
        to,
        from: "support@truecoders.io",
        subject: "TrueCoders - Account Update",
        text: content,
        html: `<h1>Test</h1><p>${todaysDate.toLocaleDateString()}</p><a href='${link}'>Update Info</a>`,
    };
    return mg.messages().send(data);
};
exports.sendEmail = sendEmail;


/***/ }),

/***/ "./src/server/utils/security/passwords.ts":
/*!************************************************!*\
  !*** ./src/server/utils/security/passwords.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ "bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(password, 10);
    return hash;
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hash);
});
exports.comparePassword = comparePassword;


/***/ }),

/***/ "./src/server/utils/security/tokens.ts":
/*!*********************************************!*\
  !*** ./src/server/utils/security/tokens.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidToken = exports.CreateToken = void 0;
const crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
const jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ "jsonwebtoken"));
const models_1 = __importDefault(__webpack_require__(/*! ../../db/models */ "./src/server/db/models/index.ts"));
const config_1 = __importDefault(__webpack_require__(/*! ../../config */ "./src/server/config/index.ts"));
const CreateToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.unique = crypto_1.default.randomBytes(32).toString("hex");
    const token = jsonwebtoken_1.default.sign(payload, config_1.default.secret_key);
    yield models_1.default.AccessToken.create({
        userId: payload.userid,
        token: token
    });
    return token;
});
exports.CreateToken = CreateToken;
const ValidToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.decode(token);
    const validatedToken = yield models_1.default.AccessToken.findOne({
        where: {
            id: payload.accesstokenid
        }
    });
    if (!validatedToken) {
        throw new Error("Invalid Token");
    }
    else {
        return payload;
    }
});
exports.ValidToken = ValidToken;


/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("express-fileupload");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "mailgun-js":
/*!*****************************!*\
  !*** external "mailgun-js" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("mailgun-js");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");;

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");;

/***/ }),

/***/ "passport-http-bearer":
/*!***************************************!*\
  !*** external "passport-http-bearer" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("passport-http-bearer");;

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=server.js.map