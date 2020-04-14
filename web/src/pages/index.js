import React from 'react'
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

const data = [
  {
    src: '/images/salon-spa-example.jpg',
    userProfileId: '1',
    salon: 'Relax Day Spa',
    employee: 'Hannah Johnson',
    occupation: 'Masseuse',
    description: 'a week ago',
  },
  {
    src: '/images/salon-hair-example.jpg',
    salon: 'Bella Hair Salon',
    userProfileId: '1',
    employee: 'Amy Davis',
    occupation: 'Hairdresser',
    description: '3 years ago',
  },
  {
    src: '/images/salon-makeup-example.jpg',
    userProfileId: '1',
    salon: 'Lavish Beauty Salon',
    employee: 'Deja Williams',
    occupation: 'Makeup Artist',
    description: '10 months ago',
  },
]

function CSCLogoIcon() {
  return (
    <Icon>
      <img src={'/logos/cscbus_logo_square.png'} style={{ width: 24, height: 24 }} />
    </Icon>
  )
}

export default function IndexPage() {
  const router = useRouter()
  return (
    <div>
      <Typography variant={'h2'}>Welcome to Columbus Tip Jars</Typography>
      <Typography variant={'h6'}>Provide financial support to cosmetic industry workers who are out of work due to COVID-19.</Typography>
      <Box mt={4}>
        <Typography variant={'h5'}>FEATURED</Typography>
      </Box>
      <Grid container wrap={'wrap'}>
        {data.map((item, index) => (
          <Box
            key={index} marginRight={2}
            my={5} width={400}
          >
            <img
              alt={item.salon} src={item.src}
              style={{ width: 400, height: 300 }}
            />
            <Box pr={2}>
              <Typography variant={'h5'}>{item.employee}</Typography>
              <Typography gutterBottom variant={'body2'}>{`${item.occupation} - ${item.salon}`}</Typography>
              <Button
                onClick={() => {
                  router.push(`/users/${item.userProfileId}`)
                }} variant={'contained'}
              >Tip Jar
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
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
