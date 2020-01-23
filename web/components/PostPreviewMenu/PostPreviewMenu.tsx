import React, { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

const PostPreviewMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <div>
      <IconButton aria-label='settings' onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  )
}

export default PostPreviewMenu
