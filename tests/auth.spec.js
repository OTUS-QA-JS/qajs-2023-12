import { config } from '../framework'

describe('Авторизация', () => {
  it('Успешная авторизация', async () => {
    const url = `${config.baseURL}/Account/v1/GenerateToken`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.username,
        password: config.password,
      }),
    })
    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.result).toBe('User authorized successfully.')
    expect(data.token).toBeDefined()
  })
})
