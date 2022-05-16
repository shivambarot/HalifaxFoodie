const db = require('../lib/db-connection');
const Utils = require('../lib/Utils');

class RecipeModel{

    static async getRecipeByRestaurantId(restCode) {
        console.log(restCode)
        return new Promise((resolve, reject) => {
            try {
                const params = {
                    TableName: "recipes",
                    FilterExpression: "#restCode = :restCode_val",
                    ExpressionAttributeNames: {
                        "#restCode": "restCode",
                    },
                    ExpressionAttributeValues: { ":restCode_val": restCode }
                };
                db.scan(params, function(err, data) {
                    if (err) {
                        console.error('Error in recipe model: getRecipeByRestaurantId', err);
                        reject();
                    } else {
                        console.log(data["Items"])
                        resolve(data["Items"]);
                    }
                });

            } catch (error) {
                console.error('Error in recipe model: getRecipeByRestaurantId', error);
                reject();
            }
        });
    }

    static async saveRecipe(recipeData) {
        return new Promise(async (resolve, reject) => {
            try {
                recipeData.recipeCode = await Utils.generateId(8);
                const params = {
                    TableName: "recipes",
                    Item: recipeData
                };
                db.put(params, function(err, data) {
                    if (err) {
                        console.error('Error in Recipe model: saveRecipe', err);
                        reject();
                    } else {
                        console.log("Added recipe item:", JSON.stringify(data));
                        resolve();
                    }
                });

            } catch (error) {
                console.error('Error in Recipe model: saveRecipe', error);
                reject();
            }
        });
    }
}
module.exports = RecipeModel;