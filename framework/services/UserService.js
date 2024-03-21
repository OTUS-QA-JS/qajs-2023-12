import client from './client'

export default class UserService {
  static async get({ userId, token }) {
    const response = await client.get(`/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      headers: response.headers,
      status: response.status,
      data: response.data,
    }
  }

  static async create({ userName, password }) {
    const response = await client.post(`/Account/v1/User`, {
      userName,
      password,
    })

    return {
      headers: response.headers,
      status: response.status,
      data: response.data,
    }
  }

  static async remove({ userId, token }) {
    const response = await client.delete(`/Account/v1/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      headers: response.headers,
      status: response.status,
      data: response.data,
    }
  }
}
