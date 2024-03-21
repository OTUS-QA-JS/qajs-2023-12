import supertest from 'supertest'
import { config } from '../config'

export default class UserBookService {
  static async replace({ userId, fromIsbn, toIsbn, token }) {
    const response = await supertest(config.baseURL)
      .put(`/BookStore/v1/Books/${fromIsbn}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId,
        isbn: toIsbn,
      })
    return {
      headers: response.headers,
      status: response.status,
      data: response.body,
    }
  }

  static async addList({ userId, isbns, token }) {
    const payload = {
      userId,
      collectionOfIsbns: isbns.map(isbn => ({ isbn })),
    }

    const response = await supertest(config.baseURL)
      .post(`/BookStore/v1/Books`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .send(payload)
    return {
      headers: response.headers,
      status: response.status,
      data: response.body,
    }
  }

  static async removeAll({ userId, token }) {
    const response = await supertest(config.baseURL)
      .delete(`/BookStore/v1/Books?UserId=${userId}`)
      .set('Authorization', `Bearer ${token}`)
    return {
      headers: response.headers,
      status: response.status,
      data: response.body,
    }
  }
}
