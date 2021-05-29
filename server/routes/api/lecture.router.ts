import { Router } from "express";
import lectureController from "../../controllers/lecture.controller";

const lectureRouter = Router({ mergeParams: true });

lectureRouter.get("/", lectureController.findAll)
lectureRouter.get("/:id", lectureController.findById);
lectureRouter.get("/:id/content", lectureController.getLectureContent);

export default lectureRouter;