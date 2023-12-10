import * as AWS from '@aws-sdk/client-cloudfront';

const CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  distributionId: process.env.AWS_CLOUDFRONT_ID
};

export async function handler(req = {}) {
  const cfClient = new AWS.CloudFront(CONFIG);
  const body = req.body ? JSON.parse(req.body) : req; // https://stackoverflow.com/a/55354185/417806
  const entity = body?.sys?.contentType.sys.id;
  const accessToken = req?.headers['x-contentful_webhook_access_token'] || '';

  // invalidate index.html in Cloudfront
  const params = {
    DistributionId: CONFIG.distributionId,
    InvalidationBatch: {
      CallerReference: new Date().getTime(),
      Paths: {
        Quantity: 1,
        Items: [
          `/api/v2/${entity}s*`
        ]
      }
    }
  };

  if(accessToken === process.env.CONTENTFUL_WEBHOOK_ACCESS_TOKEN) {
    try {
      await cfClient.createInvalidation(params);
  
      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ msg: 'success' })
      };
    } catch (e) {
      console.log({ e });
      return {
        statusCode: 500,
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ msg: e })
      };
    }
  } else {
    return {
      statusCode: 404,
      body: 'Not Found'
    };
  }
}