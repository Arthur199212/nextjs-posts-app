import React, { FC } from 'react'
import moment from 'moment'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography
} from '@material-ui/core'
import { postDocument } from '../../types'
import Link from 'next/link'
import { PostPreviewMenu } from '../'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 345
    },
    cardContent: {
      flexGrow: 1,
      cursor: 'pointer'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      cursor: 'pointer'
    },
    header: {
      marginBottom: 10
    },
    avatar: {
      backgroundImage: 'url("https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2019/04/austinroyomondi.jpeg?resize=150%2C150&ssl=1")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
  })
)

const initialData = {
  id: '',
  title: '',
  body: '',
  user: { id: '', name: '' },
  createdAt: ''
}

interface postPreviewProps {
  post: postDocument
}

const PostPreview: FC<postPreviewProps> = ({ post = initialData }) => {
  const classes = useStyles()

  const { id, title, body, user: { name }, createdAt } = post

  return (
    <Card className={classes.card}>
      <Link href='/post/[id]' as={`/post/${id}`}>
        <CardMedia
          className={classes.media}
          image='https://blog.logrocket.com/wp-content/uploads/2019/12/state-of-javascript-most-in-demand-frontend-frameworks-in-2020.png'
          title={title}
        />
      </Link>

      <Link href='/post/[id]' as={`/post/${id}`}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.header} variant='h6' color='initial' component='h3'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {body}
          </Typography>
        </CardContent>
      </Link>

      <CardHeader
        avatar={
          <Avatar aria-label='post' className={classes.avatar}> </Avatar>
        }
        action={
          <PostPreviewMenu postId={id} />
        }
        title={name}
        subheader={moment(+createdAt).format('MMMM Do, YYYY')}
      />
    </Card>
  )
}

export default PostPreview
