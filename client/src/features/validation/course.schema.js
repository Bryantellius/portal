import * as yup from 'yup';
import moduleSchema from './module.schema';

export default yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  modules: yup.array().of(moduleSchema)
});