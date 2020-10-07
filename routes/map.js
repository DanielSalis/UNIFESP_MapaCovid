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

router.get('/get/casesByState', async (request, response) => {
    try {
        const { id } = request.query

        let query = ``;
        let result = null;

        query = `SELECT c.codigo_ibge, latitude, longitude, m.nome, SUM(novos) as casos, SUM(obitos_novos) as obitos
                 FROM public.casos c
                 INNER JOIN public.municipios m ON m.codigo_ibge = c.codigo_ibge
                 WHERE codigo_uf = ${id} 
                 GROUP BY c.codigo_ibge, latitude, longitude, nome
                 HAVING SUM(novos) > 0
        `;

        result = await db.query(query);
        const cases = result.rows.map(item => {
            return item;
        })

        response.status(200).json(cases);

    } catch (e) {
        response.status(500).send(`Server Error -> ${e}`);
    }
});

router.get('/get/casesByCity', async (request, response) => {
    try {
        const { id } = request.query

        let query = ``;
        let result = null;

        query = `SELECT SUM(novos) as casos, SUM(obitos_novos) as obitos
                 FROM public.casos c
                 WHERE codigo_ibge = ${id}
                 GROUP BY codigo_ibge
        `;

        result = await db.query(query);
        const cases = result.rows.map(item => {
            return item;
        })

        response.status(200).json(cases);

    } catch (e) {
        response.status(500).send(`Server Error -> ${e}`);
    }
});


router.get('/get/casesByDate', async (request, response) => {
    try {
        const { codIbge } = request.query

        let query = ``;
        let result = null;

        query = `SELECT to_char(data, 'mm-dd-YYYY') as dt_caso, SUM(novos) as casos, SUM(obitos_novos) as obitos
                 FROM public.casos c 
                 WHERE codigo_ibge = ${codIbge}
                 GROUP BY codigo_ibge, dt_caso
                 ORDER BY dt_caso asc
        `;

        result = await db.query(query);
        const cases = result.rows.map(item => {
            return item;
        })

        response.status(200).json(cases);

    } catch (e) {
        response.status(500).send(`Server Error -> ${e}`);
    }
});

module.exports = router;