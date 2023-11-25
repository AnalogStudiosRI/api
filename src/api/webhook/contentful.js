import * as AWS from '@aws-sdk/client-cloudfront';

const CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  distributionId: process.env.AWS_CLOUDFRONT_ID
};

export async function handler (request) {
  // TODO - double check for adapter https://stackoverflow.com/a/55354185/417806
  const cfClient = new AWS.CloudFront(CONFIG);
  const body = await request.json();
  const entity = body.sys.contentType.sys.id;

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

  try {
    await cfClient.createInvalidation(params);

    return new Response(JSON.stringify({ msg: 'success' }), { 
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  } catch (e) {
    return new Response(JSON.stringify({ msg: e }), {
      status: 500,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }
}