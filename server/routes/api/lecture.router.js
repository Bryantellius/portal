import { Router } from 'express';
import lectureController from '../../controllers/lecture.controller';

const lectureRouter = Router({ mergeParams: true });

lectureRouter.get('/:id', lectureController.findById);
lectureRouter.get('/', lectureController.findAll);
lectureRouter.post('/', lectureController.upsertLecture);
lectureRouter.put('/:id', lectureController.upsertLecture);

export default lectureRouter;