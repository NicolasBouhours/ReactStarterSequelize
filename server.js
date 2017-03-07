const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const join = require('join')

const { WEB_PORT, ENV } = require('./config/const')

const app = express()

app.use(compression())

// Static file middleware
app.use('/static', express.static(__dirname + '/public'))

// Desactivate log if test environment
if (ENV !== 'test') app.use(morgan())

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${ENV}.`)
})
