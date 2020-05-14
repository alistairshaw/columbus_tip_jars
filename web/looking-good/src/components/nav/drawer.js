import PropTypes from 'prop-types'
import React from 'react'
import useAuth from 'src/hooks/use-auth'
import {
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MaterialDrawer,
} from '@material-ui/core'
import {
  Help as HelpIcon,
  Home as HomeIcon,
  Input as InputIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as ProfileIcon,
} from '@material-ui/icons/'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

export default function Drawer({ isOpen, onDrawerClose }) {
  const classes = useStyles()
  const router = useRouter()
  const { isLoggedIn, logout, profile } = useAuth()

  const drawerContents = (
    <>
      <div className={classes.drawerHeader}>
        <img
          button
          className={classes.logo}
          onClick={(e) => {
            e.preventDefault()
            router.push('/')
          }}
          selected={router.pathname === '/'}
          src={'/looking-good-cbus.png'}
        />
      </div>
      <Divider />
      <List>
        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/')
          }}
          selected={router.pathname === '/'}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        {isLoggedIn && (
          <>
            <ListItem
              button
              onClick={(e) => {
                e.preventDefault()
                router.push('/user-profile-edit')
              }}
              selected={router.pathname === '/user-profile-edit'}
            >
              <ListItemIcon>
                <ProfileIcon />
              </ListItemIcon>
              <ListItemText primary={'User Profile'} />
            </ListItem>
          </>
        )}
        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/about')
          }}
          selected={router.pathname === '/about'}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
      </List>
      <Divider />
      {isLoggedIn ? (
        <List>
          <ListItem>
            <ListItemText primary={`Logged in as ${profile?.email}`} />
          </ListItem>
          <ListItem
            button
            onClick={(e) => {
              e.preventDefault()
              logout()
            }}
          >
            <ListItemText primary={'Sign out'} />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem
            button
            onClick={(e) => {
              e.preventDefault()
              router.push('/login')
            }}
            selected={router.pathname === '/login'}
          >
            <ListItemIcon>
              <InputIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign In'} />
          </ListItem>
          <ListItem
            button
            onClick={(e) => {
              e.preventDefault()
              router.push('/register')
            }}
            selected={router.pathname === '/register'}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        </List>
      )}
    </>
  )

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation={'js'}>
        <MaterialDrawer
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
          onClose={onDrawerClose}
          open={isOpen}
          variant={'temporary'}
        >
          {drawerContents}
        </MaterialDrawer>
      </Hidden>
      <Hidden smDown implementation={'js'}>
        <MaterialDrawer
          open
          classes={{ paper: classes.drawerPaper }}
          variant={'permanent'}
        >
          {drawerContents}
        </MaterialDrawer>
      </Hidden>
    </nav>
  )
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onDrawerClose: PropTypes.func.isRequired,
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 240,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    paddingLeft: '1rem',
    alignItems: 'center',
  },
  logo: {
    position: 'relative',
    right: '7%',
    padding: 'auto',
    width: '107%',
  },
}))
