import React from 'react'
import useAuth from 'src/hooks/use-auth'
import {
  Box,
  Button,
  Grid,
  Typography,
} from '@material-ui/core'

const data = [
  {
    src: '/images/salon-spa-example.jpg',
    salon: 'Relax Day Spa',
    employee: 'Hannah Johnson',
    occupation: 'Masseuse',
    description: 'a week ago',
  },
  {
    src: '/images/salon-hair-example.jpg',
    salon: 'Bella Hair Salon',
    employee: 'Amy Davis',
    occupation: 'Hairdresser',
    description: '3 years ago',
  },
  {
    src: '/images/salon-makeup-example.jpg',
    salon: 'Lavish Beauty Salon',
    employee: 'Deja Williams',
    occupation: 'Makeup Artist',
    description: '10 months ago',
  },
];

export default function IndexPage() {
  const { profile } = useAuth()

  // TODO: Remove after testing on domain
  // eslint-disable-next-line
  console.log({ apiUrl: process.env.NEXT_PUBLIC_API_URL })

  return (
    <div>
      <Typography variant="h2">Welcome to Columbus Tip Jars {profile?.email}</Typography>
      <Typography variant="h6">Provide financial support to cosmetic industry workers who are out of work due to COVID-19.</Typography>
      <Box mt={4}>
        <Typography variant="h5">FEATURED</Typography>
      </Box>
      <Grid container wrap="wrap">
        {data.map((item, index) => (
          <Box key={index} width={400} marginRight={2} my={5}>
            <img style={{ width: 400, height: 300 }} alt={item.salon} src={item.src} />
            <Box pr={2}>
              <Typography variant="h5">{item.employee}</Typography>
              <Typography gutterBottom variant="body2">{`${item.occupation} - ${item.salon}`}</Typography>
              <Button variant="contained">Tip Jar</Button>
            </Box>
          </Box>
        ))}
      </Grid>
      <Button variant="contained" color="primary">View all</Button>
    </div>
  );
}
