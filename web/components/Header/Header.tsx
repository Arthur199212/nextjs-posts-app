import React from 'react'
import Link from 'next/link'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Container, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    appBar: {
      backgroundColor: '#ffffff',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      color: '#3F51B5',
      cursor: 'pointer'
    },
    buttonsContainer: {
      display: 'flex',
    }
  }),
)

const Header = () => {
  const classes = useStyles()

  return (
    <Container maxWidth='lg'>
      <Toolbar className={classes.root}>
        <Link href='/'>
          <Typography className={classes.title} variant='h6'>
            Posts App
          </Typography>
        </Link>
        <div className={classes.buttonsContainer}>
          <Link href='/register'>
            <Button className={classes.menuButton} color='primary'>Register</Button>
          </Link>
          <Link href='/login'>
            <Button className={classes.menuButton} color='primary'>Login</Button>
          </Link>
        </div>
      </Toolbar>
    </Container>
  )
}

export default Header
