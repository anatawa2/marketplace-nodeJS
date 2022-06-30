const express = require('express')
const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const tagRoute = require('./routes/tags')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
 
app.use(userRoute) 
app.use(productRoute) 
app.use(tagRoute) 
 

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})