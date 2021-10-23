const router = require('express').Router();
const userController = require('../controllers/userController');


//localhost:3000/users

router.route('/').post(userController.singUpUser);
router.route('/').get(userController.getUsers);

module.exports = router;

