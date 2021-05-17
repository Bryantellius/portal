/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\nvar envFound = dotenv.config();\nif (!envFound) {\n    throw new Error(\"Can't read .env file!\");\n}\nexports.default = {\n    mysql: {\n        host: process.env.DB_HOST,\n        user: process.env.DB_USER,\n        password: process.env.DB_PASS,\n        database: process.env.DB_SCHEMA,\n    },\n    port: parseInt(process.env.PORT, 10),\n    secret_key: process.env.SECRET_KEY,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/config/index.ts?");

/***/ }),

/***/ "./src/server/db/models/index.ts":
/*!***************************************!*\
  !*** ./src/server/db/models/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar mysql = __webpack_require__(/*! mysql */ \"mysql\");\nvar config_1 = __webpack_require__(/*! ../../config */ \"./src/server/config/index.ts\");\nvar connection = mysql.createPool(config_1.default.mysql);\nvar Query = function (query, values) {\n    return new Promise(function (resolve, reject) {\n        connection.query(query, values, function (err, results) {\n            if (err) {\n                reject(err);\n            }\n            resolve(results);\n        });\n    });\n};\nexports.default = Query;\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/models/index.ts?");

/***/ }),

/***/ "./src/server/db/queries/lectures.ts":
/*!*******************************************!*\
  !*** ./src/server/db/queries/lectures.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar models_1 = __webpack_require__(/*! ../models */ \"./src/server/db/models/index.ts\");\nvar getOneLecture = function (id) {\n    return models_1.default(\"SELECT * FROM Lectures WHERE LectureID = ?\", [id]);\n};\nvar getOneLectureByTopicID = function (id) {\n    return models_1.default(\"SELECT * FROM Lectures WHERE TopicID = ?\", [id]);\n};\nvar getAllLectures = function () {\n    return models_1.default(\"SELECT * FROM Lectures\");\n};\nvar insertLecture = function (body) {\n    return models_1.default(\"INSERT INTO Lectures SET ?\", [body]);\n};\nexports.default = {\n    getOneLecture: getOneLecture,\n    getOneLectureByTopicID: getOneLectureByTopicID,\n    getAllLectures: getAllLectures,\n    insertLecture: insertLecture,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/queries/lectures.ts?");

/***/ }),

/***/ "./src/server/db/queries/modules.ts":
/*!******************************************!*\
  !*** ./src/server/db/queries/modules.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar models_1 = __webpack_require__(/*! ../models */ \"./src/server/db/models/index.ts\");\nvar getAllModulesByCurriculum = function (id) {\n    return models_1.default(\"SELECT * FROM Modules WHERE CurriculumID = ?\", [id]);\n};\nvar getOneModuleByTopicID = function (id) {\n    return models_1.default(\"SELECT * FROM Modules WHERE TopicID = ?\", [id]);\n};\nvar getAllModules = function () {\n    return models_1.default(\"SELECT * FROM Modules\");\n};\nvar insertModule = function (body) {\n    return models_1.default(\"INSERT INTO Modules SET ?\", [body]);\n};\nexports.default = {\n    getAllModulesByCurriculum: getAllModulesByCurriculum,\n    getOneModuleByTopicID: getOneModuleByTopicID,\n    getAllModules: getAllModules,\n    insertModule: insertModule,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/queries/modules.ts?");

/***/ }),

/***/ "./src/server/db/queries/tokens.ts":
/*!*****************************************!*\
  !*** ./src/server/db/queries/tokens.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar models_1 = __webpack_require__(/*! ../models */ \"./src/server/db/models/index.ts\");\nvar findToken = function (tokenid, token) {\n    return models_1.default(\"SELECT * FROM AccessTokens WHERE TokenID = ? AND Token = ?\", [\n        tokenid,\n        token,\n    ]);\n};\nvar addToken = function (userid) {\n    return models_1.default(\"INSERT INTO AccessTokens SET UserID = ?\", [userid]);\n};\nvar updateToken = function (TokenID, token) {\n    return models_1.default(\"UPDATE AccessTokens SET token = ? WHERE TokenID = ?\", [\n        token,\n        TokenID,\n    ]);\n};\nexports.default = {\n    findToken: findToken,\n    addToken: addToken,\n    updateToken: updateToken,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/queries/tokens.ts?");

/***/ }),

