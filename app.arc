@app
api

@http
get /
get /albums
get /artists
get /events
get /posts
post /publish

@aws
# profile default
region us-east-1
runtime nodejs18.x
architecture arm64