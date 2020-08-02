import ContentSection from '../components/common/content-section'
import FeaturedVideo from './category/featured-video'
import HomeFooter from '../components/home/home-footer'
import PropTypes from 'prop-types'
import React from 'react'
import fetch from 'isomorphic-unfetch'

function featuredVideo(userProfiles, category) {
  const activeVideos = userProfiles.filter((p) => p.category === category)
  return activeVideos.length > 0 ? activeVideos[0] : null
}

export default function IndexPage({ userProfiles }) {
  return (
    <div>
      <ContentSection>
        <h1>Welcome to Columbus Tip Jars</h1>
      </ContentSection>

      <FeaturedVideo title={'Featured Stylist Video'} userProfile={featuredVideo(userProfiles, 'stylists')} />
      <FeaturedVideo title={'Featured Artist Video'} userProfile={featuredVideo(userProfiles, 'artists')} />
      <FeaturedVideo title={'Featured Musician Video'} userProfile={featuredVideo(userProfiles, 'musicians')} />
      <FeaturedVideo title={'Featured Bartender Video'} userProfile={featuredVideo(userProfiles, 'bartenders')} />

      <HomeFooter />
    </div>
  )
}

IndexPage.propTypes = {
  userProfiles: PropTypes.array,
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_profiles`)
  if (!response.ok) {
    return {
      props: {},
    }
  }
  const data = await response.json()
  return {
    props: { userProfiles: data.resources },
  }
}
