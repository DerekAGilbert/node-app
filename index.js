/* 
 *
 */
// dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
// server object
const server = http.createServer(function(req, res) {
  // get url
  var parsedUrl = url.parse(req.url, true);

  // get path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // get querey string as an object
  var queryStringObject = parsedUrl.query;

  // get http method
  var method = req.method.toLocaleLowerCase();

  //get headers as an object
  var headers = req.headers;

  //get payload if there is one
  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    // choose hanlder request should go to if no found, use not found handler
    var chosenHandler = typeof(router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound)
    // contruct data object to send to handler
    var data = {
      "trimmedPath" : trimmedPath,
      "queryStringObject": queryStringObject,
      "method": method,
      "headers": headers,
      "payload": payload
    }

    // route the request specified in the route
    chosenHandler(data,function(statusCode,payload){
      
    })
    // send response
    res.end("Hello World\n");

    // log path
    console.log('request was recieved with this payload: ', buffer)
    console.log("headers:", headers);
    console.log("request:" + trimmedPath + "method:" + method + "query string parameters:", queryStringObject);
  });
});

// starting server
server.listen(3000, function() {
  console.log("the server is listening on the port 3000\n...");
});
//
// define out handlers
var handlers = {};
// sample handler

handlers.sample = function(data,callback){
// http satus code, payload should be an object
callback(406,{"name": "derek"})
}

// not found handler

handlers.notFound = function(data,callback){
callback(404)
}

// define a rwuest router
var router = {
  'sample': handlers.sample
}

