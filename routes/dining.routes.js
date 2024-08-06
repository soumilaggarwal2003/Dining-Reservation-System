const express = require('express');
const router = express.Router();
const diningController = require('../controllers/dining.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// Define routes here
router.post('/create', [verifyToken, isAdmin], diningController.createDiningPlace);
router.get('/search', diningController.searchDiningPlaces);
router.get('/availability', diningController.getDiningPlaceAvailability);
router.post('/book', verifyToken, diningController.bookDiningPlace);

module.exports = router;
