const {spieler, check, matchedData, sanitize} = require('spieler')();

const router      = require('express').Router({ mergeParams: true });
const actions     = require('./actions');

const log = require("metalogger")();

// const addUserValidator = spieler([
//   check("email").exists().withMessage('email must be provided')
//   .isEmail().withMessage('email format is invalid')
//   .trim().normalizeEmail(),

//   check('password', 'passwords must be at least 5 chars long and contain one number')
//   .exists()
//   .isLength({ min: 5 })
//   .matches(/\d/)
// ]);

// router.get('/', actions.getUsers);
// router.post('/', addUserValidator, actions.addUser);

const flightNoValidation = check('flight_no',
 'flight_no must be at least 3 chars long and contain letters and numbers')
 .exists()
 .isLength({ min: 3 })
 .matches(/[a-zA-Z]{1,4}\d+/);

 const dateTimeValidation = check('departure_date_time',
 'departure_date_time must be in YYYY-MM-ddThh:mm format')
 .exists()
 .matches(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);

 const flightsValidator = spieler([
  flightNoValidation,
  dateTimeValidation
 ]);
 const seatmapsValidator = spieler([
  flightNoValidation
 ]);
 
 router.get('/', flightsValidator, actions.getFlightInfo);
 router.get('/:flight_no/seat_map', seatmapsValidator, actions.getSeatMap);
 
module.exports = router;
