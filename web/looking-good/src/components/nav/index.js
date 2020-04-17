import AppBar from 'src/components/nav/app-bar'
import Drawer from './drawer'
import React, { useState } from 'react'

export default function Nav() {
  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen)
  }

  return (
    <>
      <AppBar onDrawerOpen={handleDrawerToggle} />
      <Drawer
        isOpen={isDrawerOpen}
        onDrawerClose={handleDrawerToggle}
      />
    </>
  )
}

