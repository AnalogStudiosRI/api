# API

## Overview
Serverless APIs for [www.analogstudios.net](https://github.com/AnalogStudiosRI/www.analogstudios.net) (and friends) using [arc.codes](https://arc.codes/).

## Supported APIs
### `events`
Structured events content sourced from [**Contentful**](https://contentful.com/) around the **Event** resource type.  Available at `/events` internally and publicly as `/api/v2/events`.

_Options:_
- `?id=n` - Filter by the ID of the event
- `?tag=xxx` - Filter by tags of the event

> _You can only pass one or the other_

### `posts`
Structured events content sourced from the [**PlanetScale**](https://contentful.com/) database around the **Posts** resource type.  Available at `/posts` internally and publicly as `/api/v2/posts`.

_Options:_
- `?id=n` - Filter by the ID of the post

## Setup

Assumes valid [AWS credentials](https://arc.codes/docs/en/get-started/detailed-aws-setup) are either exported as environment variables or you have a relevant configuration setup in _~/aws/credentials_.

1. Clone the repo
1. Run `npm run ci`
1. Run `npm run arc env`

## Local Development

To setup the local sandbox, run `npm start`.