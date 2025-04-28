const usersDB = {
    users:require('../models/users.json'),
    setUsers:function(data){this.users=data}
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const path = require('path')
const fsPromises = require('fs').promises

const handleLogin = async (req,res)=>{
    const {user,password} = req.body;
    if(!user||!password){
        res.status(400).json({"message":"Both username and password are required."})
    }
    const foundUser = usersDB.users.find(person=>person.username === user)
    if(!foundUser) return res.sendStatus(401)
    try{
        const match = await bcrypt.compare(password,foundUser.password)
        if(!match){
            res.sendStatus(401)
        }
        const roles = Object.values(foundUser.roles)
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
        const otherUsers = usersDB.users.filter(person=>person.username !== foundUser.username)
        const currentUser = {...foundUser,refreshToken}
        usersDB.setUsers([...otherUsers,currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json'),
            JSON.stringify(usersDB.users,null,2)
        )
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000}); // secure:true in production
        res.status(200).json({"accessToken ":accessToken});
    }catch(err){
        res.status(500).json({"message":"Authentication failed. Please try again in a moment."})
        console.log(err)
    }
    
}

module.exports = {handleLogin}