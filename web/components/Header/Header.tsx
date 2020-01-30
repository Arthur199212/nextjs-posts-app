import React, { Fragment } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import json2mq from 'json2mq'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button, Container, Toolbar, Typography, useMediaQuery } from '@material-ui/core'
import { MobileHeader } from '../'
import { logOut } from '../../utils'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { ME_QUERY } from '../../queries'
import { showNotification } from '../../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      boxShadow: '0 2px 2px -2px rgba(0,0,0,.15)',
      marginBottom: 25
    },
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
      display: 'flex'
    }
  })
)

const Header = () => {
  const classes = useStyles()

  const client = useApolloClient()

  const dispatch = useDispatch()

  const { data } = useQuery(ME_QUERY, { ssr: false })

  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    })
  )

  const handleLogout = async () => {
    await logOut()
      .then(() => {
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

  if (!matches) return <MobileHeader />

  return (
    <div className={classes.headerContainer}>
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
    </div>
  )
}

export default Header
