import React, { FC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header, CreatePostDialog } from '../'

const Layout: FC = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    {children}
    <CreatePostDialog />
  </>
)

export default Layout
