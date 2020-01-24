import * as Yup from 'yup'

const title = Yup.string()
  .min(3, 'Minimum length is 3 characters')
  .max(50, 'Maximum length is 50 characters')
  .trim()
  .required('The field is required')

const body = Yup.string()
  .min(8, 'Minimum length is 8 characters')
  .max(2000, 'Maximum length is 2000 characters')
  .required('The field is required')

export const postSchema = Yup.object().shape({
  title,
  body
})
