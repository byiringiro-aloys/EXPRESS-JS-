const express = require('express')
const router = express.Router()
const handleLogin = require('../../controllers/authControllers')

router.route('/')
        .post(handleLogin.handleLogin)


module.exports = router