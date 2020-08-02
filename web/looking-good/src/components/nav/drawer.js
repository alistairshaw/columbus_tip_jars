import PropTypes from 'prop-types'
import React from 'react'
import useAuth from 'src/hooks/use-auth'
import {
  Brush as BrushIcon,
  Face as FaceIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  Input as InputIcon,
  LocalDrink as LocalDrinkIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as ProfileIcon,
} from '@material-ui/icons/'
import {
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer as MaterialDrawer,
} from '@material-ui/core'
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

        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/category/stylists')
          }}
          selected={router.pathname === '/category/stylists'}
        >
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary={'Stylists'} />
        </ListItem>

        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/category/artists')
          }}
          selected={router.pathname === '/category/artists'}
        >
          <ListItemIcon>
            <BrushIcon />
          </ListItemIcon>
          <ListItemText primary={'Artists'} />
        </ListItem>

        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/category/musicians')
          }}
          selected={router.pathname === '/category/musicians'}
        >
          <ListItemIcon>
            <LocalDrinkIcon />
          </ListItemIcon>
          <ListItemText primary={'Musicians'} />
        </ListItem>

        <ListItem
          button
          onClick={(e) => {
            e.preventDefault()
            router.push('/category/bartenders')
          }}
          selected={router.pathname === '/category/bartenders'}
        >
          <ListItemIcon>
            <LocalDrinkIcon />
          </ListItemIcon>
          <ListItemText primary={'Bartenders'} />
        </ListItem>

        {isLoggedIn && (
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
