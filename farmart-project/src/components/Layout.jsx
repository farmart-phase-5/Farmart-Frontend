import React from 'react'
import NavBar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <NavBar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout