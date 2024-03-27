import 'dotenv/config'

const config = {
  baseURL: process.env.TEST_BASE_API_URL,
  userId: process.env.TEST_USER_ID,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
  telegram: {
    enable: process.env.TEST_TELEGRAM_ENABLE === 'true',
    token: process.env.TEST_TELEGRAM_TOKEN,
    chatId: process.env.TEST_TELEGRAM_CHAT_ID,
  },
  rwa: {
    baseURL: 'https://vue3-realworld-example-app-mutoe.vercel.app',
    username: 'plumrx',
    email: 'foo@example.com',
    password: '12345678',
  },
}

// если хотим задать значения по-умолчанию, можно использовать оператор ??
export default Object.freeze(config)
