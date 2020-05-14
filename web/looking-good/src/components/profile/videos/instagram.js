import * as PropTypes from 'prop-types'
import InstagramEmbed from 'react-instagram-embed'
import React from 'react'

export default function Instagram({ url }) {
  return (
    <InstagramEmbed url={url} />
  )
}

Instagram.propTypes = {
  url: PropTypes.string,
}
