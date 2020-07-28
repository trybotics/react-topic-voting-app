const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const http = require('http')
const moment = require('moment')

app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false })) 
app.use(express.static(path.join(__dirname, 'build')))

// Server Connection
const port = process.env.PORT || '8080'
app.set('port', port)
const server = http.createServer(app)
console.log('NODE TIME ===> ' + moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
server.listen(port, () => console.log(`API running on localhost:${port}`))

// DataBase Connection
var mongoose = require('mongoose')
// Production DB
mongoose.connect("mongodb://root:root12345@ds261377.mlab.com:61377/topic-voting")

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () { console.log("we are connected!") })

// API Router
var API = require('./backend-src/router')
app.use('/api', API)

app.get('/*', function (req, res) {
  res.header('Content-Type', 'text/html')
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})