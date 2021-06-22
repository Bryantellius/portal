import * as yup from 'yup';
import lectureSchema from './lecture.schema';

export default yup.object().shape({
  id: yup.number(),
  title: yup.string(),
  lectures: yup.array().of(lectureSchema)
});