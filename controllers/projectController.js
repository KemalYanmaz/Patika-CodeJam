const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      technologies: req.body.technologies,
      features: req.body.features,
      gitlink: req.body.gitlink,
      user: req.session.userID,
    });

    res.status(201).json({
      status: 'success',
      project,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndRemove({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      err,
    });
  }
};
