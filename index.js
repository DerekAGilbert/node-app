/* 
 *
 * 
 * 
 */

// dependencies
const http = require("http");

// server object
const server = http.createServer(function(req, res) {
  res.end("Hello World\n");
});

server.listen(3000, function() {
  console.log("the server is listening on the port 3000");
});
