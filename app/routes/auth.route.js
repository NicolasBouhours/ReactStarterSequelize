const express = require('express')

const authController = require('../controllers/auth.controller')

const router = express.Router()

// Get API routes
router.get('/signin', authController.signin)

module.exports = router
