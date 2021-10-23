const Blogpost = require('../models/Blogpost');

exports.createBlog = async (req, res) => {
  try {
    const post = await Blogpost.create({
      name: req.body.name,
      content: req.body.content,
      postlink: req.body.postlink,
      subject: req.body.subject,
      user: req.session.userID,
    });

    res.status(201).json({
      status: 'success',
      post,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Blogpost.findOneAndRemove({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getPost = async (req,res) => {
  try {
    await Blogpost.find({user: req.params.id})

    res.status(200).json({
      status: 'success',
    })
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}