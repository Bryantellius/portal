import express from 'express';
import exerciseController from '../../controllers/exercise.controller';

const exerciseRouter = express.Router({ mergeParams: true });
exerciseRouter.get('/submission', exerciseController.getExerciseSubmissions);
exerciseRouter.post('/', exerciseController.submitExercise);
exerciseRouter.put('/:id', exerciseController.updateExerciseSubmission);
exerciseRouter.post('/submission/:submissionId/approve', exerciseController.approveSubmission);

export default exerciseRouter;