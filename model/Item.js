const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  description: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },

  due_date:{
    type: Date
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
