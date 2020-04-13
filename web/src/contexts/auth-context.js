import AuthService from 'src/utils/auth-service'
import PropTypes from 'prop-types'
import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider(props) {
  const [auth] = useState(new AuthService(process.env.NEXT_PUBLIC_API_URL))

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
