import { Router } from "express";
import courseController from "../../controllers/course.controller";

const courseRouter = Router({ mergeParams: true });

courseRouter.get('/', courseController.findAll);
courseRouter.get('/:id', courseController.findById);

export default courseRouter;