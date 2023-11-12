const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const imageSchema = new Schema({
  title: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = model('Image', imageSchema);
