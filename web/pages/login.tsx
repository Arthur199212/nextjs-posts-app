import Router from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import { Formik, Form } from 'formik'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { withApollo } from '../lib/apollo'
import { loginSchema } from '../validation'
import { Layout, MyTextField } from '../components'
import { logIn } from '../utils'
import { ME_QUERY } from '../queries'
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

const Login = () => {
  const classes = useStyles()

  const client = useApolloClient()

  const handleSubmit = async (values: loginRequestDocument, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      const res = await logIn(values)

      const { user: { id, name } } = res

      client.writeQuery({
        query: ME_QUERY,
        data: {
          me: {
            id, name, __typename: 'QUERY'
          },
        }
      })

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
            Login
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >{({ isSubmitting, errors }) => (
            <Form className={classes.form}>
              {formFields.map(({ name, type, label }: any) => (
                <MyTextField
                  key={`login-input-field-${name}`}
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

export default withApollo(Login)