/***/ "./src/server/db/queries/topics.ts":
/*!*****************************************!*\
  !*** ./src/server/db/queries/topics.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar models_1 = __webpack_require__(/*! ../models */ \"./src/server/db/models/index.ts\");\nvar getOneTopic = function (id) {\n    return models_1.default(\"SELECT * FROM Topics WHERE TopicID = ?\", [id]);\n};\nvar getTopicsByCurriculum = function (id) {\n    return models_1.default(\"select t.TopicID, t.ModuleID, t.Title, m.CurriculumID, m.Title as Module, m.ModuleID from topics as t INNER JOIN modules as m ON m.ModuleID = t.ModuleID WHERE m.CurriculumID = ?\", [id]);\n};\nvar insertTopic = function (body) {\n    return models_1.default(\"INSERT INTO Topics SET ?\", [body]);\n};\nexports.default = {\n    getOneTopic: getOneTopic,\n    getTopicsByCurriculum: getTopicsByCurriculum,\n    insertTopic: insertTopic,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/queries/topics.ts?");

/***/ }),

/***/ "./src/server/db/queries/users.ts":
/*!****************************************!*\
  !*** ./src/server/db/queries/users.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar models_1 = __webpack_require__(/*! ../models */ \"./src/server/db/models/index.ts\");\nvar findOneUserById = function (userid) {\n    return models_1.default(\"SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password FROM USERS as u WHERE u.UserID = ?\", [userid]);\n};\nvar getOneUserById = function (userid) {\n    return models_1.default(\"SELECT u.UserID, u.FirstName, u.LastName, u.email, u.RoleID, u.AvatarUrl, u.LastLectureID, u._created as created, c.CurriculumID, c.Title as Course, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID INNER JOIN classlist as cl ON cl.UserID = u.UserID INNER JOIN courses as c ON c.CourseID = cl.CourseID WHERE u.UserID = ?\", [userid]);\n};\nvar findOneUserByEmail = function (email) {\n    return models_1.default(\"SELECT u.UserID, u.FirstName, u.LastName, u.email, u.password, u.RoleID, u.AvatarUrl, u.LastLectureID, r.Title, r.Access FROM USERS as u INNER JOIN Roles as r ON r.RoleID = u.RoleID WHERE u.email = ?\", [email]);\n};\nvar insertUser = function (user) {\n    return models_1.default(\"INSERT INTO Users SET ?\", [user]);\n};\nvar updateUser = function (userid, user) {\n    return models_1.default(\"UPDATE Users SET ? WHERE UserID = ?\", [user, userid]);\n};\nvar removeUser = function (userid) {\n    return models_1.default(\"DELETE FROM Users WHERE UserID = ?\", [userid]);\n};\nexports.default = {\n    findOneUserByEmail: findOneUserByEmail,\n    findOneUserById: findOneUserById,\n    getOneUserById: getOneUserById,\n    insertUser: insertUser,\n    updateUser: updateUser,\n    removeUser: removeUser,\n};\n\n\n//# sourceURL=webpack://starter_template/./src/server/db/queries/users.ts?");

/***/ }),

/***/ "./src/server/middleware/bearerstrategy.ts":
/*!*************************************************!*\
  !*** ./src/server/middleware/bearerstrategy.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar BearerStrategy = __webpack_require__(/*! passport-http-bearer */ \"passport-http-bearer\");\nvar tokens_1 = __webpack_require__(/*! ../utils/security/tokens */ \"./src/server/utils/security/tokens.ts\");\nvar users_1 = __webpack_require__(/*! ../db/queries/users */ \"./src/server/db/queries/users.ts\");\npassport.use(new BearerStrategy.Strategy(function (token, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var payload, user, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                return [4 /*yield*/, tokens_1.ValidToken(token)];\n            case 1:\n                payload = _a.sent();\n                return [4 /*yield*/, users_1.default.findOneUserById(payload.userid)];\n            case 2:\n                user = (_a.sent())[0];\n                if (user) {\n                    next(null, user);\n                }\n                else {\n                    next(null, false);\n                }\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); }));\n\n\n//# sourceURL=webpack://starter_template/./src/server/middleware/bearerstrategy.ts?");

/***/ }),

