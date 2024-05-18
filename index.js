const express = require('express');
const app = express();
var morgan = require('morgan');
const fs = require('fs');
const PORT = 7070;
app.use(morgan(function (tokens, req, res) {
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
  }))
  app.get('/request-logging', (req,res)=>{
    res.json({
        "success": "true",
        "message": "Request Logging"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})