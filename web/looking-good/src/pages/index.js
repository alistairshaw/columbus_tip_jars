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
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
      </ContentSection>

      <FeaturedVideo title={'Featured Stylist Video'} userProfile={featuredVideo(userProfiles, 'stylists')} />
      <FeaturedVideo title={'Featured Artist Video'} userProfile={featuredVideo(userProfiles, 'artists')} />
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
