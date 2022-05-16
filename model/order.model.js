const db = require('../lib/db-connection');
const Utils = require('../lib/Utils');

class OrderModel{
    static async placeOrder(orderData) {
        return new Promise(async (resolve, reject) => {
            try {
                orderData.orderId = await Utils.generateId(8);
                const params = {
                    TableName: "orders",
                    Item: orderData
                };
                db.put(params, function(err, data) {
                    if (err) {
                        console.log('Error in order model: placeOrder: ', err);
                        reject();
                    } else {
                        resolve(orderData.orderId);
                    }
                });

            } catch (error) {
                console.log('Error in order model: placeOrder: ', error);
                reject();
            }
        });
    }

    static async getOrdersByRestaurantId(restaurantId) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "orders",
                    FilterExpression: "#restaurantId = :restaurantId_val",
                    ExpressionAttributeNames: {
                        "#restaurantId": "restaurantId",
                    },
                    ExpressionAttributeValues: { ":restaurantId_val": restaurantId }
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in order model: getOrdersByRestaurantId', err);
                        reject();
                    } else {
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in order model: getOrdersByRestaurantId', error);
                reject();
            }
        });
    }

    static async getOrdersByUserId(userId) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "orders",
                    FilterExpression: "#userId = :userId_val",
                    ExpressionAttributeNames: {
                        "#userId": "userId",
                    },
                    ExpressionAttributeValues: { ":userId_val": userId }
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in order model: getOrdersByUserId', err);
                        reject();
                    } else {
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in order model: getOrdersByUserId', error);
                reject();
            }
        });
    }

    static async getOrderByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "orders",
                    Key: {
                        orderId
                    }
                };
                db.get(params, function(err, data) {
                    if (err) {
                        console.error('Error in order model: getOrderByOrderId', err);
                        reject();
                    } else {
                        resolve(data["Item"]);
                    }
                });

            } catch (error) {
                console.error('Error in order model: getOrderByOrderId', error);
                reject();
            }
        });
    }

    static async updateOrderStatus(orderId,status) {
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "orders",
                    Key: {
                        orderId
                    },
                    UpdateExpression: "set orderStatus = :orderStatus",
                    ExpressionAttributeValues:{
                        ":orderStatus":status
                    },
                    ReturnValues:"UPDATED_NEW"
                };
                db.update(params, function(err, data) {
                    if (err) {
                        console.error('Error in order model: updateOrderStatus', err);
                        reject();
                    } else {
                        resolve();
                    }
                });

            } catch (error) {
                console.error('Error in order model: updateOrderStatus', error);
                reject();
            }
        });
    }
}
module.exports = OrderModel;