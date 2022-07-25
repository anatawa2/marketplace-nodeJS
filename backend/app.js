const cors = require('cors')
const express = require('express')
const categoryRoute = require('./routes/category')
const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const app = express()

app.use(express.json())
app.use(cors())
 
app.use(userRoute) 
app.use(productRoute) 
app.use(categoryRoute) 
 

app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})