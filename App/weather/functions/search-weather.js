'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.weather_table;
const resultNumber = process.env.RESULT_NUMBER || 8;

const fetchWeatherByCity = (city, number) => {
  const req = {
    TableName: tableName,
    Limit: number,
    FilterExpression: 'contains(cities, :city)',
    ExpressionAttributeValues: { ':city': city },
  };
  return dynamodb.scan(req).promise();
};

module.exports.handler = async (event, context, callback) => {
  const { city } = JSON.parse(event.body);
  const weather = await fetchWeatherByCity(city, resultNumber);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(weather),
  });
};