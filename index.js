'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const App = require('actions-on-google').ApiAiApp;
const request = require('request');
const server = express();

var accessToken = "7~k8r7YlTXY01Xr3goRCguHMI7Sy8IovEWQFkceIHQs35X7KgXyjoyiXc0wbqECWPh";

var makeRequest = function(path, type, callback) {
  request[type](`https://canvas.instructure.com/api/v1/${path}?access_token=${accessToken}`, function (error,response, body) {
    callback(error, body);
  });
}

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/hook', function(req, res) {
  const app = new App({req, res});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  const actionMap = new Map();

  app.handleRequest(actionMap);
});

server.listen((process.env.PORT || 8000), function() {
    //console.log("Server up and listening");
    makeRequest("users/self/activity_stream", "get", (err, body) => {
      console.log(body);
    });
});