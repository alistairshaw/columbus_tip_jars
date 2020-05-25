import ContentSection from '../../components/common/content-section'
import NoFeaturedVideoYet from './no-featured-video-yet'
import React from 'react'
import Video from '../../components/profile/video'
import { PropTypes } from 'prop-types'

export default function FeaturedVideo({ userProfile, title }) {
  if (userProfile === null) { return <NoFeaturedVideoYet title={title} /> }
  return (
    <ContentSection>
      <h1>{title ? title : 'Featured Video'}</h1>
      <Video url={userProfile.video_url} />
      <p>{userProfile.blurb}</p>
    </ContentSection>
  )
}

FeaturedVideo.propTypes = {
  title: PropTypes.string,
  userProfile: PropTypes.object.isRequired,
}
