import React from 'react'
import { BottomNavigation, BottomNavigationAction, Icon } from '@material-ui/core'
import { GitHub } from '@material-ui/icons'

function CSCLogoIcon() {
  return (
    <Icon>
      <a
        href={'https://cantstopcolumbus.com/'} rel={'noopener noreferrer'}
        target={'_blank'}
      ><img src={'/logos/cscbus_logo_square.png'} style={{ width: 24, height: 24 }} />
      </a>
    </Icon>
  )
}

export default function HomeFooter() {
  return (
    <BottomNavigation
      style={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-evenly',
        position: 'fixed',
        bottom: 1,
        left: 0,
        boxSizing: 'border-box',
      }}
    >
      <a
        href={'https://github.com/alistairshaw/columbus_tip_jars'} rel={'noopener noreferrer'}
        target={'_blank'}
      ><BottomNavigationAction icon={(<GitHub />)} label={'GitHub'} />
      </a>
      <BottomNavigationAction icon={(<CSCLogoIcon />)} label={'Can\'t Stop Columbus'} />
    </BottomNavigation>
  )
}
