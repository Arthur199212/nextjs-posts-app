import React from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

const styles = {
  container: {
    width: '100%'
  }
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const FlashNotification = () => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  if (!open) return null

  return (
    <div style={styles.container}>
      <Alert onClose={handleClose} severity='info'>
        This is a success message!
      </Alert>
    </div>
  )
}

export default FlashNotification
