# API

## Overview
Serverless APIs for [www.analogstudios.net](https://github.com/AnalogStudiosRI/www.analogstudios.net) (and friends) using [arc.codes](https://arc.codes/).

## Local Setup

### Credentials
Assumes valid [AWS credentials](https://arc.codes/docs/en/get-started/detailed-aws-setup) are either exported as environment variables or you have a relevant configuration setup in _~/aws/credentials_.

Additionally, the following credentials files are required to run this project:
1. _preferences.arc_
    - `CONTENTFUL_ACCESS_TOKEN`
    - `CONTENTFUL_SPACE`
    - `CONTENTFUL_WEBHOOK_ACCESS_TOKEN`
    - `DATABASE_URL`
    - `AWS_ACCESS_KEY_ID`
    - `AWS_SECRET_ACCESS_KEY`
    - `AWS_CLOUDFRONT_ID`
1. _.env_ (For Prisma)
    - `DATABASE_URL`

### Install
1. Clone the repo
1. Run `npm ci`
1. Run `npm run arc env`
1. Run `npm start`  to use the local Architect sandbox for development

To use [Prisma Studio](https://www.prisma.io/studio), run `npm run studio`

## Supported APIs

### Albums
Structured events content sourced from [**Contentful**](https://planetscale.com) around the **Album** resource type.  Available at `/albums` internally and publicly as `/api/v2/albums`.

_Options:_
- `?id=xxx` - Filter by the `id` of the album
- `?artistId=xxx` - Filter by the `id` of an artist

> _You can only pass one or the other_

### Artists
Structured events content sourced from [**Contentful**](https://planetscale.com) around the **Album** resource type.  Available at `/artists` internally and publicly as `/api/v2/artists`.

_Options:_
- `?id=xxx` - Filter by the `id` of the artist

### Events
Structured events content sourced from [**Contentful**](https://contentful.com/) around the **Event** resource type.  Available at `/events` internally and publicly as `/api/v2/events`.

_Options:_
- `?id=xxx` - Filter by the `id` of the event
- `?tag=xxx` - Filter by tags of the event

> _You can only pass one or the other_

### Posts
Structured events content sourced from the [**PlanetScale**](https://planetscale.com) database around the **Post** resource type.  Available at `/posts` internally and publicly as `/api/v2/posts`.

_Options:_
- `?id=xxx` - Filter by the `id` of a post