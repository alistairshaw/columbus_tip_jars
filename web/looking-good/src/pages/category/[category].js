import ContentSection from '../../components/common/content-section'
import FeaturedVideo from './featured-video'
import NoFeaturedVideoYet from './no-featured-video-yet'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import UserCard from '../../components/profile/user-card'
import fetch from 'isomorphic-unfetch'
import { Grid } from '@material-ui/core'
import { initGA, logPageView } from "./../../utils/analytics"

const categoryCopy = {
  stylists:
  <div>
    <p>Connect with your stylist and get hints to keep yourself looking good. Tip your stylist to help them maintain
      income in this tough time.
    </p>
    <p>Search for your stylist by name or browse below. Check out some style tips and leave a tip for your
      stylist!
    </p>
  </div>,
  artists:
  <div>
    <p>Connect with local artists and work on some projects to keep yourself feeling good. Tip your artist to help
      them maintain income in this tough time.
    </p>
    <p>Search for your artist by name or browse below. Check out some art tips and leave a tip for your artist!</p>
  </div>,
  bartenders:
  <div>
    <p>Connect with your bartender and work on your cocktail recipes. Tip your bartender to help them maintain income
      in this tough time.
    </p>
    <p>Search for your bartender by name or browse below. Check out some beverage tips and leave a tip for your
      bartender!
    </p>
  </div>,
}

export default function Category({ category, userProfiles }) {
  useEffect(() => {
    initGA()
    logPageView()
  })

  const activeProfiles = userProfiles.filter((p) => p.category === category)
  const featuredProfile = activeProfiles.length > 0
    ? activeProfiles[0]
    : null

  return (
    <div>
      <ContentSection>
        <img src={`/images/categories/${category}.png`} style={{ float: 'right', width: 300 }} />
        <h1 style={{ textTransform: 'capitalize' }}>{category}</h1>
        <h2>Get a tip – leave a tip</h2>
        {categoryCopy[category]}
      </ContentSection>
      {featuredProfile ? <FeaturedVideo userProfile={featuredProfile} /> : <NoFeaturedVideoYet />}
      <ContentSection>
        <h1>More from this Category</h1>
        <Grid container wrap={'wrap'}>
          {activeProfiles.map((profile) => <UserCard key={profile.id} userProfile={profile} />)}
        </Grid>
      </ContentSection>
    </div>
  )
}

Category.propTypes = {
  category: PropTypes.string.isRequired,
  userProfiles: PropTypes.array,
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_profiles`)
  if (!response.ok) {
    return {
      props: {},
    }
  }
  const data = await response.json()
  return {
    props: {
      category: params.category,
      userProfiles: data.resources,
    },
  }
}
