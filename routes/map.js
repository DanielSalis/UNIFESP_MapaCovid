const express = require('express');
//Momment servirá para funcionalidades que dependam de datas
//let moment = require('moment');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const db = require('../config/db');

// @route    POST api/map/hello
// @desc     Say Hello from API
// @access   Public
router.get('/hello', async (request, response) => {
    response.json({ Response: "Hello from api" });
});

// @route    POST api/map/get/states
// @desc     Get All states from api
// @access   Public
router.get('/get/states', async (request, response) => {
    try {
        let query = ``;
        let result = null;

        query = `SELECT * from public.estados`;
        result = await db.query(query);

        const States = await result.rows.map(item => {
            const state = item;
            return state;
        })

        response.status(200).json(States);

    } catch (e) {
        response.status(500).send(`Server Error ${e.status}`);
    }
});

// @route    POST api/map/get/cities
// @desc     Get Cities By State
// @access   Public
router.get('/get/cities', async (request, response) => {
    try {
        const { state } = request.query

        let query = ``;
        let result = null;

        query = `SELECT distinct m.codigo_ibge, m.nome, m.latitude, m.longitude, m.capital, m.codigo_uf from public.municipios m
                 INNER JOIN public.estados e
                 ON e.codigo_uf = m.codigo_uf
                 WHERE e.nome ilike '${state}'
        `;
        result = await db.query(query);

        const Cities = await result.rows.map(item => {
            const city = item;
            return city;
        })

        response.status(200).json(Cities);

    } catch (e) {
        response.status(500).send(`Server Error -> ${e}`);
    }
});

module.exports = router;