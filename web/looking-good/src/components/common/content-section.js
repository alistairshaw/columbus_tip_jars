import PropTypes from 'prop-types'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  box: {
    border: '1px solid #F0F0F0',
    padding: theme.spacing(10),
    borderRadius: theme.borderRadius,
    background: 'white',
    marginBottom: theme.spacing(10),
    '& h1': {
      marginTop: 0,
    },
  },
}))

export default function ContentSection({ children }) {
  const classes = useStyles()
  return <Box className={classes.box}>{children}</Box>
}

ContentSection.propTypes = {
  children: PropTypes.array,
}
