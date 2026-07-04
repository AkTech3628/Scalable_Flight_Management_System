const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flight.controller');

const auth=require('../middlewares/auth.middleware')
const admin=require('../middlewares/admin.middleware')


router.get('/', auth,flightController.getFlights);
router.get('/:id',auth, flightController.getFlight);
router.post('/',auth,admin, flightController.addFlight);
router.post('/sync',auth,admin, flightController.syncFlights);

module.exports = router;

