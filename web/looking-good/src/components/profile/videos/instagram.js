import InstagramEmbed from 'react-instagram-embed'
import React from 'react'
import { PropTypes } from '@material-ui/core'

export default function Instagram({ url }) {
  return (
    <InstagramEmbed url={url} />
  )
}

Instagram.propTypes = {
  url: PropTypes.string,
}
