import AuthService from '../utils/auth-service'
import React, {useEffect, useState} from 'react'

const auth = new AuthService()

export default function IndexPage() {

  const [profile, setProfile] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const {userProfile} = auth.getProfile()

    console.log('profile', userProfile)
    setProfile(userProfile)
    setLoggedIn(auth.loggedIn())
  }, [])

  return (
    <div>
      <h1>Welcome to the Columbus Tip Jars {profile?.email}</h1>
      {loggedIn && (
        <a
          href={'#'}
          onClick={auth.logout()}
        >Log Out
        </a>
      )}

      {!loggedIn &&
        <a href={'login'}>Log In</a>
      }

    </div>

  )
}
