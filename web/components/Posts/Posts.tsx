import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { PostPreview } from '../'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    post: {
      display: 'flex',
      justifyContent: 'center',
      // padding: theme.spacing(2),
    },
  }),
)

const posts = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
]

const Posts = () => {
  const classes = useStyles()

  return (
    <>
      <Container maxWidth='md'>
        <Typography component='div'>
          <Box fontWeight='fontWeightBold' fontSize='h5.fontSize' m={1}>
            All posts
              </Box>
        </Typography>

        {/* <div className={classes.root}> */}
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid className={classes.post} item xs={4} key={post.id} >
              {/* <Paper className={classes.paper}>xs=12</Paper> */}
              <PostPreview />
            </Grid>
          ))}
        </Grid>
        {/* </div> */}
      </Container>
    </>
  )
}

export default Posts
