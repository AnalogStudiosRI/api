@app
api

@http
/api/albums
  method get
  src .aws-output/api/albums

/api/artists
  method get
  src .aws-output/api/artists

/api/events
  method get
  src .aws-output/api/events

/api/posts
  method get
  src .aws-output/api/posts

/api/publish
  method post
  src .aws-output/api/webhook-contentful

@aws
# profile default
region us-east-1
runtime nodejs22.x
architecture arm64