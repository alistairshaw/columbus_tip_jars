import * as PropTypes from 'prop-types'
import React from 'react'
import { Grid } from '@material-ui/core'

function UserViewHeading(props) {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={6}
        md={6}
        xs={12}
      >
        <h1>{props.userName}</h1>
        <h3>{props.businessName}</h3>
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xs={12}
      >
        <h2>{props.specialty}</h2>
      </Grid>
    </Grid>
  )
}

UserViewHeading.propTypes = {
  businessName: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
}

export default UserViewHeading
