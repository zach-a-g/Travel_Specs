`use strict`;

const express = require('express');
const router = express.Router();
const ItineraryModel = require('../models/itineraryModel');
const DateModel = require('../models/dateModel');

router.get('/itinerary-form', async(req, res) => {
    const user_id = req.session.user_id;
    res.render('template', {
        locals: {
            title: 'Plan out your day!',
            user_id,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/itinerary-form'
        }
    })
});

router.get('/info', async(req, res) => {
    const user_id = req.session.user_id;
    const theItinerary = await ItineraryModel.getItinerary(user_id);
    console.log('THE ITINERARY: ', theItinerary);
    res.render('template', {
        locals: {
            title: 'Create your Itinerary!',
            user_id,
            data: theItinerary,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/info'
        }
    })
});

router.post('/add', async(req, res) => {
    const { title } = req.body;
    const user_id = req.session.user_id;
    const newItinerary = new ItineraryModel(null, title, user_id);
    const response = await newItinerary.addItinerary();
    console.log('CREATE RESPONSE IS: ', response);
    res.redirect('/itinerary-form');
});

module.exports = router;