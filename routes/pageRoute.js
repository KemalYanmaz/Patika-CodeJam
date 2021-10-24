const router = require('express').Router();
const pageController = require('../controllers/pageController');


//localhost:3000/

router.route('/').get(pageController.getUsers);
router.route('/:slug').get(pageController.getOneUser);
router.route('/projects/:slug').get(pageController.getUserProjects)
router.route('/posts/:slug').get(pageController.getUserPosts);

module.exports = router;