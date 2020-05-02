import React, { useState } from 'react'
import SearchResults from './search-results'
import useAuth from 'src/hooks/use-auth'
import { InputBase } from '@material-ui/core'
import {
  Search as SearchIcon,
} from '@material-ui/icons/'
import { fade, makeStyles } from '@material-ui/core/styles'

export default function SearchBar() {
  const { searchUserProfiles } = useAuth()
  const [searchResults, setSearchResults] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const classes = useStyles()

  return (
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
        onChange={(event) => {
          setSearchFilter(event.target.value)
          if (event.target.value.length >= 2) {
            searchUserProfiles(event.target.value).then((result) => {
              setSearchResults(result.resources)
            })
          } else {
            setSearchResults([])
          }
        }}
        placeholder={'Search…'}
        style={{
          width: '100%',
        }}
        value={searchFilter}
      />
      <SearchResults searchResults={searchResults} />
    </div>
  )
}

SearchBar.propTypes = {}

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    paddingLeft: 40,
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
    left: 0,
  },
}))
