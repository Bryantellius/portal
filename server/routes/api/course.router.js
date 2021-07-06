import express from 'express';
import courseController from '../../controllers/course.controller';

const courseRouter = express.Router({ mergeParams: true });

courseRouter.get('/details', courseController.getUserCourseDetails);
courseRouter.get('/', courseController.findAll);
courseRouter.get('/:id/schedule', courseController.getCourseSchedule);
courseRouter.put('/:courseId/schedule/:id', courseController.upsertCourseIteration);
courseRouter.post('/:courseId/schedule', courseController.upsertCourseIteration);
courseRouter.get('/:id', courseController.findById);
courseRouter.put('/:id', courseController.upsertCourse);
courseRouter.post('/', courseController.upsertCourse);

export default courseRouter;