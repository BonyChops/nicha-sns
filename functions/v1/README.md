# Nicha API v1

## Initialize
```bash
$ firebase functions:config:set schooladdress.student="domain-of-student"
```

## Problems?
Check https://github.com/BonyChops/nicha-sns/blob/main/functions/docs/errors.md

## Endpoint
`/api/v1`

## Authorization
Each endpoint requires authorization (because this is a closed SNS). Please put your token into the header.  
`Authorization: Bearer {your-token-here}`

### * Your-self endpoints
The endpoint name with `*` (ex. * `PUT /users/:id/profile`) can be called by **who owned that users or have the right to modify it**. 

## Accounts API
For web client.

### * `POST /account/register`
Register your first account to start using Nicha service.

#### Notice
This Endpoint requires you to provide a "pre-provided token" but it's only for Web Client so this can't be called by third-party client...


## Users API
Profile, follow, identity.

### * `GET /users`
Get all users currently you've logged in

### * `POST /users`
Create new users.

### `GET /users/:id/profile`
Get users profile.

### * `PUT /users/:id/profile`
Modify your profile.

## Posts API
Share your feelings, repos, and so on!

### `GET /posts/:id`
Get post by id

### * `POST /post`
Post new post

### * `PUT /post/:id`
Modify the post 

### * `DELETE /post/:id`
Delete the post

## Teapot API

### * `GET /teapot`
Returns possibility of brewing coffee with a teapot.