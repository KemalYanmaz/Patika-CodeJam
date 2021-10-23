const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogpostSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postlink: {
    type: String,
  },
  subject: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Blogpost = mongoose.model('Blogpost', BlogpostSchema);
module.exports = Blogpost;
