const router = require('express').Router();
const OrderController = require('../controllers/order.controller');

router.post('/placeorder', OrderController.placeOrder);
router.get('/getOrdersByRestaurantId/:restaurantId', OrderController.getOrdersByRestaurantId);
router.get('/getOrdersByUserId/:userId', OrderController.getOrdersByUserId);
router.get('/getOrderByOrderId/:orderId', OrderController.getOrderByOrderId);
router.put('/updateOrderStatus/:orderId', OrderController.updateOrderStatus);

module.exports = router;