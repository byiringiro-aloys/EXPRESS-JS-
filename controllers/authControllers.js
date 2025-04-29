const User = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const handleLogin = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password){
        res.status(400).json({"message":"Both username and password are required."})
    }
    const foundUser = await User.findOne({ username : user }).exec();
    if(!foundUser) return res.sendStatus(401)
    try{
        const match = await bcrypt.compare(password,foundUser.password)
        if(!match){
            res.sendStatus(401)
        }
        const roles = foundUser.roles;
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username":foundUser.username,
                    "role":roles 
                }
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            { "username":foundUser.username },
            process.env.REFRESH_SECRET_TOKEN,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken; 
        foundUser.save();       
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000}); // secure:true in production
        res.status(200).json({"accessToken ":accessToken});
    }catch(err){
        res.status(500).json({"message":"Authentication failed. Please try again in a moment."})
        console.log(err)
    }
    
}

module.exports = {handleLogin}