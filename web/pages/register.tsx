import { Layout } from '../components'
import { Formik, Form } from 'formik'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Container, Paper, TextField, Typography, Button } from '@material-ui/core'
import { registerSchema } from '../validation'
import { MyTextField } from '../components'

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
      margin: '25px 0 0'
    }
  }),
)

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const Register = () => {
  const classes = useStyles()

  return (
    <Container maxWidth='md'>
      <Layout>
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h2'>
            Register
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true)

              // TODO add submit logic
              console.log(values)

              setSubmitting(false)
              resetForm()
            }}
          >{({ values, isSubmitting, errors }) => (
            <Form className={classes.form}>
              <MyTextField
                className={classes.input}
                name='name'
                type='input'
                label='Name'
                fullWidth
                errors={errors}
              />
              <MyTextField
                className={classes.input}
                name='email'
                type='input'
                label='Email'
                fullWidth
                errors={errors}
              />
              <MyTextField
                className={classes.input}
                name='password'
                type='password'
                label='Password'
                fullWidth
                errors={errors}
              />
              <MyTextField
                className={classes.input}
                name='passwordConfirmation'
                type='password'
                as={TextField}
                label='Password confirmation'
                fullWidth
                errors={errors}
              />
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Submit
              </Button>
              {/* // TODO delete later */}
              <div style={{marginTop: 20, width: '100%'}}>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </div>
            </Form>
          )}</Formik>
        </Paper>
      </Layout>
    </Container>
  )
}

export default Register
