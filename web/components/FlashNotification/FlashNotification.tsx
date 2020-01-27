import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'
import { hideNotification } from '../../redux/actions'

const FlashNotification = () => {
  const notification = useSelector(({ notification }: any) => notification)

  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(hideNotification())
  }

  if (!notification.show) return null

  return (
    <Snackbar open={notification.show} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant='filled'
        severity={notification.status}
        onClose={handleClose}
      >
        {notification.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default FlashNotification
