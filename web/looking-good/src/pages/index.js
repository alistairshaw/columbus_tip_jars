import PropTypes from 'prop-types'
import React from 'react'
import UserCard from 'src/components/profile/user-card'
import fetch from 'isomorphic-unfetch'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Grid,
  Icon,
  Typography,
} from '@material-ui/core'
import { GitHub as GitHubIcon } from '@material-ui/icons/'

function CSCLogoIcon() {
  return (
    <Icon>
      <a href='https://cantstopcolumbus.com/' target='_blank'><img src={'/logos/cscbus_logo_square.png'} style={{ width: 24, height: 24}} /></a>
    </Icon>
  )
}

export default function IndexPage({ userProfiles }) {
  function profileSection() {
    if (userProfiles) {
      return (
        <Grid container wrap={'wrap'}>
          {userProfiles.map((profile) => <UserCard key={profile.id} userProfile={profile} />)}
        </Grid>
      )
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div>
      <Typography variant={'h2'}>Welcome to Columbus Tip Jars</Typography>
      <Typography variant={'h6'}>Provide financial support to cosmetic industry workers who are out of work due to
        COVID-19.
      </Typography>
      <Box mt={4}>
        <Typography variant={'h5'}>FEATURED</Typography>
      </Box>
      {profileSection()}
      <Button color={'primary'} variant={'contained'}>View all</Button>
      <BottomNavigation
        showLabels style={{
          width: '65%',
          display: 'flex',
          justifyContent: 'space-evenly',
          position: 'fixed',
          bottom: 0,
          boxSizing: 'border-box',
        }}>
          <a href='https://github.com/alistairshaw/columbus_tip_jars' target='_blank'><BottomNavigationAction icon={(<GitHubIcon />)} label={'GitHub'} /></a>
          <BottomNavigationAction icon={(<CSCLogoIcon />)} label={'Can\'t Stop Columbus'} />
      </BottomNavigation>
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
