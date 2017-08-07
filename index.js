'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const App = require('actions-on-google').ApiAiApp;
const server = express();

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
    console.log("Server up and listening");
});
