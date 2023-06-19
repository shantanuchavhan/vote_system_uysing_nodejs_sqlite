const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/signup', userController.getSignupPage);
router.post('/signup', userController.signup);
router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/home', userController.getHomePage);

module.exports = router;
