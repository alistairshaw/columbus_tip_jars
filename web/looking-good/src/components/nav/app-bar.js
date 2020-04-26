import PropTypes from 'prop-types'
import React from 'react'
import {
  Grid,
  IconButton,
  InputBase,
  AppBar as MaterialAppBar,
  Toolbar,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@material-ui/icons/'
import { fade, makeStyles } from '@material-ui/core/styles'

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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                placeholder={'Search…'}
              />
            </div>
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
