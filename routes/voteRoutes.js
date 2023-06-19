const express = require('express');

const router = express.Router();
const voteController = require('../controllers/voteController');


router.post('/', voteController.vote);

module.exports = router;
