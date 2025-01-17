const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validate');
const { jwtValidate } = require('../middlewares/jwt-validate');

const router = Router();

const { createUser, login, tokenValid } = require('../controllers/auth');

router.post('/new', [
    check('name', 'Name is required.').isLength({ min: 3 }),
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required.').isLength({ min: 6 }),
    fieldsValidate
], createUser);

router.post('/', [
    check('email', 'Email is required.').isEmail(),
    check('password', 'Password is required.').not().isEmpty(),
    fieldsValidate
], login);

router.get('/renew', jwtValidate, tokenValid);

module.exports = router;