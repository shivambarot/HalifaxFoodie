const router = require('express').Router();
const FeedbackController = require('../controllers/feedback.controller');

router.post('/create', FeedbackController.create);
router.get('/getFeedback/:restaurantId', FeedbackController.getFeedbackByRestaurantId);
router.get('/feedbackAnalysis/:restaurantId', FeedbackController.analysis);

module.exports = router;