import * as AWS from '@aws-sdk/client-cloudfront';

const CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

export async function handler(req) {
  console.debug({ req });
  const cfClient = new AWS.CloudFront(CONFIG);
  const entity = req.sys.contentType.sys.id;

  // invalidate index.html in Cloudfront
  const params = {
    DistributionId: 'E3MKRY7663NB8F',
    InvalidationBatch: {
      CallerReference: new Date().getTime(),
      Paths: {
        Quantity: 1,
        Items: [
          `/api/v2/${entity}s`
        ]
      }
    }
  };

  try {
    await cfClient.createInvalidation(params);

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ msg: 'success' })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ msg: e })
    };
  }
}