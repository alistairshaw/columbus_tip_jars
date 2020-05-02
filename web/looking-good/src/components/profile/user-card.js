import PropTypes from 'prop-types'
import React from 'react'
import { Avatar, Box, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'

export default function UserCard(props) {
  const userProfile = props.userProfile
  const router = useRouter()

  return (
    <Box
      marginRight={2}
      my={5} width={400}
    >
      <Avatar
        alt={userProfile.userName}
        src={userProfile.avatar}
        style={{ width: 150, height: 150 }}
      />
      <Box pr={2}>
        <Typography variant={'h5'}>{userProfile.userName}</Typography>
        <Typography gutterBottom variant={'body2'}>{`${userProfile.industry}`}</Typography>
        <Button
          onClick={() => {
            router.push(`/users/${userProfile.id}`)
          }} variant={'contained'}
        >Tip Jar
        </Button>
      </Box>
    </Box>
  )
}

UserCard.propTypes = {
  userProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    photoUrl: PropTypes.string,
    industry: PropTypes.string,
    nickname: PropTypes.string,
    userId: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  }),
}
