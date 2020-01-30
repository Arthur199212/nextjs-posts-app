import React, { FC } from 'react'
import { Header, FlashNotification } from '../'

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <FlashNotification />
    {children}
  </>
)

export default Layout
