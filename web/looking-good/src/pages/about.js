import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'

export default function AboutPage() {
  return (
    <Container>
      <Typography color={'textPrimary'} variant={'h3'}>{'About Looking Good Columbus'}</Typography>

      <Box marginTop={5}>
        <Typography variant={'h6'}>
          We exist to provide ways for cosmetic industry workers, affected by COVID-19, to receive financial support during these tough times.
        </Typography>
      </Box>
    </Container>
  )
}
