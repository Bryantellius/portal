"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_router_1 = __importDefault(require("./api/admin.router"));
const auth_router_1 = __importDefault(require("./api/auth.router"));
const lecture_router_1 = __importDefault(require("./api/lecture.router"));
const quiz_router_1 = __importDefault(require("./api/quiz.router"));
const user_router_1 = __importDefault(require("./api/user.router"));
const auth_1 = __importDefault(require("../middleware/auth"));
const course_router_1 = __importDefault(require("./api/course.router"));
const module_router_1 = __importDefault(require("./api/module.router"));
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
//# sourceMappingURL=index.js.map