const express = require('express')

const auth = require('./middlewares/auth')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/user.controller')

const router = express.Router()

// Get API routes
router.post('/signin', authController.signin)

router.post('/signup', authController.signup)

router.put('/password', auth.required, authController.updatePassword)

router.get('/profile', auth.required, userController.getProfile)

router.put('/profile', auth.required, userController.updateProfile)

module.exports = router
