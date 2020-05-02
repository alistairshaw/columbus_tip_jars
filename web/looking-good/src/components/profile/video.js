import PropTypes from 'prop-types'
import React from 'react'
import YouTube from 'react-youtube'

function getVideoId(videoUrl) {
  if (!videoUrl) { return null }
  const queryString = videoUrl.split('?').length > 0 ? videoUrl.split('?')[1] : null
  if (!queryString) { return null }
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('v')
}

export default function Video(props) {
  const videoId = getVideoId(props.url)
  if (!videoId) { return <div>No Valid YouTube Link Provided</div> }
  return <YouTube videoId={videoId} />
}

Video.propTypes = {
  url: PropTypes.string,
}
