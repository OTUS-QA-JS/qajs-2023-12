import { AuthService } from './index'
import { config } from '../config'

class TokenService {
  #cache = new Map()

  #generateKey (data) {
    return JSON.stringify(data)
  }

  async get (credentials) {
    const key = this.#generateKey()
    if (!this.#cache.has(key)) {
      this.#cache.set(key, AuthService.generateToken(credentials))
    }
    try {
      const response = await this.#cache.get(key)
      if (!response.data.token) {
        throw new Error('Token is empty')
      }

      return response.data.token
    } catch (error) {
      this.#cache.delete(key)
      throw error
    }
  }

  delete (credentials) {
    this.#cache.delete(this.#generateKey(credentials))
  }

  clear () {
    this.#cache.clear()
  }
}

export default new TokenService()
