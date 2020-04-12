import React from 'react'
import useAuth from 'src/hooks/use-auth'

export default function IndexPage() {
  const { profile } = useAuth()

  return (
    <div>
      <h1>Welcome to the Columbus Tip Jars {profile?.email}</h1>
    </div>
  )
}
