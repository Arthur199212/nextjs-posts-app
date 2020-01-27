import Router from 'next/router'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { withApollo, withRedux } from '../lib'
import { Layout, MyTextField } from '../components'
import { postSchema } from '../validation'
import { POSTS_QUERY, CREATE_POST } from '../queries'
import { postDocument } from '../types'
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
  title: '',
  body: ''
}

const CreatePost = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [createPost] = useMutation(CREATE_POST)
  const client = useApolloClient()

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      const { title, body } = values

      createPost({
        variables: { title, body },
        update: (store, { data }) => {
          if (!data) return null

          const createdPost: postDocument = data.createPost

          const { posts }: any = store.readQuery({
            query: POSTS_QUERY
          })

          store.writeQuery({
            query: POSTS_QUERY,
            data: {
              posts: [...posts, createdPost]
            }
          })
        }
      })

      client.writeQuery({
        query: CREATE_POST,
        data: {
          createPost: null
        }
      })

      dispatch(showNotification({
        status: 'success',
        message: 'Post successfully created.'
      }))
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      resetForm()
      Router.push('/')
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h2'>
            Create post
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={postSchema}
            onSubmit={handleSubmit}
          >{({ isSubmitting, errors }) => (
            <Form className={classes.form}>
              <MyTextField
                name='title'
                type='input'
                label='Post Title'
                margin='dense'
                fullWidth
                autoComplete='off'
              />
              <MyTextField
                name='body'
                type='input'
                label='Post description...'
                margin='dense'
                fullWidth
                multiline
                rows='5'
                rowsMax='10'
              />
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Publish
              </Button>
            </Form>
          )}
          </Formik>
        </Paper>
      </Container>
    </Layout>
  )
}

export default compose(withApollo, withRedux)(CreatePost)
