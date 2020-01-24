import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { POSTS_QUERY, DELETE_POST } from '../../queries'

const PostPreviewMenu = ({ postId }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [deletePost] = useMutation(DELETE_POST)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const handleDelete = () => {
    deletePost({
      variables: { id: postId },
      update: (store, { data }) => {
        if (!data) return null

        const { posts }: any = store.readQuery({
          query: POSTS_QUERY
        })

        store.writeQuery({
          query: POSTS_QUERY,
          data: {
            posts: posts.filter((post: any) => post.id !== postId)
          }
        })
      }
    })
  }

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
        <MenuItem onClick={() => {
          handleClose()
          handleDelete()
        }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}

export default PostPreviewMenu
