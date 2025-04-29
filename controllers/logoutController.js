const User = require('../models/Users')

const handleLogout = async (req,res)=>{
    //on client, also delete the accessToken
    const cookie = req.cookies;
    if(!cookie?.jwt)return res.sendStatus(204)
    const refreshToken = cookie.jwt
    const foundUser = await User.findOne({ refreshToken : refreshToken }).exec();
    foundUser.refreshToken = '';
    foundUser.save();
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true}) // secure:true -- only serves on https
    res.sendStatus(204)
}

module.exports = { handleLogout }