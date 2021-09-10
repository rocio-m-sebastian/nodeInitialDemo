const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
  dice1: {
    type: Number,
    required: true
  },
  dice2: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  player: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Player'
  }
});
mongoose.model('Game', GameSchema);
module.exports = mongoose.model('Game');