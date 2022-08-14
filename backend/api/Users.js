const express = require('express');
const router = express.Router();
const Jwt = require('jsonwebtoken');
const jwtKey = process.env.jwtKey;
const User = require('../db/User');
const cors = require('cors');
router.use(express.json());
router.use(cors());

router.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    if (result) {
        resp.status(200).send(result);
    } else {
        resp.status(404).send({ result: 'No result found.' });
    }
});

router.post('/login', async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    resp.status(401).send({ result: 'Invalid request.' });
                }
                resp.status(200).send({ user, auth: token });
            });
        } else {
            resp.status(401).send({ result: "No user found." });
        }

    } else {
        resp.status(401).send({ result: "No user found." });
    }
});

module.exports = router;