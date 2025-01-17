const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidate } = require('../middlewares/jwt-validate');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validate');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(jwtValidate);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title is empty').not().isEmpty(),
        check('start', 'Date is required').custom(isDate),
        check('end', 'Date is required').custom(isDate),
        fieldsValidate
    ],
    createEvent);

router.put('/:id',
    [
        check('title', 'Title is empty').not().isEmpty(),
        check('start', 'Date is required').custom(isDate),
        check('end', 'Date is required').custom(isDate),
        fieldsValidate
    ],
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router