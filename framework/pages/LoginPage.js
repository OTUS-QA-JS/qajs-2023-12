import BasePage from './BasePage'
import { expect } from '@playwright/test'

export default class LoginPage extends BasePage {
  pageUrl = '/login'

  #locators = {
    fields: {},
    btn: null,
  }

  constructor({ page }) {
    super({ page })

    this.#locators.fields.username = this.page.getByPlaceholder('UserName')
    this.#locators.fields.password = this.page.getByPlaceholder('Password')
    this.#locators.btnLogin = this.page.getByRole('button', { name: 'Login' })
  }

  async fillUsername(username = '') {
    const field = await this.#locators.fields.username
    await field.clear()
    await field.fill(username)

    return this
  }

  async fillPassword(password = '') {
    const field = await this.#locators.fields.password
    await field.clear()
    await field.fill(password)

    return this
  }

  submit() {
    return this.#locators.btnLogin.click()
  }

  async login(username, password) {
    await this.visit()
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.submit()
    await expect(this.page).toHaveURL('/profile')
  }

  get locatorFieldUsername() {
    return this.#locators.fields.username
  }

  get locatorFieldPassword() {
    return this.#locators.fields.password
  }

  async isInvalidUserName() {
    await expect(this.#locators.fields.username).toHaveClass(/is-invalid/)
  }

  async isInvalidPassword() {
    await expect(this.#locators.fields.password).toHaveClass(/is-invalid/)
  }
}
