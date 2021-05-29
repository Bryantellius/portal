import { Router } from "express";
import courseController from "../../controllers/course.controller";

const courseRouter = Router({ mergeParams: true });

courseRouter.get('/', courseController.findAll);

export default courseRouter;