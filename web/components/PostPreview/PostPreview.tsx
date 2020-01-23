import React, { FC } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography
} from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { postDocument } from '../../types'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
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

  const { title, body, user: { id, name }, createdAt } = post

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image='https://blog.logrocket.com/wp-content/uploads/2019/12/state-of-javascript-most-in-demand-frontend-frameworks-in-2020.png'
        title={title}
      />

      <CardContent>
        <Typography className={classes.header} variant='h6' color='initial' component='h3'>
          {title}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {body}
        </Typography>
      </CardContent>

      <CardHeader
        avatar={
          <Avatar aria-label='post' className={classes.avatar}> </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={createdAt}
      />
    </Card>
  )
}

export default PostPreview
