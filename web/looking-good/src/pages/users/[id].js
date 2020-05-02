import DonateButton from '../../components/profile/donate-button'
import React from 'react'
import Recase from 'better-recase'
import UserProfileProps from '../../entities/user-profile-props'
import UserViewHeading from '../../components/profile/heading'
import Video from '../../components/profile/video'
import fetch from 'isomorphic-unfetch'
import { Avatar, Grid } from '@material-ui/core'

export default function UserProfilePage({ userProfile }) {
  if (!userProfile) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={3}
        md={6}
        style={{ display: 'flex', flexDirection: 'column' }}
        xs={12}
      >
        <div style={{ alignSelf: 'center', margin: '30px 0' }}>
          <Avatar
            alt={userProfile.userName}
            src={userProfile.avatar}
            style={{ width: 250, height: 250 }}
          />
        </div>
        <div style={{ alignSelf: 'center', margin: '30px 0' }}>
          <DonateButton donateUrl={userProfile.tipUrl} />
        </div>
      </Grid>
      <Grid
        item
        lg={9}
        md={6}
        xs={12}
      >
        <UserViewHeading
          businessName={userProfile.businessName}
          specialty={userProfile.specialty}
          userName={userProfile.userName}
        />
        <p>{userProfile.blurb}</p>
        <Video url={userProfile.videoUrl} />
      </Grid>
    </Grid>
  )
}

UserProfilePage.propTypes = {
  userProfile: UserProfileProps,
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_profiles/${params.id}`)
  if (!response.ok) {
    return {
      props: {},
    }
  }

  const data = await response.json()
  const userProfile = Recase.camelCopy(data.resource)

  return {
    props: { userProfile },
  }
}
