import LocalStorageService from 'src/utils/local-storage-service'
import axios from 'axios'

export default class AuthService {
  constructor(domain) {
    this.domain = domain || process.env.NEXT_PUBLIC_API_URL
  }

  login = (email, password) => {
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

  logout = () => {
    // Clear user token and profile data from localStorage
    LocalStorageService.removeItem('id_token')
    LocalStorageService.removeItem('profile')
    location.reload(true)
  }

  register = (email, password) => {
    // Get a token
    return axios.post(`${this.domain}/api/v1/auth/register`, {
      user: {
        email,
        password,
      },
    }).then(({ data: { auth_token, resource: profile } }) => {
      this.setToken(auth_token)
      this.setProfile(profile)
    })
  }

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token
  }

  setProfile = (profile) => {
    // Saves profile data to localStorage
    LocalStorageService.setItem('profile', JSON.stringify(profile))
  }

  getProfile = () => {
    // Retrieves the profile data from localStorage
    const profile = LocalStorageService.getItem('profile')
    return profile ? JSON.parse(profile) : {}
  }

  setToken = (idToken) => {
    // Saves user token to localStorage
    LocalStorageService.setItem('id_token', idToken)
  }

  getToken = () => {
    // Retrieves the user token from localStorage
    return LocalStorageService.getItem('id_token')
  }

  _checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }

    if (this.loggedIn()) {
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

  updateUserProfile = (newProfile, data) => {
    // POST /api/v1/user_profiles
    // PUT /api/v1/user_profiles/:id
    const method = newProfile ? 'POST' : 'PUT'
    const url = newProfile ?
      `${this.domain}/api/v1/user_profiles` :
      `${this.domain}/api/v1/user_profiles/${data.id}`

    const formData = new FormData()
    for (const key in data) {
      if (key === 'avatar' || key === 'profile_pic') {
        continue
      }
      formData.append(key, data[key] === null ? '' : data[key])
    }

    if (data.avatar) {
      formData.append('avatar', data.avatar)
    }

    return this.fetch(url, {
      method,
      data: formData,
    })
  }

  getUserProfile = () => {
    const profile = this.getProfile()
    return this.fetch(`${this.domain}/api/v1/user_profiles/${profile.id}`, {
      method: 'GET',
    })
  }
}
