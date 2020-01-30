import React, { FC } from 'react'
import moment from 'moment'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { postDocument } from '../../types'
import Link from 'next/link'
import { MAX_TITLE_LENGTH, MAX_POST_PREVIEW_LENGTH } from '../../config'

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
    }
  })
)

const initialData = {
  id: '',
  title: '',
  body: '',
  imageUrl: '',
  user: { id: '', name: '', avatarUrl: '' },
  createdAt: ''
}

interface postPreviewProps {
  post: postDocument
}

const PostPreview: FC<postPreviewProps> = ({ post = initialData }) => {
  const classes = useStyles()

  const { id, title, body, imageUrl, user: { name, avatarUrl }, createdAt } = post

  return (
    <Card className={classes.card}>
      <Link href='/post/[id]' as={`/post/${id}`}>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={title}
        />
      </Link>

      <Link href='/post/[id]' as={`/post/${id}`}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.header} variant='h6' color='initial' component='h3'>
            {title.length <= MAX_TITLE_LENGTH ? title : `${title.slice(0, MAX_TITLE_LENGTH)}...`}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {body.length <= MAX_POST_PREVIEW_LENGTH ?
              body
              : `${body.slice(0, MAX_POST_PREVIEW_LENGTH)}...`}
          </Typography>
        </CardContent>
      </Link>

      <CardHeader
        avatar={
          <Avatar aria-label='post' src={avatarUrl}> </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={moment(+createdAt).format('MMMM Do, YYYY')}
      />
    </Card>
  )
}

export default PostPreview
