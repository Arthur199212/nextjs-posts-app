import React, { FC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header, FlashNotification } from '../'

const Layout: FC = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    <FlashNotification />
    {children}

    <style jsx global>
      {`
        body {
          background-color: #fff
        }
      `}
    </style>
  </>
)

export default Layout
