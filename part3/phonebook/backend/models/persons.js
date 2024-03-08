require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String, 
    required: true,
    validate: {
      validator: function(number) {
        if (number.length < 8) {
          return false
        }
        const numberArray = number.split('-')
        if (numberArray.length != 2) {
          return false
        }
        if (numberArray[0].length > 3 || numberArray[0].length < 2) {
          return false
        }
        numberArray.forEach(num => {
          if (isNaN(Number(num))) {
            return false
          }
        })
        return true
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)