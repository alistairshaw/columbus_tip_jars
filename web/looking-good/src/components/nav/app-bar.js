import PropTypes from 'prop-types'
import React from 'react'
import SearchBar from './search/search-bar'
import {
  Grid,
  IconButton,
  AppBar as MaterialAppBar,
  Toolbar,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
} from '@material-ui/icons/'
import { makeStyles } from '@material-ui/core/styles'

export default function AppBar({ onDrawerOpen }) {
  const classes = useStyles()

  return (
    <MaterialAppBar
      className={classes.appBar}
      elevation={0}
      position={'fixed'}
    >
      <Toolbar>
        <Grid
          container
          alignItems={'center'}
          direction={'row'}
          justify={'space-between'}
        >
          <Grid
            item
            sm={8}
            xs={6}
          >
            <IconButton
              aria-label={'open drawer'}
              className={classes.menuButton}
              color={'inherit'}
              edge={'start'}
              onClick={onDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid
            item
            sm={4}
            xs={6}
          >
            <SearchBar />
          </Grid>
        </Grid>
      </Toolbar>
    </MaterialAppBar>
  )
}

AppBar.propTypes = {
  onDrawerOpen: PropTypes.func.isRequired,
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))
