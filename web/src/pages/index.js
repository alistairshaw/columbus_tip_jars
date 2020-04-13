import React from 'react'
import useAuth from 'src/hooks/use-auth'

export default function IndexPage() {
  const { profile } = useAuth()

  // TODO: Remove after testing on domain
  // eslint-disable-next-line
  console.log({ apiUrl: process.env.NEXT_PUBLIC_API_URL })

  return (
    <div>
      <h1>Welcome to the Columbus Tip Jars {profile?.email}</h1>
    </div>
  )
}
