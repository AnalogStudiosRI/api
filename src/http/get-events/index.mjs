// match runtime TZ to publish TZ
// https://github.com/AnalogStudiosRI/www.analogstudios.net/issues/75
// https://github.com/AnalogStudiosRI/api/pull/10
process.env.TZ = 'America/New_York';

// https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
import contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

// learn more about HTTP functions here: https://arc.codes/http
export async function handler (req) {
  const { queryStringParameters = {} } = req;
  const { id, tag } = queryStringParameters;

  let events = (await client.getEntries('Event'))
    .items.map((event) => {
      const { id, description, endTime, startTime, title } = event.fields;
      const { tags = [] } = event.metadata;

      return {
        id,
        title,
        description: documentToHtmlString(description, {
          // https://github.com/contentful/rich-text/issues/61
          renderNode: {
            'embedded-asset-block': (node) =>
              `<img src="${node.data.target.fields.file.url}" loading="lazy"/>`
          }
        }),
        startTime: new Date(startTime).getTime() / 1000,
        endTime: new Date(endTime).getTime() / 1000,
        tags: tags.map((tag) => {
          return tag.sys.id;
        })
      };
    });

  if (queryStringParameters) {
    if (id) {
      events = events.filter(event => parseInt(event.id, 10) === parseInt(queryStringParameters.id, 10));
    } else if (tag) {
      events = events.filter(event => event.tags.includes(tag));
    }
  }

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'max-age=604800',
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(events)
  };
}