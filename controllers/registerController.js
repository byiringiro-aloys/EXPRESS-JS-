const User = require('../models/Users')
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res)=>{
    const {user,role,password} = req.body;
    if(!user||!password)return res.status(400).json({"message":"Username and password are required."})
    // check for duplicates in username in db
    const duplicate = await User.findOne({ username : user }).exec();

    if(duplicate){
        res.status(409).json({"message":"Username already exists."})
    }else{
    try{

        const hashedPasword = await bcrypt.hash(password,10);
        //create and store the new user.
        const result = await User.create({
            "username":user,
            "roles":role,
            "password":hashedPasword
        }); 
        res.status(201).json({"success":`New user ${user} was created successfully.`})
        
    }catch(err){
        res.status(500).json({"message":err.message})
    }
}
}


module.exports = handleNewUser