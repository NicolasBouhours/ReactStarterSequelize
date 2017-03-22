const express = require('express')

const auth = require('./middlewares/auth')
const authController = require('../controllers/auth.controller')

const router = express.Router()

// Get API routes
router.post('/signin', authController.signin)

router.post('/signup', authController.signup)

router.put('/password', auth.required, authController.updatePassword)

router.post('/forgot', authController.forgotPassword)

module.exports = router
