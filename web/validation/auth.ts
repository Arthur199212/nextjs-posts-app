import * as Yup from 'yup'
import { Buffer } from 'buffer'
import { BCRYPT_MAX_BYTES } from '../config/auth'

const checkBytesLength = (string: string) =>
  Buffer.byteLength(string, 'utf-8') <= BCRYPT_MAX_BYTES

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum length is 3 characters')
    .max(50, 'Maximum length is 128 characters')
    .trim()
    .required('The field is required'),
  email: Yup.string()
    .email('Invalid email')
    .min(8, 'Minimum length is 8 characters')
    .max(254, 'Maximum length is 254 characters')
    .lowercase()
    .trim()
    .required('Required'),
  password: Yup.string()
    .min(8, 'Minimum length is 8 characters')
    .test('max', 'Maximum length is 74 characters', str => checkBytesLength(str))
    .matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u, {
      message: 'Password must contain one uppercase letter, one lowercase letter, and one digit'
    })
    .required('Required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirmation password must match password')
})
