import express from 'express';
import exerciseController from '../../controllers/exercise.controller';

const exerciseRouter = express.Router({ mergeParams: true });

exerciseRouter.post('/', exerciseController.submitExercise);
exerciseRouter.put('/:id', exerciseController.updateExerciseSubmission);

export default exerciseRouter;