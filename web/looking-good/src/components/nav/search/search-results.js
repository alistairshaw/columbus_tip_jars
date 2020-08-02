import * as PropTypes from 'prop-types'
import React from 'react'
import SearchResult from './search-result'
import { makeStyles } from '@material-ui/core/styles'

export default function SearchResults(props) {
  const searchResults = props.searchResults
  const classes = useStyles()

  if (searchResults.length === 0) {
    return null
  }
  return (
    <div className={classes.searchResults}>
      {searchResults.map((userProfile) => <SearchResult key={userProfile.id} userProfile={userProfile} />)}
    </div>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.array,
}

const useStyles = makeStyles((theme) => ({
  searchResults: {
    position: 'absolute',
    bottom: -300,
    left: 0,
    width: '100%',
    height: 300,
    background: 'white',
    color: theme.palette.primary.main,
    overflow: 'auto',
  },
}))
