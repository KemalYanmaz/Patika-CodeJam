const router = require('express').Router();
const blogpostController = require('../controllers/blogpostController');


//localhost:3000/blogposts

router.route('/').post(blogpostController.createBlog);
router.route('/:id').delete(blogpostController.deletePost);

module.exports = router;