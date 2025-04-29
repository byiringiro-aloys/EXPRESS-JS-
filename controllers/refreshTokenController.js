const User = require('../models/Users')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleRefreshToken = async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.jwt) return res.sendStatus(401)
    const refreshToken = cookie.jwt
    const foundUser = await User.findOne({ refreshToken : refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403)
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_SECRET_TOKEN,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })

        }
    )
}

module.exports = { handleRefreshToken }