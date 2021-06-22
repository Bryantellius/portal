import * as yup from 'yup';

export default yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  url: yup.string().required()
});