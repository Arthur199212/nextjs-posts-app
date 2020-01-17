import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Container, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#ffffff',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: '#764ABC'
    },
  }),
)

const Header = () => {
  const classes = useStyles()

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <Toolbar>
          <Typography className={classes.title} variant='h6'>
            Posts App
          </Typography>
          <Button className={classes.menuButton} color='primary'>Register</Button>
          <Button className={classes.menuButton} color='primary'>Login</Button>
        </Toolbar>
      </div>
    </Container>
  )
}

export default Header
