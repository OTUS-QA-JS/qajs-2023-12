import { test, expect } from '@playwright/test'
import config from '../framework/config/config'
import LoginPage from '../framework/pages/LoginPage'

const USERNAME = config.username
const PASSWORD = config.password

test('Success login', async ({ page }) => {
  const loginPage = new LoginPage({ page })
  await loginPage.login(USERNAME, PASSWORD)
  // await page.waitForLoadState('networkidle')
  await expect(page.getByText(`User Name : ${USERNAME}Log out`)).toBeVisible()
})

test('Cannot auth without credentials', async ({ page }) => {
  const loginPage = new LoginPage({ page })
  await loginPage.visit()
  await loginPage.submit()

  await loginPage.isInvalidUserName()
  await loginPage.isInvalidPassword()
})
