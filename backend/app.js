const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http');
const chatRoute = require('./routes/chat')
const usersRoute = require('./routes/users')
const productsRoute = require('./routes/products')
const categoryRoute = require('./routes/category')
//
const server = http.createServer(app);
exports.server = server
const { useSocket } = require('./chat')
useSocket()
//
app.use(cors())
app.use(express.json())
app.use(chatRoute)
app.use(usersRoute)
app.use(productsRoute)
app.use(categoryRoute)

server.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})