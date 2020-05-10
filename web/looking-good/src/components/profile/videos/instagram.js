import InstagramEmbed from 'react-instagram-embed'
import React from 'react'
import * as PropTypes from 'prop-types'

export default function Instagram({ url }) {
  return (
    <InstagramEmbed url={url} />
  )
}

Instagram.propTypes = {
  url: PropTypes.string,
}
