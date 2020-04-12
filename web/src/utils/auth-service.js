import axios from 'axios'

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:3000'
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login(email, password) {
    // Get a token
    return axios.post(`${this.domain}/api/v1/auth/login`, {
      user: {
        email,
        password,
      },
    })
      .then(({ data: { auth_token } }) => {
        this.setToken(auth_token)
        return this.fetch(`${this.domain}/api/v1/auth/me`, {
          method: 'GET',
        })
      }).then(({ resource }) => {
        this.setProfile(resource)
        return Promise.resolve(resource)
      })
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    location.reload(true)
  }

  register(email, password) {
    // Get a token
    return axios.post(`${this.domain}/api/v1/auth/register`, {
      user: {
        email,
        password,
      },
    }) .then(({ data: { auth_token, resource: profile } }) => {
      this.setToken(auth_token)
      this.setProfile(profile)
      window.location = '/'
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (this.loggedIn()){
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return axios({
      method: options.method,
      url,
      headers,
      ...options,
    })
      .then(this._checkStatus)
      .then((response) => response.data)
  }
}
