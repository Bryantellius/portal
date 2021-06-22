import * as yup from 'yup';

export const questionOptionSchema = yup.object().shape({
  id: yup.number(),
  text: yup.string().required()
});

export const questionSchema = yup.object().shape({
  id: yup.number(),
  text: yup.string(),
  type: yup.number(),
  correctAnswer: yup.string(),
  options: yup.array().of(questionOptionSchema)
});

export default yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  questions: yup.array().of(questionSchema)
});