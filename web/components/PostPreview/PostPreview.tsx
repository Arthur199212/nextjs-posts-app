import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography
} from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    header: {
      marginBottom: 10,
    },
    avatar: {
      backgroundImage: 'url("https://i2.wp.com/blog.logrocket.com/wp-content/uploads/2019/04/austinroyomondi.jpeg?resize=150%2C150&ssl=1")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }),
)

const PostPreview = () => {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image='https://blog.logrocket.com/wp-content/uploads/2019/12/state-of-javascript-most-in-demand-frontend-frameworks-in-2020.png'
        title='Paella dish'
      />

      <CardContent>
        <Typography className={classes.header} variant='h6' color='initial' component='h3'>
          This impressive paella
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>

      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}> </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title='Shrimp Chorizo'
        subheader='September 14, 2016'
      />
    </Card>
  )
}

export default PostPreview
