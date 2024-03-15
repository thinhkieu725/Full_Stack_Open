const jwt = require('jsonwebtoken')
const bcryptq = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { request } = require('express')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
  ? false
  : await bcryptq.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    usrename: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({token, username: user.username, name: user.name, id: user._id})
})

module.exports = loginRouter