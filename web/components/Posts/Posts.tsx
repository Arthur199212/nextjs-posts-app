import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Box, Container, Typography, Grid } from '@material-ui/core'
import { PostPreview } from '../'
import { POSTS_QUERY } from './queries'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    post: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
)

const Posts = () => {
  const classes = useStyles()
  const { data } = useQuery(POSTS_QUERY)

  return (
    <>
      <Container maxWidth='md'>
        <Typography component='div'>
          <Box fontWeight='fontWeightBold' fontSize='h5.fontSize' m={1}>
            All posts
              </Box>
        </Typography>

        <Grid container spacing={3}>
          {data && data.posts.map((post: any) => (
            <Grid className={classes.post} item xs={4} key={post.id} >
              <PostPreview post={post} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Posts
