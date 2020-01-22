import React, { FC } from 'react'
import { Header } from '../'
import { CssBaseline } from '@material-ui/core'

const Layout: FC = ({ children }) => (
  <>
    <CssBaseline/>
    <Header/>
    {children}
  </>
)

export default Layout
