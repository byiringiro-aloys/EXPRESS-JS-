const express = require('express')
const {logger} = require('./middleware/logs')
const corsOptions = require('./config/cors')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const cors = require('cors')
const path = require('path')                                                                                
const PORT = process.env .PORT||3000

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

// To serve static files
app.use('/',express.static(path.join(__dirname,'/public')))

// routes
app.use('/',require('./routes/root'))
app.use('/employees',require('./routes/api/employees'))


app.all(/^\/*/,(req,res)=>{
    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.status(404).json('Page not found.')
    }else{
        res.status(404).type('text').send('Page not found.')
    }
})

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}.`)
})