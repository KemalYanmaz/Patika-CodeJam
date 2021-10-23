const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  technologies: [
    {
      type: String,
    },
  ],
  features: {
    type: String,
    required: true,
  },
  gitlink: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
