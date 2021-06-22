import express from 'express';
import exerciseController from '../../controllers/exercise.controller';

const exerciseRouter = express.Router({ mergeParams: true });
exerciseRouter.get('/submission', exerciseController.getExerciseSubmissions);
exerciseRouter.post('/', exerciseController.submitExercise);
exerciseRouter.put('/:id', exerciseController.updateExerciseSubmission);
exerciseRouter.get('/submission/:id', exerciseController.findSubmissionById);
exerciseRouter.post('/submission/:id/approve', exerciseController.approveSubmission);

export default exerciseRouter;