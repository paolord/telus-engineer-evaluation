# TELUS SENIOR NODE.JS ENGINEER EVALUATION

## 1. About

Create a Node.js application using Express or NestJS that exposes a RESTful API for managing user data.

## 2. Requirements 

- Implement CRUD (Create, Read, Update, Delete) functionality for user management.
- Use an in-memory data structure (e.g., an array or object) to store user data.
- Design and implement the necessary API endpoints for creating, retrieving, updating, and deleting users.
- Implement proper error handling and validation for API requests.
- Write concise and well-structured code with proper error handling and comments.

## 3. Objectives
 - Expose an HTTP API endpoint using Node.js with express
    - Implement `POST /api/users` endpoint for saving a user
    - Implement `GET /api/users` endpoint for returning an array of all users
    - Implement `GET /api/users/:userId` endpoint for returning a specific user
    - Implement `PUT /api/users/:userId` endpoint for updating a specific user
    - Implement `DELETE /api/users/:userId` endpoint for deleting a specific user 
 - Write Unit test scripts

## 4. Implementation
### 4.1 Database

As per the instructions, data storage is implemented as in-memory data structure using a built-in javascript data type.

### 4.2 Web server 

The web server is written in Node.js with [Typescript](https://www.typescriptlang.org/) and uses the [ExpressJS](https://expressjs.com/) Web Framework for handling the HTTP calls.
#### 4.2.1 `POST /api/users`

This endpoint only accepts a POST request with an `application/json` Content Type Header. And the request body must be a properly formed JSON object with the following string properties:
```json
{
  "username": "",
  "firstname": "",
  "lastname": ""
}
```
If the request body provided has missing properties, it will respond with a `200` http status and the following message:
```json
{
  "ok": false,
  "errors": []
}
```

#### 4.2.2 `GET /api/users`

This endpoint returns all the User in the storage.

An example response is:
```json
{
  "ok": true,
  "data": []
}
```

#### 4.2.3 `GET /api/users/:userId`

This endpoint returns a User from the storage.

An example response is:
```json
{
  "ok": true,
  "data": {
    "username": "foobar",
    "firstname": "foo",
    "lastname": "bar",
    "id": 1
  }
}
```

If the `:userId` provided does not exist, it will respond with a `200` http status and the following message:
```json
{
	"ok": false
}
```


#### 4.2.4 `PUT /api/users/:userId`

This endpoint only accepts a POST request with an `application/json` Content Type Header. And the request body must be a properly formed JSON object with any of the following string properties:
```json
{
  "username": "",
  "firstname": "",
  "lastname": ""
}
```

If the `:userId` provided does not exist, it will respond with a `200` http status and the following message:
```json
{
	"ok": false
}
```

#### 4.2.5 `DELETE /api/users/:userId`

This endpoint deletes a specific user.

If the `:userId` provided does not exist, it will respond with a `200` http status and the following message:
```json
{
	"ok": false
}
```

### 4.3 Testing

[Mocha](https://mochajs.org/) is used as the testing framework and [Chai](https://www.chaijs.com/) as the TDD library with the following addon plugins: [Chai-Http](https://www.chaijs.com/plugins/chai-http/).

> `Typescript` is also used in the test scripts, and `Mocha`, `Chai` and `Chai-Http` all have either built-in or third-party Type definitions for their modules.

## 5. Usage

`Node.js` is installed and in version `16.13` or higher for executing the scripts.

### 5.1 Setup

Execute `npm install` first to download the necessary dependencies of the project.

### 5.2 Running the Application and Testing the API manually
  1. Execute `npm run dev` to start the development server
  2. Start testing the API server on `http://localhost:8080`

### 5.3 Running Automated Tests
  1. Execute `npm run test` to initiate the test framework.