/***/ "./src/server/middleware/localstrategy.ts":
/*!************************************************!*\
  !*** ./src/server/middleware/localstrategy.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar LocalStrategy = __webpack_require__(/*! passport-local */ \"passport-local\");\nvar users_1 = __webpack_require__(/*! ../db/queries/users */ \"./src/server/db/queries/users.ts\");\nvar passwords_1 = __webpack_require__(/*! ../utils/security/passwords */ \"./src/server/utils/security/passwords.ts\");\npassport.serializeUser(function (user, next) { return next(null, user); });\npassport.deserializeUser(function (user, next) { return next(null, user); });\npassport.use(new LocalStrategy.Strategy({ usernameField: \"email\", session: false }, function (email, password, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var user, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, users_1.default.findOneUserByEmail(email)];\n            case 1:\n                user = _a.sent();\n                if (user[0] && passwords_1.comparePassword(password, user[0].password)) {\n                    next(null, user[0]);\n                }\n                else {\n                    next(null, false);\n                }\n                return [3 /*break*/, 3];\n            case 2:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); }));\n\n\n//# sourceURL=webpack://starter_template/./src/server/middleware/localstrategy.ts?");

/***/ }),

/***/ "./src/server/routes/api/adminRouter.ts":
/*!**********************************************!*\
  !*** ./src/server/routes/api/adminRouter.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar lectures_1 = __webpack_require__(/*! ../../db/queries/lectures */ \"./src/server/db/queries/lectures.ts\");\nvar router = express.Router();\nrouter.post(\"/\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var body, data, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                body = req.body;\n                return [4 /*yield*/, lectures_1.default.insertLecture(body)];\n            case 1:\n                data = _a.sent();\n                res.status(200).json(data);\n                return [3 /*break*/, 3];\n            case 2:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/api/adminRouter.ts?");

/***/ }),

/***/ "./src/server/routes/api/index.ts":
/*!****************************************!*\
  !*** ./src/server/routes/api/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar resources_1 = __webpack_require__(/*! ./resources */ \"./src/server/routes/api/resources/index.ts\");\nvar users_1 = __webpack_require__(/*! ./users */ \"./src/server/routes/api/users/index.ts\");\nvar adminRouter_1 = __webpack_require__(/*! ./adminRouter */ \"./src/server/routes/api/adminRouter.ts\");\nvar router = express.Router();\nrouter.use(\"/admin\", adminRouter_1.default);\nrouter.use(\"/resources\", resources_1.default);\nrouter.use(\"/users\", users_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/api/index.ts?");

/***/ }),

/***/ "./src/server/routes/api/resources/index.ts":
/*!**************************************************!*\
  !*** ./src/server/routes/api/resources/index.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar lectures_1 = __webpack_require__(/*! ../../../db/queries/lectures */ \"./src/server/db/queries/lectures.ts\");\nvar topics_1 = __webpack_require__(/*! ../../../db/queries/topics */ \"./src/server/db/queries/topics.ts\");\nvar modules_1 = __webpack_require__(/*! ../../../db/queries/modules */ \"./src/server/db/queries/modules.ts\");\nvar router = express.Router();\nrouter.get(\"/lectures/:id?\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, data, filePath, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                id = req.params.id;\n                return [4 /*yield*/, lectures_1.default.getOneLectureByTopicID(parseInt(id))];\n            case 1:\n                data = _a.sent();\n                filePath = path.join(__dirname, data[0].FilePath);\n                res.sendFile(filePath);\n                return [3 /*break*/, 3];\n            case 2:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nrouter.get(\"/lectures-info/:id?\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, data, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                id = req.params.id;\n                return [4 /*yield*/, lectures_1.default.getOneLectureByTopicID(parseInt(id))];\n            case 1:\n                data = _a.sent();\n                res.json(data);\n                return [3 /*break*/, 3];\n            case 2:\n                error_2 = _a.sent();\n                next(error_2);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nrouter.get(\"/modules/:id?\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, data, error_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = parseInt(req.params.id);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 6, , 7]);\n                if (!id) return [3 /*break*/, 3];\n                return [4 /*yield*/, modules_1.default.getAllModulesByCurriculum(id)];\n            case 2:\n                data = _a.sent();\n                return [3 /*break*/, 5];\n            case 3: return [4 /*yield*/, modules_1.default.getAllModules()];\n            case 4:\n                data = _a.sent();\n                _a.label = 5;\n            case 5:\n                res.status(200).json(data);\n                return [3 /*break*/, 7];\n            case 6:\n                error_3 = _a.sent();\n                next(error_3);\n                return [3 /*break*/, 7];\n            case 7: return [2 /*return*/];\n        }\n    });\n}); });\nrouter.get(\"/topics/:id?\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, data, error_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                id = parseInt(req.params.id);\n                _a.label = 1;\n            case 1:\n                _a.trys.push([1, 3, , 4]);\n                return [4 /*yield*/, topics_1.default.getTopicsByCurriculum(id)];\n            case 2:\n                // if (id) {\n                //   data = await topics.getOneTopic(id);\n                // } else {\n                data = _a.sent();\n                // }\n                res.status(200).json(data);\n                return [3 /*break*/, 4];\n            case 3:\n                error_4 = _a.sent();\n                next(error_4);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/api/resources/index.ts?");

