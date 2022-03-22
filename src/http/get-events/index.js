// https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
const contentful = require('contentful');
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// events schema
// {
//   "id":"14",
//   "title":"9th Annual WhaleFest",
//   "description":"..... &nbsp;Hope to see everyone there to support a great cause! &nbsp;<\/p>\n\n<p>Special thanks to Steve and MaryAnne for putting this event on for everyone!<\/p>\n",
//   "startTime":"1484434800",
//   "endTime":"1484434800",
//   "createdTime":"1484180774"
// }

// learn more about HTTP functions here: https://arc.codes/http
exports.handler = async function http () {
  const events = await client.getEntries('Event');

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(events.items)
  };
};