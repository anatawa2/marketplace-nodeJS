const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
exports.server = server

app.use(cors())
app.use(express.json())

const userRoute = require('./routes/users')
const productRoute = require('./routes/products')
const categoryRoute = require('./routes/category')
const chatRoute = require('./routes/chat')
const { useSocket } = require('./controllers/chat')
app.use(userRoute)
app.use(chatRoute)
app.use(productRoute)
app.use(categoryRoute)
useSocket()


server.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
})