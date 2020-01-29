import * as Yup from 'yup'

const title = Yup.string()
  .min(3, 'Minimum length is 3 characters')
  .max(50, 'Maximum length is 50 characters')
  .trim()
  .required('The field is required')

const body = Yup.string()
  .min(8, 'Minimum length is 8 characters')
  .max(5000, 'Maximum length is 5 000 characters')
  .required('The field is required')
  
const imageUrlRequired = Yup.string()
  .min(8, 'Minimum length is 8 characters')
  .max(256, 'Maximum length is 256 characters')
  .url('URL is not valid')
  .trim()
  .required('The field is required')

const imageUrl = Yup.string()
  .min(8, 'Minimum length is 8 characters')
  .max(256, 'Maximum length is 256 characters')
  .url('URL is not valid')
  .trim()

export const createPostSchema = Yup.object().shape({
  title,
  body,
  imageUrl
})

export const editPostSchema = Yup.object().shape({
  title,
  body,
  imageUrlRequired
})
