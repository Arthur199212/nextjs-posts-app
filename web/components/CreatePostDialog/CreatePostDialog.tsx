import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { Form, Formik } from 'formik'
import { MyTextField } from '../'
import { CREATE_POST } from './queries'
import { POSTS_QUERY } from '../Posts/queries'
import { postDocument } from '../../types'

const initialValues = {
  title: '',
  body: ''
}

const CreatePostDialog = () => {
  const [open, setOpen] = useState(false)

  const [createPost] = useMutation(CREATE_POST)

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setSubmitting(true)

      const { title, body } = values

      createPost({
        variables: {title, body},
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
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <div>
      <Fab
        style={{ position: 'fixed', bottom: 20, right: 20 }}
        color='primary'
        aria-label='add'
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors = {} }) => (
            <Form>
              <DialogTitle id='form-dialog-title'>Create post</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Fill out the form to create your new post.
              </DialogContentText>
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
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color='primary'>
                  Cancel
              </Button>
                <Button
                  type='submit'
                  color='primary'
                  disabled={isSubmitting}
                  onClick={handleClose}
                >
                  Create
              </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}

export default CreatePostDialog
