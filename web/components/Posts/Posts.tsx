import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import { PostPreview } from '../'
import { POSTS_QUERY } from './queries'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    headerBox: {
      margin: '20px 0',
      borderBottom: '1px solid #e2e2e2',
    },
    header: {
      display: 'inline-block',
      marginBottom: '-1px',
      padding: '10px',
      borderBottom: '1px solid rgba(0,0,0,.44)',
      fontWeight: 500
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
    <Container maxWidth='md'>
      {data && (
        <div className={classes.headerBox}>
          <Typography className={classes.header} variant='h5' component='span'>
            All posts
          </Typography>
        </div>
      )}

      <Grid container spacing={3}>
        {data && data.posts.map((post: any) => (
          <Grid className={classes.post} item xs={4} key={post.id} >
            <PostPreview post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Posts
