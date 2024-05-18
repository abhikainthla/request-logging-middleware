# Express Request Logging App

### This application is an Express.js server that logs incoming requests to a file using the morgan logging middleware. The logs include details such as the remote address, HTTP method, URL, status code, content length, and response time.

## Features
- Logs details of each incoming request to logger.txt.
- Provides a single endpoint, /request-logging, which returns a JSON response.

## Prerequisites
- Node.js installed on your machine.
- npm (Node Package Manager) to install dependencies.

## Installation
  1. Clone the repository or download the source code.
  2. Navigate to the project directory.
  3. Install the required dependencies by running:
  `npm install`

## Usage
1. Start the server by running:
   `node app.js`
2. The server will start and listen on port 7070. You should see a message indicating the server is running:
   `Server is running on port 7070`
3. To test the logging functionality, make a GET request to the /request-logging endpoint using a tool like curl, Postman, or your browser:
   `curl http://localhost:7070/request-logging`
4. Check the logger.txt file in the project directory to see the logged request details.

## Code Explanation
- **Dependencies:** The application uses express for the server framework, morgan for logging middleware, and Node's built-in fs module for file system operations.
  `const express = require('express');
const app = express();
var morgan = require('morgan');
const fs = require('fs');

- **Port Configuration:** The server listens on port 7070.
  `const PORT = 7070;`

- **Logging Middleware:** Morgan is configured to log request details and append them to logger.txt.
  `app.use(morgan(function (tokens, req, res) {
    let data = [
        'id:',
        tokens['remote-addr'](req, res),
        'method:',
        tokens.method(req, res),
        'url:',
        tokens.url(req, res),
        'status:',
        tokens.status(req, res),
        'content-length:',
        tokens.res(req, res, 'content-length'), 'response-time:',
        tokens['response-time'](req, res), 'ms'
      ].join(' ');
    fs.appendFileSync('logger.txt', data + '\n')
    return data;
  }))`
- **Endpoint:** Defines a GET endpoint /request-logging that returns a success message in JSON format.
 `app.get('/request-logging', (req, res) => {
    res.json({
        "success": "true",
        "message": "Request Logging"
    });
});`
- **Server Listening:** Starts the server and listens on the specified port.
  `app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});`
