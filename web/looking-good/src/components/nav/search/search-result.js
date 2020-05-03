import React from 'react'
import UserProfileProps from 'src/props/user-profile-props'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

export default function SearchResult(props) {
  const classes = useStyles()
  const router = useRouter()

  const selectOption = () => {
    router.push(`/users/${props.userProfile.user_id}`)
  }

  return (
    <a
      className={classes.link} href={`/users/${props.userProfile.id}`}
      onClick={selectOption}
    >
      {props.userProfile.user_name}
      {props.userProfile.specialty ? `, ${props.userProfile.specialty}` : ''}
      {props.userProfile.business_name ? ` from ${props.userProfile.business_name}` : ''}
    </a>
  )
}

SearchResult.propTypes = {
  userProfile: UserProfileProps,
}

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'block',
    width: '100%',
    background: 'white',
    color: '#444',
    padding: theme.spacing(2, 2),
    overflow: 'auto',
    '&:hover': {
      background: theme.palette.secondary.main,
      color: theme.palette.primary.main,
    },
  },
}))
