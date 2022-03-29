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
        'content-type': 'application/json'
      },
      body: JSON.stringify({ msg: 'success' })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ msg: e })
    };
  }
}

// {
//   "metadata": {
//     "tags": []
//   },
//   "sys": {
//     "type": "Entry",
//     "id": "4mB0XJJDS7UWlDRulVKutx",
//     "space": {
//       "sys": {
//         "type": "Link",
//         "linkType": "Space",
//         "id": "kpfxkjvd7pox"
//       }
//     },
//     "environment": {
//       "sys": {
//         "id": "master",
//         "type": "Link",
//         "linkType": "Environment"
//       }
//     },
//     "contentType": {
//       "sys": {
//         "type": "Link",
//         "linkType": "ContentType",
//         "id": "event"
//       }
//     },
//     "createdBy": {
//       "sys": {
//         "type": "Link",
//         "linkType": "User",
//         "id": "2zyeBc0W6qvMF8RBEon82b"
//       }
//     },
//     "updatedBy": {
//       "sys": {
//         "type": "Link",
//         "linkType": "User",
//         "id": "2zyeBc0W6qvMF8RBEon82b"
//       }
//     },
//     "revision": 1,
//     "createdAt": "2022-03-29T01:21:21.307Z",
//     "updatedAt": "2022-03-29T01:21:21.307Z"
//   },
//   "fields": {
//     "id": {
//       "en-US": 0
//     },
//     "title": {
//       "en-US": "Publish test"
//     },
//     "description": {
//       "en-US": {
//         "data": {},
//         "content": [
//           {
//             "data": {},
//             "content": [
//               {
//                 "data": {},
//                 "marks": [],
//                 "value": "dsfdsf",
//                 "nodeType": "text"
//               }
//             ],
//             "nodeType": "paragraph"
//           }
//         ],
//         "nodeType": "document"
//       }
//     },
//     "startTime": {
//       "en-US": "2022-03-30T00:00"
//     },
//     "endTime": {
//       "en-US": "2022-03-30T00:00"
//     }
//   }
// }