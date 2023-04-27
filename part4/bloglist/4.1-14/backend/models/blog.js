const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true
  },
  author: String,
  url: {
    type: String,
    minlength: 4,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)