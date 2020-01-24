import React, { FC } from 'react'
import { CssBaseline } from '@material-ui/core'
import { Header } from '../'

const Layout: FC = ({ children }) => (
  <>
    <CssBaseline />
    <Header />
    {children}
  </>
)

export default Layout
