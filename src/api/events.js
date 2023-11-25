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
export async function handler (request) {
  const params = new URLSearchParams(request.url.slice(request.url.indexOf('?')));
  const id = params.has('id') ? params.get('id') : null;
  const tag = params.has('tag') ? params.get('tag') : null;

  let events = (await client.getEntries('Event'))
    .items.map((event) => {
      const { id, description, endTime, startTime, title, link } = event.fields;
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
        link,
        tags: tags.map((tag) => {
          return tag.sys.id;
        })
      };
    });

  if (id || tag) {
    if (id) {
      events = [events.find(event => parseInt(event.id, 10) === parseInt(id, 10))];
    } else if (tag) {
      events = events.filter(event => event.tags.includes(tag));
    }
  }

  return new Response(JSON.stringify(events), {
    headers: new Headers({
      'Cache-Control': 'max-age=604800',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  });
}