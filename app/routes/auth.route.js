const express = require('express')

const authController = require('../controllers/auth.controller')

const router = express.Router()

// Get API routes
router.get('/login', authController.login)

module.exports = router
