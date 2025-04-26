const express = require('express')
const router = express.Router()
const handleRefreshToken = require('../../controllers/refreshTokenController')
const { route } = require('../root')

router.route('/')
        .get(handleRefreshToken.handleRefreshToken)


module.exports = router