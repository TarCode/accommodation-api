# Project Accommodation API

API for [Accommodation Client](https://github.com/tarcode/accommodation-client)

### To Run in Development
  - Start Mongo Server
  - `npm install`
  - `npm run dev`

### To Run Tests
 - `npm test`

## Shortcuts taken
- Storing all info about rooms and roommates in respective collections.
- Currently getting a users current room by querying roommates with the same ID as user
- Not using any validation
- Not using an ODM (Mongoose) or Query Language (GraphQL) for collections to make data structure/storage more rigid (Alternatively, one could use a relational DB)

### Tech

* NodeJS
* Express
* MongoDB
* Babel
* Mocha
* Chai
