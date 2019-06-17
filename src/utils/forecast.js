request = require('request')

const forecast = (latitude, longitude, callback) => {

  const url = 'https://api.darksky.net/forecast/fe2b80a3eb4b22be7ab2216d21cccf11/' + latitude + ',' + longitude

  request({
    url, 
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to reach weather services.', undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    } else {
      callback(undefined, body.currently.summary)
    }
  })
}

module.exports = forecast

// const url = 'https://api.darksky.net/forecast/fe2b80a3eb4b22be7ab2216d21cccf11/37.8267,-122.4233'

// request({ url: url, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to weather service')
//   } else if (response.body.error) {
//     console.log(response.body.error)
//   } else {
//     const data = response.body 
//     console.log(data.currently.summary)
//   }
// })

