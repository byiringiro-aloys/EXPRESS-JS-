const {userLogs} = require('./logs')
const events = require('events')

class CustomEvents extends events{};

const Events = new CustomEvents();

const errorHandler = function(err,req,res,next){
    Events.on('err',(msg,fName)=>userLogs(msg,fName))
    Events.emit('err', ` Request info: { ${req.url} ${req.method} ${req.headers.origin} ${req.path} } Error encountered : { ${err.name} ${err.message} }`,'errLogs.txt')
    console.error(err.stack)
    res.status(500).send(`${err.message}`)
    
}

module.exports = errorHandler