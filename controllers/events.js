const { response } = require('express');
const Event = require('../models/events')

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid
        const saveEvent = await event.save();

        res.json({
            ok: true,
            event: saveEvent
        });
    } catch (error) {
        console.log(error);

        res.status(500).json(
            {
                ok: false,
                msg: 'Server error'
            }
        );
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized request'
            });
        }

        const newEvent = { ...req.body, user: uid }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent);

        res.json({
            ok: true,
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req



    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: "Event doesn't exist"
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized request'
            });
        }

        const newEvent = { ...req.body, user: uid }

        const eventDeleted = await Event.findByIdAndDelete(eventId, newEvent);

        res.json({
            ok: true,
            msg: 'Event deleted'
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}