const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

describe('invalid new username is not created', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('invalid username is not created', async () => {
    const newUser = {
      username: 'a',
      name: 'New User',
      password: 'somepassword'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

  test('invalid password is not created', async () => {
    const newUser = {
      username: 'newuser',
      name: 'New User',
      password: 'a'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length)
  })

})

after(async() => {
  await mongoose.connection.close()
})