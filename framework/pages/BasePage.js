export default class BasePage {
  page

  constructor({ page } = {}) {
    if (!page) {
      throw new Error('page обязательно надо передать')
    }
    this.page = page
  }

  async visit() {
    if (!this.pageUrl) {
      throw new Error('не задана страница перехода')
    }
    await this.page.goto(this.pageUrl)
  }
}
