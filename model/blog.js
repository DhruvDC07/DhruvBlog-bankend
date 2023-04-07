let mongoose = require('mongoose');
let {Schema} = require('mongoose')

const blogSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });

  let blogModel = mongoose.model('Blog',blogSchema)
  module.exports ={
    blogModel
  }