import PropTypes from 'prop-types'
import React from 'react'
import fetch from 'isomorphic-unfetch'

export default function UserProfilePage({ userProfile }) {
  if (!userProfile) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      <h1>{userProfile.user_name}</h1>
      {userProfile.photo_url ? <img src={userProfile.photo_url} /> : null}
    </div>
  )
}

UserProfilePage.propTypes = {
  userProfile: PropTypes.shape({
    user_name: PropTypes.string.isRequired,
    photo_url: PropTypes.string,
    industry: PropTypes.string,
    nickname: PropTypes.string,
    user_id: PropTypes.number.isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
    updated_at: PropTypes.instanceOf(Date).isRequired,
  }),
}

export async function getStaticProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user_profiles/${params.id}`)

  if (!response.ok) {
    return {
      props: {},
    }
  }

  const data = await response.json()

  return {
    props: {
      userProfile: data.resource,
    },
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}
