import axios from 'axios'
import { config } from '../framework'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true,
})

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const response = await client.post('/Account/v1/GenerateToken', {
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  })
})
