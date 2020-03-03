/* eslint-disable */
const fetch = require('node-fetch')

const HERE_API_KEY = process.env.HERE_API_KEY;


exports.handler = async function(event, context) {

  let location1 = event.queryStringParameters.start;
  let location2 = event.queryStringParameters.end;
  if(!location1 || !location2) {
    return {
      statusCode:500,
      body: 'Must pass start and end parameters.'
    }
  }

  let location1Position = await getLocation(location1);
  let location2Position = await getLocation(location2);
  let route = await getRoute(location1Position.lat+','+location1Position.lng, location2Position.lat+','+location2Position.lng );

  let data = route.sections[0];
  delete data.polyline;

  return {
    headers: {
      'Content-Type':'application/json'
    },
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

async function getLocation(x) {
   let url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(x)}&apikey=${HERE_API_KEY}`;
   let response = await fetch(url);
   let data = await response.json();
   // assume first result
   return data.items[0].position;
}

async function getRoute(x, y) {
  let url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${x}&destination=${y}&units=imperial&return=summary,actions,instructions,polyline&apikey=${HERE_API_KEY}`;
console.log(url);
  let response = await fetch(url);
  let data = await response.json();
  return data.routes[0];

}