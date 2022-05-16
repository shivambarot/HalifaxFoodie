const projectId = 'serverlessproject-320719';
const location = 'us-central1';
const modelId = 'TCN4971716702896128000';

// Imports the Google Cloud AutoML library
const { PredictionServiceClient } = require('@google-cloud/automl').v1;
const client = new PredictionServiceClient();

async function predict(content) {
    return new Promise(async (resolve, reject) => {
        console.log("predict")
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                textSnippet: {
                    content: content,
                    mimeType: 'text/plain',
                },
            },
        };

        console.log("call predict")
        const [response] = await client.predict(request);

        console.log("resolve")
        resolve(response.payload)

    })
}

exports.helloWorld = async (req, res) => {
    console.log("invoked")
    let message = req.body.message;

    const response = await predict(message);
    console.log("send response")
    res.status(200).send(response);
};
