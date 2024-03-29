// nodemon src/app.js -e js,hbs
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//Path for partials
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'AL A'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'AL A'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    text: "You can get help here.",
    title: "Help",
    name: "AL A"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }
  
  const address = req.query.address

  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        address,
        location,
        forecast: forecastData
      })
    })
  })
})

// req contains URL queries
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  
  console.log(req.query.search)
  // you can't send a response twice - Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: "404",
    errorText: "Sorry, that article isn't here.",
    name: "AL A"
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: "404",
    errorText: "There's nothing. Just nothing.",
    name: "AL A"
  })
})

app.listen(port, () => {
  console.log('Server is up and running on port ' + port)
})