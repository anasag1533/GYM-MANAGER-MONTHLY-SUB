const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({

  fileName: {
    type: String,
    required: true
  },
  dateUploaded:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);