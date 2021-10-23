const User = require('../models/User');

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

exports.getUsers = async(req,res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      users
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}
