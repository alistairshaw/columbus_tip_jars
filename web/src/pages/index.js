import React from 'react'
import useAuth from 'src/hooks/use-auth'

export default function IndexPage() {
  const { isLoggedIn, logout, profile } = useAuth()

  return (
    <div>
      <h1>Welcome to the Columbus Tip Jars {profile?.email}</h1>
      {isLoggedIn && (
        <a
          href={'#'}
          onClick={logout}
        >Log Out
        </a>
      )}

      {!isLoggedIn &&
        <a href={'login'}>Log In</a>
      }

    </div>

  )
}
