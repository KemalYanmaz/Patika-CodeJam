const router = require('express').Router();
const projectController = require('../controllers/projectController');


//localhost:3000/project

router.route('/').post(projectController.createProject);
router.route('/:id').delete(projectController.deleteProject);

module.exports = router;