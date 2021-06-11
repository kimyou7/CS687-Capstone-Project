'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.weather_table;
const resultNumber = process.env.RESULT_NUMBER || 8;

const fetchWeatherByName = (name, number) => {
  const req = {
    TableName: tableName,
    Limit: number,
    FilterExpression: 'contains(names, :name)',
    ExpressionAttributeValues: { ':name': name },
  };
  return dynamodb.scan(req).promise();
};

module.exports.handler = async (event, context, callback) => {
  const { name } = JSON.parse(event.body);
  const weather = await fetchWeatherByName(name, resultNumber);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(weather),
  });
};