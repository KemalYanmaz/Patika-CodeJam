const User = require('../models/User');

module.exports = (req, res, next) => {
  const myUser = User.findById(req.session.userID, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ status: 'fail' });
    } else if (!myUser.role === 'admin') {
      return res.status(400).json({ status: 'fail' });
    }
    next();
  });
};
