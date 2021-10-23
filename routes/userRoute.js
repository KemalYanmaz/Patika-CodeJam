const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


//localhost:3000/users

router.route('/signup').post(authController.singUpUser);
router.route('/signin').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/dashboard/:id').put(authController.updateUserProfile);
router.route('/picture/:id').put(authController.addUserPicture);


module.exports = router;

