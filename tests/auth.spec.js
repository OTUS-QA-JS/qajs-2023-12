import { config } from '../framework'
import axios from 'axios'

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const url = `${config.baseURL}/Account/v1/GenerateToken`
    const response = await axios.post(url, {
      userName: config.username,
      password: config.password,
    })
    expect(response.status).toBe(200)
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.data.token).toBeDefined()
  })
})


