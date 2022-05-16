const db = require('../lib/db-connection');
const Utils = require('../lib/Utils');

class FeedbackModel{
    static async create(feedbackData) {
        return new Promise(async(resolve, reject) => {
            try {
                feedbackData.feedbackId = await Utils.generateId(8);
                const params = {
                    TableName: "feedback",
                    Item: feedbackData
                };
                db.put(params, function(err, data) {
                    if (err) {
                        console.log('Error in feedback model: create feedback: ', err)
                        reject();
                    } else {
                        console.log("Added Feedback:", JSON.stringify(data));
                        resolve();
                    }
                });

            } catch (error) {
                console.error('Error in feedback model: create feedback', error);
                reject();
            }
        });
    }

    static async getFeedbackByRestaurantId(restaurantId) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "feedback",
                    FilterExpression: "#restaurantId = :restaurantId_val",
                    ExpressionAttributeNames: {
                        "#restaurantId": "restCode",
                    },
                    ExpressionAttributeValues: { ":restaurantId_val": parseInt(restaurantId) }
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in feedback model: getFeedbackByRestaurantId', err);
                        reject();
                    } else {
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in feedback model: getFeedbackByRestaurantId', error);
                reject();
            }
        });
    }

    static async getAllFeedbacks() {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "feedback"
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in feedback model: getAllFeedbacks', err);
                        reject();
                    } else {
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in feedback model: getAllFeedbacks', error);
                reject();
            }
        });
    }
}
module.exports = FeedbackModel;