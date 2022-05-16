const db = require('../lib/db-connection');
const Utils = require('../lib/Utils');

class RestaurantModel{
    static async saveDish(dishData) {
        return new Promise(async (resolve, reject) => {
            try {
                dishData.id = await Utils.generateId(8);
                const params = {
                    TableName: "dishItem",
                    Item: dishData
                };
                db.put(params, function(err, data) {
                    if (err) {
                        console.error('Error in Restaurant model: saveDish', err);
                        reject();
                    } else {
                        console.log("Added dish item:", JSON.stringify(data));
                        resolve();
                    }
                });

            } catch (error) {
                console.error('Error in Restaurant model: saveDish', error);
                reject();
            }
        });
    }

    static async getDishByRestaurant(restaurantId) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "dishItem",
                    FilterExpression: "#restaurantId = :restaurantId_val",
                    ExpressionAttributeNames: {
                        "#restaurantId": "restaurantId",
                    },
                    ExpressionAttributeValues: { ":restaurantId_val": restaurantId }
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in restaurant model: getDishByRestaurant', err);
                        reject();
                    } else {
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in restaurant model: getDishByRestaurant', error);
                reject();
            }
        });
    }
}
module.exports = RestaurantModel;