import { Router } from "express";
import courseController from "../../controllers/course.controller";

const courseRouter = Router({ mergeParams: true });

courseRouter.get('/', courseController.findAll);
courseRouter.get('/:id', courseController.findById);
courseRouter.get('/details', courseController.getUserCourseDetails);
courseRouter.put('/:id', courseController.upsertCourse);
courseRouter.post('/', courseController.upsertCourse);

export default courseRouter;