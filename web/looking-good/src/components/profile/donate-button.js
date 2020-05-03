import Button from '@material-ui/core/Button'
import React from 'react'
import { PropTypes } from 'prop-types'

export default function DonateButton(props) {
  if (!props.donateUrl) {
    return null
  }
  return (
    <Button
      onClick={() => {
        window.location.href = props.donateUrl
      }} variant={'contained'}
    >Click to Tip!
    </Button>)
}

DonateButton.propTypes = {
  donateUrl: PropTypes.string.isRequired,
}
