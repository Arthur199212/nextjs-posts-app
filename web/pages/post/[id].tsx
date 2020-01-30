import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import Router, { useRouter } from 'next/router'
import { compose } from 'redux'
import { useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Container, Typography, Avatar } from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import { withApollo, withRedux } from '../../lib'
import { Layout } from '../../components'
import { showNotification } from '../../redux/actions'
import { POST_QUERY, DELETE_POST, POSTS_QUERY, ME_QUERY } from '../../queries'
import styles from './styles'

const Post = () => {
  const router = useRouter()

  const { id } = router.query

  const dispatch = useDispatch()

  const { data: meData } = useQuery(ME_QUERY, { ssr: false })

  const { data, loading } = useQuery(POST_QUERY, { variables: { id }, ssr: false })

  const [deletePost] = useMutation(DELETE_POST)

  const handleDelete = () => {
    // TODO confirm deleting

    deletePost({ variables: { id } })

    dispatch(showNotification({
      status: 'info',
      message: 'Post deleted.'
    }))

    Router.push('/')
  }

  if (loading && !data) return 'Loading ...'

  const { title, body, imageUrl, createdAt, user: { name, avatarUrl } } = data.post

  return (
    <Layout>
      <Container maxWidth='sm' style={styles.root}>
        <div style={styles.cardBox}>
          <Avatar src={avatarUrl} style={styles.avatar} />
          <div style={styles.autorBox}>
            <Typography variant='body1' color='textPrimary' gutterBottom>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary' gutterBottom>
              Full-stack developer
            </Typography>
          </div>
          {(meData?.me) && (
            <div style={styles.actionBox}>
              <Link href='/edit-post/[id]' as={`/edit-post/${id}`}>
                <EditIcon style={styles.button} color='primary' />
              </Link>
              <DeleteIcon style={styles.button} color='primary' onClick={handleDelete} />
            </div>
          )}
        </div>

        <Typography variant='h3' gutterBottom style={styles.title}>
          {title}
        </Typography>

        <Typography variant='body1' color='textSecondary' gutterBottom style={styles.createdAt}>
          {moment(+createdAt).format('MMMM Do, YYYY')}
        </Typography>

        <img
          src={imageUrl}
          style={styles.poster}
        />

        <Typography variant='body1' color='textPrimary' gutterBottom style={styles.text}>
          {body}
        </Typography>
      </Container>
    </Layout>
  )
}

export default compose(withApollo, withRedux)(Post)
