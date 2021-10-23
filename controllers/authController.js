const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');

exports.singUpUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, success) => {
          if (success) {
            req.session.userID = user._id;
            res.status(200).json({
              status: 'success',
              user
            })
          } else {            
            res.status(400).send('Passord is not correct')
          }
        });
      } else {        
        res.status(400).send('User is not exist')
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logOutUser = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 'success',
    });
  });
};

exports.getDashboardPage = async (req,res) => {
  try {
    const user = await User.findOne({_id: req.session.userID}).populate('project').populate('blogpost');
    res.status(200).json({
      status: 'success',
      user
    })    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.updateUserProfile = async (req,res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    user.education = req.body.education,
    user.languages = req.body.languages,
    user.specialties = req.body.specialties,
    user.portfolio = req.body.portfolio,
    user.blogpost = req.body.blogpost
    user.save();

    res.status(200).json({
      status: 'success',
      user
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.addUserPicture = async (req, res) => {
  try {
    
    const user = await User.findById({_id: req.params.id})

    const myUserId = user._id;

    const uploadDir = 'public/uploads';
    let myRandom = (Math.random() + 1).toString(36).substring(7);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let profilePhoto = req.files.image;
    let uploadPath =
      __dirname + '/../public/uploads/' + myRandom + profilePhoto.name;

    profilePhoto.mv(uploadPath, async () => {
      await User.findByIdAndUpdate(myUserId,{        
        ...req.body,
        image: '/uploads/' + myRandom + profilePhoto.name,
      });      
      res.status(200).json({
        status: 'success'
      })
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
};

