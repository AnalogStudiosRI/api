# api.analogstudios.net

## Overview
Serverless APIs for [www.analogstudios.net](https://github.com/AnalogStudiosRI/www.analogstudios.net) using [arc.codes](https://arc.codes/).

### Supported APIs
* `events` - Structured events content sourced from [**Contentful**](https://contentful.com/)

## Setup

Assumes valid [AWS credentials](https://arc.codes/docs/en/get-started/detailed-aws-setup) are either exported as environment variables or you have a relevant configuration setup in _~/aws/credentials_.

1. Clone the repo
1. Run `yarn install`
1. Run `yarn arc env`

## Local Development

To setup the local sandbox, run `yarn start`.