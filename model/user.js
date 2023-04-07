let mongoose = require('mongoose');
let {Schema} = require('mongoose');

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  blogs:[{type: mongoose.Types.ObjectId,
           ref: "Blog",
        require:true}]
  
});
let userModel = mongoose.model('User',userSchema)
module.exports ={
    userModel
}
