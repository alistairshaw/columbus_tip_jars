import ContentSection from '../../components/common/content-section'
import PropTypes from 'prop-types'
import React from 'react'

export default function NoFeaturedVideoYet({ title }) {
  return (
    <ContentSection>
      <h1>{title ? title : 'No Featured Video Yet'}</h1>
      <p>Click on &quot;User Profile&quot; on the left menu to set up your profile and put a video in this space!</p>
    </ContentSection>
  )
}

NoFeaturedVideoYet.propTypes = {
  title: PropTypes.string,
}
