import PropTypes from 'prop-types'
import React from 'react'
import Recase from 'better-recase'
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
import { useRouter } from 'next/router'

function CSCLogoIcon() {
  return (
    <Icon>
      <img src={'/logos/cscbus_logo_square.png'} style={{ width: 24, height: 24 }} />
    </Icon>
  )
}

export default function IndexPage({ userProfiles }) {
  const router = useRouter()

  function profileSection() {
    if (userProfiles) {
      return (
        <Grid container wrap={'wrap'}>
          {userProfiles.map((item, index) => (
            <Box
              key={index} marginRight={2}
              my={5} width={400}
            >
              <img
                alt={item.nickname} src={item.photoUrl}
                style={{ width: 400, height: 300 }}
              />
              <Box pr={2}>
                <Typography variant={'h5'}>{item.nickname}</Typography>
                <Typography gutterBottom variant={'body2'}>{`${item.industry}`}</Typography>
                <Button
                  onClick={() => {
                    router.push(`/users/${item.id}`)
                  }} variant={'contained'}
                >Tip Jar
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      )
    } else {
      return <div>Loading...</div>
    }
  }

  return (
    <div>
      <Typography variant={'h2'}>Welcome to Columbus Tip Jars</Typography>
      <Typography variant={'h6'}>Provide financial support to cosmetic industry workers who are out of work due to COVID-19.</Typography>
      <Box mt={4}>
        <Typography variant={'h5'}>FEATURED</Typography>
      </Box>
      {profileSection()}
      <Button color={'primary'} variant={'contained'}>View all</Button>
      <BottomNavigation
        showLabels style={{
          width: '100%',
          position: 'fixed',
          bottom: 0,
        }}
      >
        <BottomNavigationAction icon={(<GitHubIcon />)} label={'GitHub'} />
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
  const userProfiles = Recase.camelCopy(data.resources)

  return {
    props: { userProfiles },
  }
}
