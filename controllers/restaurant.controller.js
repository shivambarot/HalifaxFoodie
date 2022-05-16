const Exception = require('../lib/exceptions');
const RestaurantModel = require('../model/restaurant.model');

class RestaurantController {
    static async saveDish(req, res) {
        try {
            const reqData = req.body;

            await RestaurantModel.saveDish(reqData);
            return res.sendResponse({
                success: true,
                message: 'Dish Item created!'
            });

        } catch (error) {
            console.error('Error in RestaurantController: saveDish', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getDishByRestaurant(req, res) {
        try {
            const reqData = req.params;

            const dishesData = await RestaurantModel.getDishByRestaurant(reqData.restaurantId);
            return res.sendResponse({
                success: true,
                message: 'Dishes retrieved!',
                data: dishesData
            });

        } catch (error) {
            console.error('Error in FeedbackController: getDishByRestaurant', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = RestaurantController;