import * as yup from 'yup';
import courseSchema from './course.schema';

export default yup.object().shape({
  id: yup.number(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  createdAt: yup.date(),
  enrolledCourses: yup.array().of(courseSchema)
});