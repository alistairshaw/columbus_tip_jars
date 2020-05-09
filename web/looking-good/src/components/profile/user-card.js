import React from 'react'
import UserProfileProps from 'src/props/user-profile-props'
import { Avatar, Box, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function UserCard(props) {
  const userProfile = props.userProfile
  const router = useRouter()

  return (
    <Box
      marginRight={2}
      my={5} width={250}
      style={{ 
        backgroundColor: 'white', 
        // border: '#4300ff 1.5px solid',
        borderRadius: '25px', 
        paddingTop: '15px', 
        paddingBottom: '15px', 
        textAlign: 'center',
        boxShadow: '7px 7px #808080',
        margin: '2.5%' 
      }}
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
        >Tip Jar
        </Button>
      </Box>
    </Box>
  )
}

UserCard.propTypes = {
  userProfile: UserProfileProps,
}
