const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const createUser = async (req, res = response) => {
    try {
        const user = new User(req.body);

        await user.save();

        res.status(200).json({
            ok: true,
            msg: 'login'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
}

const login = (req, res = response) => {
    const { email, password } = req.body;

    res.status(200).json({
        ok: true,
        msg: 'login'
    });
}

const tokenValid = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'token Valid'
    });
}

module.exports = {
    createUser,
    login,
    tokenValid
}