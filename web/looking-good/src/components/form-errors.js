import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const FormErrors = ({ errors }) => {

  return (
    <>
      {errors.map( (error, index) =>
        <Typography color={'error'} key={index}>{error}</Typography>,
      )}
    </>
  )
}

FormErrors.propTypes = {
  errors: PropTypes.array,
}

FormErrors.defaultProps = {
  errors: [],
}

export default FormErrors
