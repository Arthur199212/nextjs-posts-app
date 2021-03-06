import Router, { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { Container, Paper, Typography, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { withApollo, withRedux } from '../../lib'
import { Layout, MyTextField } from '../../components'
import { editPostSchema } from '../../validation'
import { POST_QUERY, UPDATE_POST } from '../../queries'
import { showNotification } from '../../redux/actions'

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

let initialValues = {
  title: '',
  body: '',
  imageUrl: ''
}

const EditPost = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [updatePost] = useMutation(UPDATE_POST)

  const router = useRouter()

  const { id } = router.query

  const { data } = useQuery(POST_QUERY, { variables: { id } })

  if (data) {
    initialValues = {
      title: data.post.title,
      body: data.post.body,
      imageUrl: data.post.imageUrl
    }
  }

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      const { title, body, imageUrl } = values

      updatePost({ variables: { id, title, body, imageUrl } })

      dispatch(showNotification({
        status: 'success',
        message: 'Post successfully updated.'
      }))
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)

      Router.back()
    }
  }

  return (
    <Layout>
      <Container maxWidth='md'>
        <Paper className={classes.paper}>
          <Typography variant='h5' component='h2'>
            Edit post
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={editPostSchema}
            onSubmit={handleSubmit}
          >{({ isSubmitting }) => (
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
              <MyTextField
                name='imageUrl'
                type='input'
                label='Post image link'
                margin='dense'
                fullWidth
                autoComplete='off'
              />
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={isSubmitting}
              >
                Update
              </Button>
            </Form>
          )}
          </Formik>
        </Paper>
      </Container>
    </Layout>
  )
}

export default compose(withApollo, withRedux)(EditPost)
