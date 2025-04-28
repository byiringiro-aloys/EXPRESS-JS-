const usersDB = {
    users:require('../models/users.json'),
    setUsers:function(data){this.users=data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res)=>{
    const {user,role,password} = req.body;
    if(!user||!password||!role)return res.status(400).json({"message":"Username, role and password are required."})
    // check for duplicates in username in db
    const duplicate = usersDB.users.find(person=>person.username === user)
    if(duplicate){
        res.status(409).json({"message":"Username already exists."})
    }else{
    try{
        const hashedPasword = await bcrypt.hash(password,10)
        const newUser = {
            "username":user,
            "roles":role,
            "password":hashedPasword
        }
        const otherUsers = usersDB.users.filter(person=>person.username !== user)
        usersDB.setUsers([...otherUsers,newUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','models','users.json'),
            JSON.stringify(usersDB.users,null,2)
        );
        res.status(201).json({"success":`New user ${user} was created successfully.`})
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}
}


module.exports = handleNewUser