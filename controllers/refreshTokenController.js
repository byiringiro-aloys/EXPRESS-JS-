const usersDB = {
    users:require('../models/users.json'),
    setUsers:function(data){this.users=data}
}

const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleRefreshToken = (req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.jwt)return res.sendStatus(401)
    console.log(cookie.jwt)
    const refreshToken = cookie.jwt
    const foundUser = usersDB.users.find(person=>person.refreshToken === refreshToken)
    if(!foundUser)return res.sendStatus(403)
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
        (err,decoded)=>{
            if(err||foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {"username":decoded.username},
                process.env.ACCESS_SECRET_TOKEN,
                {expiresIn:'30s'}
            );
            res.json({accessToken})
            
        }
    )
}

module.exports = { handleRefreshToken }