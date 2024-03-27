import BasePage from './BasePage'

export default class BookPage extends BasePage {
  #locators = {
    fields: {},
    btn: null,
  }

  get pageUrl() {
    return `/books?book=${this.bookId}`
  }

  constructor({ page, bookId }) {
    super({ page })
    this.bookId = bookId
    // this.pageUrl = `/books?book=${this.bookId}`
  }

  addBookToCollection() {
    return this.page
      .getByRole('button', { name: 'Add To Your Collection' })
      .click()
  }
}
