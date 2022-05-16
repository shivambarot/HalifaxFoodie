const Exception = require('../lib/exceptions');
const RecipeModel = require('../model/recipe.model');
const Utils = require('../lib/Utils');

const conn = require('../config/conn.json')
const AWS = require('aws-sdk');
AWS.config.update(conn);
const s3 = new AWS.S3();

class RecipeController {
    static async getRecipeByRestaurant(req, res) {
        try {
            const reqData = req.params;
            console.log(reqData)

            const recipesData = await RecipeModel.getRecipeByRestaurantId(reqData.restCode);
            return res.sendResponse({
                success: true,
                message: 'Recipes retrieved!',
                data: recipesData
            });

        } catch (error) {
            console.error('Error in RecipeController: getRecipeByRestaurant', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async uploadRecipe(req, res){
        try {
            const reqData = req.body;

            const buf = Buffer.from(JSON.stringify(reqData));

            const config = {
                Bucket: 'recipe-checker',
                Key: await Utils.generateId(5)+".json",
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'application/json',
                ACL: 'public-read'
            };

            s3.upload(config, function (err, data) {
                if (err) {
                    console.log(err);
                    console.log('Error uploading data: ', data);
                } else {
                    console.log('succesfully uploaded!!!');
                    return res.sendResponse({
                        success: true,
                        message: 'Recipe uploaded!'
                    });
                }
            });


        } catch (error) {
            console.error('Error in RecipeController: uploadRecipe', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async saveRecipe(req, res) {
        try {
            const reqData = req.body;

            await RecipeModel.saveRecipe(reqData);
            return res.sendResponse({
                success: true,
                message: 'Recipe saved!'
            });

        } catch (error) {
            console.error('Error in RecipeController: saveRecipe', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = RecipeController;