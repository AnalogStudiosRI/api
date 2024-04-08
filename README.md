# API

## Overview

Serverless APIs for [www.analogstudios.net](https://github.com/AnalogStudiosRI/www.analogstudios.net) (and friends) using [arc.codes](https://arc.codes/).

## Local Setup

### Credentials

Assumes valid [AWS credentials](https://arc.codes/docs/en/get-started/detailed-aws-setup) are either exported as environment variables or you have a relevant configuration setup in _~/aws/credentials_.

Additionally, the following credentials files are required to run this project for the various services and APIs exposed.

#### _preferences.arc_

For running the various APIs using the Architect sandbox.

|             Name                 |     Service     |            Role              |
|----------------------------------|-----------------|------------------------------|
|`AWS_ACCESS_KEY_ID`               | AWS             | Publish API                  |
|`AWS_SECRET_ACCESS_KEY`           | AWS             | Publish API                  |
|`AWS_CLOUDFRONT_ID`               | AWS             | Publish API                  |
|`CONTENTFUL_ACCESS_TOKEN`         | Contentful      | Events API                   |
|`CONTENTFUL_SPACE`                | Contentful      | Events API                   |
|`CONTENTFUL_WEBHOOK_ACCESS_TOKEN` | Contentful      | Publish API                  |
|`DATABASE_URL`                    | Turso           | All APIs except Events       |
|`DATABASE_TOKEN`                  | Turso           |                              |

#### _.env_

For running Prisma Studio.

|             Name                 |     Service     |              Role             |
|----------------------------------|-----------------|-------------------------------|
|`DATABASE_URL_LOCAL`              | Local SQLite    | All APIs except Events        |


### Install

1. Clone the repo
1. Run `npm ci`
1. Run `npm run arc env`
1. Run `npm start`  to use the local Architect sandbox for development
1. Make a copy of _.env.local_ and rename it to _.env_

To use [Prisma Studio](https://www.prisma.io/studio), run `npm run studio`

## Supported APIs

### Albums

Data sourced from [**Turso**](https://turso.tech) for the **Album** resource type.  Available at `/albums` internally and publicly as `/api/v2/albums`.

_Options:_
- `?id=xxx` - Filter by the `id` of the album
- `?artistId=xxx` - Filter by the `id` of an artist

> _You can only pass one or the other_

### Artists

Data sourced from [**Turso**](https://turso.tech) for the **Artist** resource type.  Available at `/artists` internally and publicly as `/api/v2/artists`.

_Options:_
- `?id=xxx` - Filter by the `id` of the artist

### Events

Structured events content sourced from [**Contentful**](https://contentful.com/) for the **Event** resource type.  Available at `/events` internally and publicly as `/api/v2/events`.

_Options:_
- `?id=xxx` - Filter by the `id` of the event
- `?tag=xxx` - Filter by tags of the event

> _You can only pass one or the other_

### Posts

Data sourced from [**Turso**](https://turso.tech) for the **Post** resource type.  Available at `/posts` internally and publicly as `/api/v2/posts`.

_Options:_
- `?id=xxx` - Filter by the `id` of a post