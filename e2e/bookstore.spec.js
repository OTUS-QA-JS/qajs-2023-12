import { test, expect } from '@playwright/test'
import config from '../framework/config/config'
import UserBookService from '../framework/services/UserBookService'
import AuthService from '../framework/services/AuthService'
import LoginPage from '../framework/pages/LoginPage'
import BookPage from '../framework/pages/BookPage'
import ProfilePage from '../framework/pages/ProfilePage'
import { login } from '../framework/commands/AuthActions'

const USERNAME = config.username
const PASSWORD = config.password
const USER_ID = config.userId

// страница книги сломана, поэтому тест пропускаем
test.skip('Success add book to collection', async ({ page }) => {
  const BOOK_ID = 9781491904244
  // await page.route('**/BookStore/v1/Books', route => {
  //   route.fulfill({
  //     status: 201,
  //     body: JSON.stringify({
  //       "userId": USER_ID,
  //       "collectionOfIsbns":[{ "isbn": BOOK_ID }]
  //     })
  //   })
  // })

  const response = await AuthService.generateToken({
    userName: config.username,
    password: config.password,
  })
  const token = response.data.token
  // тут правильнее было бы удалить конкретную книгу
  await UserBookService.removeAll({
    userId: USER_ID,
    token,
  })

  const loginPage = new LoginPage({ page, url: '/login' })
  await loginPage.login(USERNAME, PASSWORD)
  await page.getByText(`User Name : ${USERNAME} Log out`).isVisible()
  await page.waitForLoadState('networkidle') // сетевые запросы
  const bookPage = new BookPage({ page, bookId: BOOK_ID })
  await bookPage.visit()

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert')
    expect(dialog.message()).toBe('Book added to your collection.')
    await dialog.accept()
  })

  await bookPage.addBookToCollection()
  await page.waitForLoadState('networkidle')
  // Book added to your collection.
})

test('Empty list of books', async ({ page }) => {
  await login({
    username: USERNAME,
    password: PASSWORD,
    page,
  })
  const profilePage = new ProfilePage({ page })
  await profilePage.visit()
})
