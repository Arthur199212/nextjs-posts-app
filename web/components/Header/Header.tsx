import React, { Fragment } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Container, Toolbar, Typography } from '@material-ui/core'
import { logOut } from '../../utils'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { ME_QUERY } from '../../queries'
import { showNotification } from '../../redux/actions'

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

  const client = useApolloClient()
  
  const dispatch = useDispatch()

  const { data } = useQuery(ME_QUERY, { ssr: false })

  const handleLogout = async () => {
    const res = await logOut()
      .then(res => {
        dispatch(showNotification({
          status: 'success',
          message: 'Successfully logged out.'
        }))
      })
      .catch(err => {
        dispatch(showNotification({
          status: 'error',
          message: err.message
        }))
      })

    client.writeQuery({
      query: ME_QUERY,
      data: {
        me: null,
      }
    })
  }

  return (
    <Container maxWidth='lg'>
      <Toolbar className={classes.root}>
        <Link href='/'>
          <Typography className={classes.title} variant='h6'>
            Posts App
          </Typography>
        </Link>
        <div className={classes.buttonsContainer}>
          {(!data?.me) && (
            <Fragment>
              <Link href='/register'>
                <Button className={classes.menuButton} color='primary'>Register</Button>
              </Link>

              <Link href='/login'>
                <Button className={classes.menuButton} color='primary'>Login</Button>
              </Link>
            </Fragment>
          )}

          {data?.me && (
            <Fragment>
              <Link href='/create-post'>
                <Button className={classes.menuButton} color='primary'>Create post</Button>
              </Link>
              <Button
                className={classes.menuButton}
                color='primary'
                onClick={handleLogout}
              >
                Logout
            </Button>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </Container>
  )
}

export default Header
