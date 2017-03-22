const express = require('express')

const auth = require('./middlewares/auth')
const userController = require('../controllers/user.controller')

const router = express.Router()

router.get('/profile', auth.required, userController.getProfile)

router.put('/profile', auth.required, userController.updateProfile)

module.exports = router
