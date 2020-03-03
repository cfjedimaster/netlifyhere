/* eslint-disable */
const fetch = require('node-fetch');

const HERE_APP_CODE = process.env.HERE_APP_CODE;
const HERE_APP_ID = process.env.HERE_APP_ID;

exports.handler = async function(event, context, cb) {

  let location = event.queryStringParameters.location;
  if(!location) {
    return {
      statusCode:500,
      body:'Must define location'
    }
  }

  let url = `https://weather.cc.api.here.com/weather/1.0/report.json?app_code=${HERE_APP_CODE}&app_id=${HERE_APP_ID}&product=observation&name=${encodeURIComponent(location)}&metric=no`;

  let response = await fetch(url);
  let data = await response.json();

  // filter it down a bit
  let result = data.observations.location[0].observation[0];
  // high and low temps are to the hundreds, no one cares about that
  result.lowTemperature = Math.floor(result.lowTemperature);
  result.highTemperature = Math.floor(result.highTemperature);
  
  return {
    headers: {
      'Content-Type':'application/json'
    },
    statusCode: 200,
    body: JSON.stringify(result)
  };

}
