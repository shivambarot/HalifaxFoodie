const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.register);
router.get('/getUserData/:userId', UserController.getUserData);
router.post('/verifySecurityQuestions', UserController.verifySecurityQuestions);
router.get('/logout/:userId', UserController.logout);

module.exports = router;