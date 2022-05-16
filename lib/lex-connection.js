const AWS = require("aws-sdk");
const conn = require('../config/conn.json')
AWS.config.update(conn);

const lexClient = new AWS.LexRuntime();

module.exports = lexClient;
