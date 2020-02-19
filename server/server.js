const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
  res.send({
    msg: 'Hello Node'
  })
})

app.post('/users', (req, res) => {
  console.log(req)
  res.send({
    code: 200,
    data: req.body
  })
})

app.listen(3000, () => console.log(`Server has been started on port 3000`))
