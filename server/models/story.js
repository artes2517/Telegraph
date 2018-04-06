const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idvalidator = require('mongoose-id-validator');

const StorySchema = new Schema({
  title: {
    type: String,
    required: [true]
  },
  author: {
    type: String,
    required: [true]
  },
  discription: {
    type: String,
    required: [true]
  },
  dateTime: {
    type: Date,
    default: Date.now(),
    required: [true]
  },
  link: {
    type: String,
    required: [true]
  }
});

StorySchema.plugin(idvalidator);

const Story = mongoose.model('story', StorySchema);

module.exports = Story;