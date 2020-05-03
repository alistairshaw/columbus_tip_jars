import PropTypes from 'prop-types'
import React from 'react'
import ReactYouTube from 'react-youtube'

function getVideoId(videoUrl) {
  if (!videoUrl) { return null }
  const queryString = videoUrl.split('?').length > 0 ? videoUrl.split('?')[1] : null
  if (!queryString) { return null }
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('v')
}

export default function YouTube(props) {
  const videoId = getVideoId(props.url)
  if (!videoId) { return <div>No Valid YouTube Link Provided</div> }
  return <ReactYouTube videoId={videoId} />
}

YouTube.propTypes = {
  url: PropTypes.string,
}
