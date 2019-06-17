console.log('Client side js file is loaded')
// querySelector grabs only first tag
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
let messageOne = document.querySelector('#message-1')
let messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading your weather data'
  const location = search.value
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        console.log(data)
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = 'Location: ' 
          + data.location
          messageTwo.textContent = 'Forecast: ' 
          + data.forecast
        }
      })
    })
  console.log(location)
})