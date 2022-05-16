const router = require('express').Router();
const RestaurantController = require('../controllers/restaurant.controller');

router.post('/saveDish', RestaurantController.saveDish);
router.get('/getDishByRestaurant/:restaurantId', RestaurantController.getDishByRestaurant);

module.exports = router;