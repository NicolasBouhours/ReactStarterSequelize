const express = require('express')

const authController = require('../controllers/auth.controller')

const router = express.Router()

// Get API routes
router.post('/signin', authController.signin)

router.post('/signup', authController.signup)

module.exports = router
