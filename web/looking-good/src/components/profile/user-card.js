import React from 'react'
import UserProfileProps from 'src/props/user-profile-props'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Avatar, Box, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(5),
    background: 'white',
    marginBottom: theme.spacing(5),
    textAlign: 'center',
    '& h1': {
      marginTop: 0,
    },
  },
}))

export default function UserCard(props) {
  const userProfile = props.userProfile
  const router = useRouter()
  const classes = useStyles()

  return (
    <Box
      className={classes.box}
      marginRight={2} my={5}
      width={250}
    >
      <Avatar
        alt={userProfile.user_name}
        src={userProfile.avatar}
        style={{ width: 150, height: 150, margin: 'auto' }}
      />
      <Box pr={2}>
        <Typography variant={'h5'}>{userProfile.user_name}</Typography>
        <Typography gutterBottom variant={'body2'}>{`${userProfile.specialty}`}</Typography>
        <Button
          onClick={() => {
            router.push(`/users/${userProfile.user_id}`)
          }} variant={'contained'}
        >Go to Video
        </Button>
      </Box>
    </Box>
  )
}

UserCard.propTypes = {
  userProfile: UserProfileProps,
}
