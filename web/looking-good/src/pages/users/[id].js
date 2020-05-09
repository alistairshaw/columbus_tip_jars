import DonateButton from 'src/components/profile/donate-button'
import React from 'react'
import UserProfileProps from 'src/props/user-profile-props'
import UserViewHeading from 'src/components/profile/heading'
import Video from 'src/components/profile/video'
import fetch from 'isomorphic-unfetch'
import { Avatar, Grid } from '@material-ui/core'

export default function UserProfilePage({ userProfile }) {
  if (!userProfile) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Grid style={{ 
      border: '2px #808080 solid',
      backgroundColor: 'white', 
      borderRadius: '25px', 
      width: '90%',
      padding: '1.5%',
      margin: 'auto' 
    }} container spacing={3}>
      <Grid
        item
        lg={3}
        md={6}
        style={{ display: 'flex', flexDirection: 'column' }}
        xs={12}
      >
        <div style={{ alignSelf: 'center', margin: '30px 0' }}>
          <Avatar
            alt={userProfile.user_name}
            src={userProfile.avatar}
            style={{ width: 200, height: 200 }}
          />
        </div>
        <div style={{ alignSelf: 'center', margin: '30px 0' }}>
          <DonateButton donateUrl={userProfile.tip_url ? userProfile.tip_url : ''} />
        </div>
      </Grid>
      <Grid
        item
        lg={9}
        md={6}
        xs={12}
      >
        <UserViewHeading
          businessName={userProfile.business_name}
          specialty={userProfile.specialty}
          userName={userProfile.user_name}
        />
        <p>{userProfile.blurb}</p>
        <Video url={userProfile.video_url} />
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
  return {
    props: { userProfile: data.resource },
  }
}
