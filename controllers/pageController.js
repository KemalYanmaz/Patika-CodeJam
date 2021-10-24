const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();    
    res.status(200).render('index', {
      users
    })

    // res.status(200).json({status: 'successs', users})

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ slug: req.params.slug });
    const users = await User.find();
                
    // res.status(200).json({
    //   status: 'success',
    //   user,
    // });

    res.status(200).render('personal', {
      user,
      users
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};


exports.getUserProjects = async (req,res) => {
  try {
    
    const users = await User.find();
    const user = await User.findOne({slug: req.params.slug})

    res.status(200).render('personalProject',{
      user,
      users
    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

exports.getUserPosts = async (req,res) => {
  try {
    
    const users = await User.find();
    const user = await User.findOne({slug: req.params.slug})

    res.status(200).render('personalPost',{
      user,
      users
    })

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}