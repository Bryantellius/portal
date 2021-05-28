import express, { Request, Response, NextFunction, Router } from "express";
import router from "./user.router";
import quizController from "../../controllers/quiz.controller";

const quizRouter = Router({ mergeParams: true });

quizRouter.get("/", async (req: Request, res: Response, next: NextFunction) => req.params.lectureId
    ? await quizController.findByLectureId(req, res, next)
    : await quizController.findAll(req, res, next));

quizRouter.get("/:id", quizController.findById);

quizRouter.post("/:id", quizController.submitResponses);

export default quizRouter;