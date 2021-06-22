import * as yup from 'yup';
import videoSchema from './video.schema.js';
import exerciseSchema from './exercise.schema';
import quizSchema from './quiz.schema';

export default yup.object().shape({
  id: yup.number(),
  content: yup.string(),
  videos: yup.array().of(videoSchema),
  exercise: yup.object().shape(exerciseSchema),
  quiz: yup.object().shape(quizSchema)
});