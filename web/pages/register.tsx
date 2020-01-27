import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { withApollo, withRedux } from '../lib'
import { registerSchema } from '../validation'
import { Layout, MyTextField } from '../components'
import { register } from '../utils'
import { ME_QUERY } from '../queries'
import { registerRequestDocument } from '../types'
import { showNotification } from '../redux/actions'

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
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

const formFields: any = [
  {
    name: 'name',
    type: 'input',
    label: 'Name'
  },
  {
    name: 'email',
    type: 'input',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  },
  {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password confirmation'
  }
]

const Register = () => {
  const classes = useStyles()

  const client = useApolloClient()

  const dispatch = useDispatch()

  const handleSubmit = async (values: registerRequestDocument, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      const res = await register(values)

      const { user: { id, name } } = res

      client.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            id, name, __typename: 'QUERY'
          },
        }
      })

      dispatch(showNotification({
        status: 'success',
        message: 'Successfully logged registered.'
      }))

      Router.push('/')
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
            Register
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >{({ isSubmitting, errors }) => (
            <Form className={classes.form}>
              {formFields.map(({ name, type, label }: any) => (
                <MyTextField
                  key={`register-input-field-${name}`}
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
          )}
          </Formik>
        </Paper>
      </Container>
    </Layout>
  )
}

export default compose(withRedux, withApollo)(Register)
