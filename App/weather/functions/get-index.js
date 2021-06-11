'use strict';

// Require the fs library to read files
const fs = require('fs');
// Template library.
const Mustache = require('mustache'); // Template library.
const axios = require('axios');
// Set a variable outside of function in order to reuse
var html;
// The function that will read content from our html file
const getHtml = () => {
  if (html) return html; // If the content has existed, do not read it again
  // Return a promise
  return new Promise((resolve, reject) => {
    fs.readFile('static/index.html', 'utf8', (err, data) => {
      if (err) reject(err);
      html = data;
      resolve(html);
    });
  });
};

const fetchWeather = () => axios.get(process.env.fetch_weather_api);
// The main Lambda function
module.exports.handler = async (event, context, callback) => {
  const htmlcontent = await getHtml(); // Get the content
  const weather = await fetchWeather();

  const returnHtml = Mustache.render(htmlcontent, {
    weather: weather.data.Items,
    searchAPI: process.env.search_weather_api,
  });
  const response = {
    statusCode: 200,
    // Set up the header
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
    },
    body: returnHtml,
  };
  callback(null, response);
};