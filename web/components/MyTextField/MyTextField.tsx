import { useField } from 'formik'
import { TextField } from '@material-ui/core'
import { FC } from 'react'

const MyTextField: FC<any> = ({ name, ...props }) => {
  const [field, meta] = useField(name)

  const errorText = meta.error && meta.touched ? meta.error : ''

  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  )
}

export default MyTextField
