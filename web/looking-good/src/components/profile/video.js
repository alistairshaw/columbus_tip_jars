import Facebook from './videos/facebook'
import Instagram from './videos/instagram'
import PropTypes from 'prop-types'
import React from 'react'
import YouTube from './videos/youtube'

const YOUTUBE = 'Youtube'
const FACEBOOK = 'Facebook'
const INSTAGRAM = 'Instagram'

export default function Video({ url }) {
  switch (detectVideoType(url)) {
  case YOUTUBE:
    return <YouTube url={url} />
  case FACEBOOK:
    return <Facebook url={url} />
  case INSTAGRAM:
    return <Instagram url={url} />
  default:
    return <div>No valid video link provided</div>
  }
}

function detectVideoType(url) {
  if (url.toLowerCase().includes('facebook')) {
    return FACEBOOK
  }
  if (url.toLowerCase().includes('youtube')) {
    return YOUTUBE
  }
  if (url.toLowerCase().includes('instagram')) {
    return INSTAGRAM
  }
}

Video.propTypes = {
  url: PropTypes.string,
}
