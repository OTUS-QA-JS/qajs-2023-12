import { config } from '../framework'
import supertest from 'supertest'

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const response = await supertest(config.baseURL)
      .post('/Account/v1/GenerateToken')
      .send({
        userName: config.username,
        password: config.password,
      })
    expect(response.status).toBe(200)
    expect(response.body.result).toBe('User authorized successfully.')
    expect(response.body.token).toBeDefined()
  })
})


