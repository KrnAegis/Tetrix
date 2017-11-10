var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// This is similar to a Sequelize model
var NicknameSchema = new Schema({
  nickname: {
      type: String,
      required: true
  }
});


// This creates our model from the above schema, using mongoose's model method
var Nickname = mongoose.model("Nickname", NicknameSchema);

// Export the Note model
module.exports = Nickname;