/***/ }),

/***/ "./src/server/routes/api/users/index.ts":
/*!**********************************************!*\
  !*** ./src/server/routes/api/users/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar users_1 = __webpack_require__(/*! ../../../db/queries/users */ \"./src/server/db/queries/users.ts\");\nvar router = express.Router();\nrouter.get(\"/:id\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, data, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                id = req.params.id;\n                return [4 /*yield*/, users_1.default.getOneUserById(parseInt(id))];\n            case 1:\n                data = _a.sent();\n                res.json(data);\n                return [3 /*break*/, 3];\n            case 2:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nrouter.put(\"/update/:id\", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var id, body, data, error_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                id = req.params.id;\n                body = req.body;\n                return [4 /*yield*/, users_1.default.updateUser(parseInt(id), body)];\n            case 1:\n                data = _a.sent();\n                res.json(data);\n                return [3 /*break*/, 3];\n            case 2:\n                error_2 = _a.sent();\n                next(error_2);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/api/users/index.ts?");

/***/ }),

/***/ "./src/server/routes/auth/index.ts":
/*!*****************************************!*\
  !*** ./src/server/routes/auth/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar loginRouter_1 = __webpack_require__(/*! ./loginRouter */ \"./src/server/routes/auth/loginRouter.ts\");\nvar registerRouter_1 = __webpack_require__(/*! ./registerRouter */ \"./src/server/routes/auth/registerRouter.ts\");\nvar router = express.Router();\nrouter.get(\"/test\", function (req, res, next) {\n    try {\n        res.status(200).json({ msg: \"Auth Test\" });\n    }\n    catch (error) {\n        next(error);\n    }\n});\nrouter.use(\"/login\", loginRouter_1.default);\nrouter.use(\"/register\", registerRouter_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/auth/index.ts?");

/***/ }),

/***/ "./src/server/routes/auth/loginRouter.ts":
/*!***********************************************!*\
  !*** ./src/server/routes/auth/loginRouter.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar tokens_1 = __webpack_require__(/*! ../../utils/security/tokens */ \"./src/server/utils/security/tokens.ts\");\nvar router = express.Router();\nrouter.post(\"/\", passport.authenticate(\"local\"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var token, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                delete req.user.password;\n                return [4 /*yield*/, tokens_1.CreateToken({ userid: req.user.UserID })];\n            case 1:\n                token = _a.sent();\n                res.json({\n                    token: token,\n                    user: req.user,\n                });\n                return [3 /*break*/, 3];\n            case 2:\n                error_1 = _a.sent();\n                console.log(\"Incorrect Log In!\");\n                res.status(500).json(false);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/auth/loginRouter.ts?");

/***/ }),

/***/ "./src/server/routes/auth/registerRouter.ts":
/*!**************************************************!*\
  !*** ./src/server/routes/auth/registerRouter.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar users_1 = __webpack_require__(/*! ../../db/queries/users */ \"./src/server/db/queries/users.ts\");\nvar tokens_1 = __webpack_require__(/*! ../../utils/security/tokens */ \"./src/server/utils/security/tokens.ts\");\nvar passwords_1 = __webpack_require__(/*! ../../utils/security/passwords */ \"./src/server/utils/security/passwords.ts\");\nvar router = express.Router();\nrouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var password, result, token, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                password = req.body.password;\n                req.body.password = passwords_1.hashPassword(password);\n                return [4 /*yield*/, users_1.default.insertUser(req.body)];\n            case 1:\n                result = _a.sent();\n                return [4 /*yield*/, tokens_1.CreateToken({ userid: result.insertId })];\n            case 2:\n                token = _a.sent();\n                res.json({\n                    token: token,\n                    role: \"admin\",\n                    user: result.insertId,\n                });\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                console.log(error_1);\n                res.status(500).json(false);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/auth/registerRouter.ts?");

/***/ }),

