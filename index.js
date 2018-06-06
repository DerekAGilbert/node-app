/* 
 *
 * 
 * 
 */

// dependencies
const http = require("http");
const url = require("url");

// server object
const server = http.createServer(function(req, res) {
  // get url
  var pareseUrl = url.parse(req.url, true);
  // console.log("Parsed Url:", pareseUrl);

  // get path
  var path = pareseUrl.pathname;
  console.log("Parsed Path:", path);
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  console.log("trimmedPath:", trimmedPath);

  // send response
  res.end("Hello World\n");

  // log path
  console.log("request has been recieved: " + trimmedPath);
});

// starting server
server.listen(3000, function() {
  console.log("the server is listening on the port 3000\n...");
});
