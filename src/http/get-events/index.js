// https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
const contentful = require('contentful');
const documentToHtmlString = require('@contentful/rich-text-html-renderer').documentToHtmlString;

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// learn more about HTTP functions here: https://arc.codes/http
exports.handler = async function http () {
  const events = (await client.getEntries('Event'))
    .items.map((event) => {
      const { description, endTime, startTime, title } = event.fields;

      return {
        id: null,
        title,
        description: documentToHtmlString(description),
        startTime: new Date(startTime).getTime() / 1000,
        endTime: new Date(endTime).getTime() / 1000
      };
    });
  
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(events)
  };
};