var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// This is similar to a Sequelize model
var ScoreSchema = new Schema({

  score: Number,

});

// This creates our model from the above schema, using mongoose's model method
var Score = mongoose.model("Score", ScoreSchema);

// Export the Note model
module.exports = Score;
