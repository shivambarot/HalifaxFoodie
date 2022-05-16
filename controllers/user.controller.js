const Exception = require('../lib/exceptions');
const UserModel = require('../model/user.model');
const { google } = require("googleapis");

class UsersController {
    static async register(req, res) {
        try {
            const reqData = req.body;

            await UserModel.register(reqData);
            return res.sendResponse({
                success: true,
                message: 'User created!'
            });

        } catch (error) {
            console.error('Error in UserController: register', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getUserData(req, res) {
        try {
            const reqData = req.params;

            const userInfo = await UserModel.getUserData(reqData);
            console.log(userInfo)
            return res.sendResponse({
                success: true,
                message: 'User updated',
                data: userInfo
            });

        } catch (error) {
            console.error('Error in UserController: getUserData', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async verifySecurityQuestions(req, res) {
        try {
            const {userId, q1, q2} = req.body;

            const userInfo = await UserModel.getUserData({userId});

            if(q1!==userInfo.q1 || q2!==userInfo.q2){
                return res.sendError(new Exception('Unauthorized','Invalid Answers!'));
            }
            const auth = new google.auth.GoogleAuth({
                keyFile: "./config/credentials.json",
                scopes: "https://www.googleapis.com/auth/spreadsheets",
            });

            const gClient = auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: gClient });
            const spreadsheetId = "1byNJFXmsxDBTusI7cXpP0M8-FP9Q8oO1EhL8Y4bETS8";
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A:Z",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [[userId,1]]
                },
            });
            return res.sendResponse({
                success: true,
                message: 'User authorized!'
            });

        } catch (error) {
            console.error('Error in UserController: verifySecurityQuestions', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async logout(req, res) {
        try {
            const {userId} = req.params;

            const auth = new google.auth.GoogleAuth({
                keyFile: "./config/credentials.json",
                scopes: "https://www.googleapis.com/auth/spreadsheets",
            });

            const gClient = auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: gClient });
            const spreadsheetId = "1byNJFXmsxDBTusI7cXpP0M8-FP9Q8oO1EhL8Y4bETS8";
            await googleSheets.spreadsheets.values.append({
                auth,
                spreadsheetId,
                range: "Sheet1!A:Z",
                valueInputOption: "USER_ENTERED",
                resource: {
                    values: [[userId,-1]]
                },
            });
            return res.sendResponse({
                success: true,
                message: 'Logout Successful!'
            });

        } catch (error) {
            console.error('Error in UserController: register', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = UsersController;