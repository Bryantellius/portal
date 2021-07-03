import express, { Request, Response, NextFunction, Router } from "express";
import router from "./user.router";
import quizController from "../../controllers/quiz.controller";

const quizRouter = Router({ mergeParams: true });

quizRouter.get("/", quizController.findAll);

quizRouter.get('/submission', quizController.getUserSubmissions);

quizRouter.get("/:id", quizController.findById);

quizRouter.post("/:id/submission", quizController.submitResponses);

quizRouter.post("/", quizController.saveQuiz);

quizRouter.put("/:id", quizController.saveQuiz);

quizRouter.delete('/:id', quizController.deleteQuiz);

export default quizRouter;