import { AuthService } from './index'
import { config } from '../config'

const cache = new Map()

const getFromCache = async (credentials) => {
  const key = JSON.stringify(credentials)
  if (!cache.has(key)) {
    cache.set(key, AuthService.generateToken(credentials))
  }
  try {
    const response = await cache.get(key)
    if (!response.data.token) {
      throw new Error('Token is empty')
    }

    return response.data.token
  } catch (error) {
    cache.delete(key)
    throw error
  }
}

getFromCache({
  userName: config.username,
  password: config.password,
})
  .then(token => {
    console.log('token1', token)
  })

getFromCache({
  userName: config.username,
  password: config.password,
})
  .then(token => {
    console.log('token2', token)
  })

const clearCache = () => {
  cache.clear()
}

export default {
  get: getFromCache,
  clear: clearCache,
}
