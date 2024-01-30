import { config } from '../framework'
import got from 'got'

/**
 * Этот пример не будет работать!
 * Пока проект не переедет на es modules (настоящие)
 */

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const url = `${config.baseURL}/Account/v1/GenerateToken`

    const response = await got.post(url, {
      json: { userName: config.username, password: config.password },
      responseType: 'json',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body.result).toBe('User authorized successfully.')
    expect(response.body.token).toBeDefined()
  })
})
