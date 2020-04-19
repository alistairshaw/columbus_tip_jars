import PropTypes from 'prop-types'
import React from 'react'
import Recase from 'better-recase'
import fetch from 'isomorphic-unfetch'

export default function UserProfilePage({ userProfile }) {
  if (!userProfile) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h1>{userProfile.userName}</h1>
      {userProfile.photoUrl ? <img src={userProfile.photoUrl} /> : null}
    </div>
  )
}

UserProfilePage.propTypes = {
  userProfile: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    industry: PropTypes.string,
    nickname: PropTypes.string,
    userId: PropTypes.number.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    updatedAt: PropTypes.instanceOf(Date).isRequired,
  }),
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_profiles/${params.id}`)
  if (!response.ok) {
    return {
      props: {},
    }
  }

  const data = await response.json()
  const userProfile = Recase.camelCopy(data.resource)

  return {
    props: { userProfile },
  }
}
