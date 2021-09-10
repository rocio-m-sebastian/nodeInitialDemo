const mongoose = require('mongoose');
const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'anónimo'
  },
  password: String,
  success: {
    type: Number,
    default: 0
  },
  games: [
    {type: mongoose.Schema.Types.ObjectId,ref:'Game'}
  ]
});
mongoose.model('Player', PlayerSchema);
module.exports = mongoose.model('Player');