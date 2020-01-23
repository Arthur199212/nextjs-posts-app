import { Layout } from '../components'
import { Formik, Form } from 'formik'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { loginSchema } from '../validation'
import { MyTextField } from '../components'
import { logIn } from '../utils'
import { loginRequestDocument } from '../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 30
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    input: {
      marginTop: 15
    },
    button: {
      marginTop: 25
    }
  })
)

const initialValues = {
  email: '',
  password: ''
}

const formFields: any = [
  {
    name: 'email',
    type: 'input',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  }
]

const Register = () => {
  const classes = useStyles()

  const handleSubmit = async (values: loginRequestDocument, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      await logIn(values)
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h2'>
            Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >{({ values, isSubmitting, errors }) => (
            <Form className={classes.form}>
              {formFields.map(({ name, type, label }: any) => (
                <MyTextField
                  key={`input-field-${name}`}
                  className={classes.input}
                  name={name}
                  type={type}
                  label={label}
                  fullWidth
                  errors={errors}
                />
              ))}
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}</Formik>
        </Paper>
      </Container>
    </Layout>
  )
}

export default Register
