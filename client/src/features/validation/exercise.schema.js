import * as yup from 'yup';
import videoSchema from './video.schema';

export default yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  content: yup.string().required(),
  videos: yup.array().of(videoSchema)
});