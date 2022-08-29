const express = require('express')
const { registerController, loginController } = require('../controller/userController')

const userRouter = express.Router()


userRouter.post('/', registerController)
userRouter.post('/login', loginController)

module.exports = userRouter