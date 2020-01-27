import React, { FC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header, FlashNotification } from '../'

const Layout: FC = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    <FlashNotification />
    {children}
  </>
)

export default Layout
