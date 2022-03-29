// import fs from 'fs';
// import glob from 'glob-promise';
// import mime from 'mime-types';
// import path from 'path';
import * as AWS from '@aws-sdk/client-cloudfront';
// import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const CONFIG = {
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// import { ListBucketsCommand } from '@aws-sdk/client-s3';
// async function test () {
//   try {
//     const data = await s3Client.send(new ListBucketsCommand({}));
//     console.log('Success', data.Buckets);
//   } catch (err) {
//     console.log('Error', err);
//   }
// }
// test()

export async function handler(req) {
  console.debug({ req });
  const cfClient = new AWS.CloudFront(CONFIG);

  // invalidate index.html in Cloudfront
  const params = {
    DistributionId: 'E3MKRY7663NB8F',
    InvalidationBatch: {
      CallerReference: new Date().getTime(),
      Paths: {
        Quantity: 1,
        Items: [
          '/api/v2/events'
        ]
      }
    }
  };

  cfClient.createInvalidation(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
}