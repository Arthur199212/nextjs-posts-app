import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Container, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
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
    title: {
      color: '#3F51B5',
      cursor: 'pointer'
    }
  })
)

class CustomMenuItem extends React.Component<any> {
  render() {
    const { href, handleClose, lable, ...args }: any = this.props

    return (
      <Link href={href}>
        <MenuItem {...args} onClick={handleClose}>{lable}</MenuItem>
      </Link>
    )
  }
}

const MobileHeader = () => {
  const classes = useStyles()

  const client = useApolloClient()

  const dispatch = useDispatch()

  const { data } = useQuery(ME_QUERY, { ssr: false })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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

  return (
    <div className={classes.headerContainer}>
      <Container maxWidth='lg'>
        <Toolbar className={classes.root}>
          <Link href='/'>
            <Typography className={classes.title} variant='h6'>
              Posts App
          </Typography>
          </Link>

          <IconButton
            aria-label='more'
            aria-controls='long-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>

          {(!data?.me) && (
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <CustomMenuItem href='/register' handleClose={handleClose} lable='Register' />
              <CustomMenuItem href='/login' handleClose={handleClose} lable='Login' />
            </Menu>
          )}

          {data?.me && (
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <CustomMenuItem href='/create-post' handleClose={handleClose} lable='Create post' />
              <MenuItem onClick={() => { handleClose(); handleLogout() }}>Logout</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </Container>
    </div>
  )
}

export default MobileHeader
