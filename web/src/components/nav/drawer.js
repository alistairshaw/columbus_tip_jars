import PropTypes from 'prop-types'
import React from 'react'
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
} from '@material-ui/icons/'
import { makeStyles } from '@material-ui/core/styles'

export default function Drawer({ isOpen, onDrawerClose }) {
  const classes = useStyles()

  const drawerContents = (
    <>
      <div className={classes.drawerHeader}>
        <img
          className={classes.logo}
          src={'/looking-good-cbus.png'}
        />
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <InputIcon />
          </ListItemIcon>
          <ListItemText primary={'Sign In'} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary={'Sign Up'} />
        </ListItem>
      </List>
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
    height: 50,
  },
}))
