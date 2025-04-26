const express = require('express')
const {logger} = require('./middleware/logs')
const corsOptions = require('./config/cors')
const errorHandler = require('./middleware/errorHandler')
const app = express()
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')  
const verifyJWT = require('./middleware/verifyJWT')                                                                             
const PORT = process.env.PORT||3000

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// To serve static files
app.use('/',express.static(path.join(__dirname,'/public')))

// routes
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/api/register'))
app.use('/auth',require('./routes/api/login'))
app.use('/refresh',require('./routes/api/refresh'))
app.use('/logout',require('./routes/api/logout'))

app.use(verifyJWT)
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
    console.log(`Server is running at http://localhost:${PORT}`)
})