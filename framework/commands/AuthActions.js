import { expect } from '@playwright/test'

export async function login({ page, username, password }) {
  await page.goto('/login')

  await page.getByPlaceholder('UserName').clear()

  await page.getByPlaceholder('UserName').type(username)

  await page.getByPlaceholder('Password').clear()

  await page.getByPlaceholder('Password').type(password)

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/profile')
}
