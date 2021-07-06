import express from 'express';
import lectureController from '../../controllers/lecture.controller';

const lectureRouter = express.Router({ mergeParams: true });

lectureRouter.get('/:id', lectureController.findById);
lectureRouter.get('/', lectureController.findAll);
lectureRouter.post('/', lectureController.upsertLecture);
lectureRouter.put('/:id', lectureController.upsertLecture);
lectureRouter.post('/:id/rate', lectureController.addLectureRating);

export default lectureRouter;