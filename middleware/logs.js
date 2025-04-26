const {v4:uuid} = require('uuid')
const {format} = require('date-fns')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises
const events = require('events')

const userIdLogs = uuid()
const dateLogs = format(new Date(), 'yyyy-MM-dd\t HH:mm:ss')


const userLogs = async (message,fName)=>{
    console.log(`${dateLogs} ${userIdLogs} ${message}`)
    if(!fs.existsSync(path.join(__dirname,'..','logs'))){
        await fsPromises.mkdir(path.join(__dirname,'..','logs'))
    }
    try{
        await fsPromises.appendFile(path.join(__dirname,'..','logs',fName),`${dateLogs} ${userIdLogs} ${message}\n`);
    }catch(err){
        console.log(err)
    }
}

const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.path}`)
    class MyEVENTS extends events{};
    const EVENTS = new MyEVENTS();
    EVENTS.on('log',(msg,fName)=>userLogs(msg,fName))
    EVENTS.emit('log',`${req.method} ${req.headers.origin} ${req.path}`,'reqLogs.txt')
    next()
}

module.exports = {userLogs,logger};