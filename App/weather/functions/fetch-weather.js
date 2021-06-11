'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const resultNumber = process.env.RESULT_NUMBER || 8;
const tableName = process.env.weather_table;

const fetchWeather = number => {
  const req = {
    TableName: tableName,
    Limit: number,
  };
  return dynamodb.scan(req).promise();
};

module.exports.handler = async (event, context, callback) => {
  const result = await fetchWeather(resultNumber);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result),
  });
};