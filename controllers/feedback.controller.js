const {
    ComprehendClient,
    DetectSentimentCommand,
} = require("@aws-sdk/client-comprehend");
const Exception = require('../lib/exceptions');
const FeedbackModel = require('../model/feedback.model');
const conn = require('../config/conn.json')

const client = new ComprehendClient(
    {
        region: "us-east-1",
        credentials: conn
    }
);

const { google } = require("googleapis");

class FeedbackController {
    static async create(req, res) {
        try {
            const reqData = req.body;

            await FeedbackModel.create(reqData);

            let extractedEntities = [];
            console.log(reqData.feedback)
            let entities = reqData.feedback.match(/(\b[A-Z][A-Z]+)/g);

            for (let j = 0; j < entities.length; j++) {
                extractedEntities.push(entities[j]);
            }

            const auth = new google.auth.GoogleAuth({
                keyFile: "./config/credentials.json",
                scopes: "https://www.googleapis.com/auth/spreadsheets",
            });
            const gClient = auth.getClient();
            const googleSheets = google.sheets({ version: "v4", auth: gClient });
            const spreadsheetId = "1-MLiLDWZWPNyeR1rPv9JLvMmmo4a_zCaa-kbfuqhx38";

            const googleSheetCall = async (entity) => {
                await googleSheets.spreadsheets.values.append({
                    auth,
                    spreadsheetId,
                    range: "Sheet1!A:Z",
                    valueInputOption: "USER_ENTERED",
                    resource: {
                        values: [[entity]]
                    },
                });
            }

            let functionCalls = [];
            for (let i = 0; i < extractedEntities.length; i++) {
                functionCalls.push(googleSheetCall(extractedEntities[i]));
            }
            await Promise.all(functionCalls);

            return res.sendResponse({
                success: true,
                message: 'Feedback created!'
            });

        } catch (error) {
            console.error('Error in FeedbackController: create', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getFeedbackByRestaurantId(req, res) {
        try {
            const reqData = req.params;

            const feedbackInfo = await FeedbackModel.getFeedbackByRestaurantId(reqData.restaurantId);
            return res.sendResponse({
                success: true,
                message: 'Feedback retrieved!',
                data: feedbackInfo
            });

        } catch (error) {
            console.error('Error in FeedbackController: getFeedbackByRestaurantId', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async analysis(req, res) {
        try {
            const reqData = req.params;
            const feedbackInfo = await FeedbackModel.getFeedbackByRestaurantId(reqData.restaurantId);

            let parsedJsonFeedback = [];

            for (let i = 0; i < feedbackInfo.length; i++) {

                const command = new DetectSentimentCommand({
                    LanguageCode: "en",
                    Text: feedbackInfo[i].feedback,
                });
                const response = await client.send(command);
                let temp = {};
                temp.feedback = feedbackInfo[i].feedback;
                temp.rating = feedbackInfo[i].rating;
                const sentiment = response.Sentiment;
                temp = { ...temp, sentiment };

                parsedJsonFeedback.push(temp);
            }

            console.log(parsedJsonFeedback);

            return res.sendResponse({
                success: true,
                message: 'Feedback Analysis retrieved',
                data: parsedJsonFeedback
            });

        } catch (error) {
            console.error('Error in Feedback controlller', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = FeedbackController;