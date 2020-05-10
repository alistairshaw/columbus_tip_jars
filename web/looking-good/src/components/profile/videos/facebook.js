import * as PropTypes from 'prop-types'
import React from 'react'

export default function Facebook({ url }) {
  return (
    <iframe
      allowFullScreen={true}
      frameBorder={0}
      height={305}
      scrolling={'no'}
      src={`https://www.facebook.com/plugins/video.php?href=${encodeURI(url)}&show_text=0&width=560`}
      style={{ border: 'none', overflow: 'hidden' }}
      width={560}
    />
  )
}

Facebook.propTypes = {
  url: PropTypes.string,
}
