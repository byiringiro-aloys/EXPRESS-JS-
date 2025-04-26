const usersDB = {
    users:require('../models/users.json'),
    setUsers:function(data){this.users=data}
}
const fsPromises = require('fs').promises;
const path = require('path')

const handleLogout = async (req,res)=>{
    //on client, also delete the accessToken
    const cookie = req.cookies;
    if(!cookie?.jwt)return res.sendStatus(204)
    const refreshToken = cookie.jwt
    const foundUser = usersDB.users.find(person=>person.refreshToken === refreshToken)
    const otherUsers = usersDB.users.filter(person=>person.refreshToken !== foundUser.refreshTokend)

    const currentUser = {...foundUser,refreshToken:''}
    usersDB.setUsers({...otherUsers,currentUser})
    await fsPromises.writeFile(
        path.join(__dirname,'..','models','users.json'),
        JSON.stringify(usersDB.users)
    )
    res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000}) // secure:true -- only serves on https
    res.sendStatus(204)
}

module.exports = { handleLogout }