// Dependencies 
const https = require('https')
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./config')
const fs = require('fs')
const colors = require('colors');

// Instantiate HTTP server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res)
});
// Instantiate HTTPS server
const httpsServerOptions = {'key': fs.readFileSync('./https/key.pem'),'cert': fs.readFileSync('./https/cert.pem')}
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res)
});
// Starting HTTP Server
let protocolIsHTTP = 'HTTP'
httpServer.listen(config.port, () => {
  console.log(`\n Protocol: ${(protocolIsHTTP).green}`)
  console.log(`\n     Port: ${(config.httpport + '').cyan}`)
  console.log(`\n      Env: ${(config.envName).cyan}`)
});
// Start HTTPS Server
let protocolIsHTTPS = 'HTTPS'
httpsServer.listen(config.port, () => {
  console.log(`\n ~~~~~~~~~~~~~~~~~~~~~~~`)
  console.log(`\n Protocol: ${(protocolIsHTTPS).green}`)
  console.log(`\n     Port: ${(config.httpsport + '').cyan}`)
  console.log(`\n      Env: ${(config.envName).cyan}`)
});
// Unified Server
const unifiedServer = (req, res) => {
  var parsedUrl = url.parse(req.url, true);
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on('data', function (data) {
    buffer += decoder.write(data);
  });
  req.on('end', function () {
    buffer += decoder.end();
    var chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
    var data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };
    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
      payload = typeof (payload) == 'object' ? payload : {};
      var payloadString = JSON.stringify(payload);
      res.setHeader('Content-type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log("Returning this response: ", statusCode, payloadString);
    });
  });
}
// example handlers
var handlers = {};
handlers.sample = function (data, callback) {
    callback(406, {"name": "derek"});
};
handlers.notFound = function (data, callback) {
    callback(404);
};
var router = {
  'sample': handlers.sample
};