/***/ "./src/server/routes/index.ts":
/*!************************************!*\
  !*** ./src/server/routes/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar api_1 = __webpack_require__(/*! ./api */ \"./src/server/routes/api/index.ts\");\nvar auth_1 = __webpack_require__(/*! ./auth */ \"./src/server/routes/auth/index.ts\");\nvar router = express.Router();\nrouter.use(function (req, res, next) {\n    passport.authenticate(\"bearer\", { session: false }, function (err, user, info) {\n        if (user)\n            req.user = user;\n        return next();\n    })(req, res, next);\n});\nrouter.use(\"/api\", api_1.default);\nrouter.use(\"/auth\", auth_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://starter_template/./src/server/routes/index.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes/index.ts\");\nvar config_1 = __webpack_require__(/*! ./config */ \"./src/server/config/index.ts\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\n__webpack_require__(/*! ./middleware/bearerstrategy */ \"./src/server/middleware/bearerstrategy.ts\");\n__webpack_require__(/*! ./middleware/localstrategy */ \"./src/server/middleware/localstrategy.ts\");\nvar app = express();\napp.use(express.static(\"public\"));\napp.use(passport.initialize());\napp.use(express.json());\napp.use(morgan(\"dev\"));\napp.use(routes_1.default);\napp.use(\"*\", function (req, res, next) {\n    try {\n        res.sendFile(path.join(__dirname, \"../public/index.html\"));\n    }\n    catch (error) {\n        next(error);\n    }\n});\napp.use(function (err, req, res, next) {\n    console.log(err);\n    res.status(500).json({ name: err.name, msg: err.message });\n});\napp.listen(config_1.default.port, function () {\n    return console.log(\"Server listening on port \" + config_1.default.port);\n});\n\n\n//# sourceURL=webpack://starter_template/./src/server/server.ts?");

/***/ }),

/***/ "./src/server/utils/security/passwords.ts":
/*!************************************************!*\
  !*** ./src/server/utils/security/passwords.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.comparePassword = exports.hashPassword = void 0;\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nvar hashPassword = function (password) {\n    var salt = bcrypt.genSaltSync(10);\n    var hash = bcrypt.hashSync(password, salt);\n    return hash;\n};\nexports.hashPassword = hashPassword;\nvar comparePassword = function (password, hash) {\n    return bcrypt.compareSync(password, hash);\n};\nexports.comparePassword = comparePassword;\n\n\n//# sourceURL=webpack://starter_template/./src/server/utils/security/passwords.ts?");

/***/ }),

/***/ "./src/server/utils/security/tokens.ts":
/*!*********************************************!*\
  !*** ./src/server/utils/security/tokens.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ValidToken = exports.CreateToken = void 0;\nvar crypto = __webpack_require__(/*! crypto */ \"crypto\");\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nvar tokens_1 = __webpack_require__(/*! ../../db/queries/tokens */ \"./src/server/db/queries/tokens.ts\");\nvar config_1 = __webpack_require__(/*! ../../config */ \"./src/server/config/index.ts\");\nvar CreateToken = function (payload) { return __awaiter(void 0, void 0, void 0, function () {\n    var data, token;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, tokens_1.default.addToken(payload.userid)];\n            case 1:\n                data = _a.sent();\n                payload.accesstokenid = data.insertId;\n                payload.unique = crypto.randomBytes(32).toString(\"hex\");\n                return [4 /*yield*/, jwt.sign(payload, config_1.default.secret_key)];\n            case 2:\n                token = _a.sent();\n                return [4 /*yield*/, tokens_1.default.updateToken(payload.accesstokenid, token)];\n            case 3:\n                data = _a.sent();\n                return [2 /*return*/, token];\n        }\n    });\n}); };\nexports.CreateToken = CreateToken;\nvar ValidToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {\n    var payload, accesstokenid;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                payload = jwt.decode(token);\n                return [4 /*yield*/, tokens_1.default.findToken(payload.accesstokenid, token)];\n            case 1:\n                accesstokenid = _a.sent();\n                if (!accesstokenid[0]) {\n                    throw new Error(\"Invalid Token\");\n                }\n                else {\n                    return [2 /*return*/, payload];\n                }\n                return [2 /*return*/];\n        }\n    });\n}); };\nexports.ValidToken = ValidToken;\n\n\n//# sourceURL=webpack://starter_template/./src/server/utils/security/tokens.ts?");

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

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");;

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");;

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.ts");
/******/ 	
/******/ })()
;