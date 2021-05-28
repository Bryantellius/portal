import { Router } from "express";
import adminRouter from "./api/admin.router";
import authRouter from "./api/auth.router";
import lectureRouter from "./api/lecture.router";
import quizRouter from "./api/quiz.router";
import userRouter from "./api/user.router";
import authMiddleware from "../middleware/auth";
import courseRouter from "./api/course.router";
import moduleRouter from "./api/module.router";

const router = Router();

router.use(authMiddleware);

router.use("/admin", adminRouter);
router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/lecture", lectureRouter);
router.use("/api/curriculum/:curriculumId/lecture", lectureRouter);
router.use("/api/curriculum/:curriculumId/module", moduleRouter);
router.use("/api/quiz", quizRouter);
router.use("/api/lecture/:lectureId/quiz", quizRouter);
router.use("/api/course", courseRouter);
router.use("/api/module", moduleRouter);

export default router;
