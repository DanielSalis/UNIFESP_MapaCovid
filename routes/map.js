const express = require('express');
//Momment servirá para funcionalidades que dependam de datas
//let moment = require('moment');
const router = express.Router();
const db = require('../config/db');

// @route    POST api/map/hello
// @desc     Say Hello from API
// @access   Public
router.get('/hello', async (request, response) => {
    response.json({ Response: "Hello from api" });
});

module.exports = router;