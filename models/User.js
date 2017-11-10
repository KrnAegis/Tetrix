var mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
mongoose.promise = Promise
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  password: {
    type: String,
    required: false
  },
  user: {
      type: String,
      required: true
  },
  score: {
    type: Schema.Types.ObjectId,
    ref: "Score"
  },
  nickname: {
    type: String,
    required: true
  }
});

// Define schema methods
UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}

// Define hooks for pre-saving
UserSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('=======NO PASSWORD PROVIDED=======')
    next()
  } else {
    this.password = this.hashPassword(this.password)
    next()
  }
  // this.password = this.hashPassword(this.password)
  // next()
})

var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
