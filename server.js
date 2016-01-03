var http = require('http'),
    express = require('./config/express'),
    fs = require('fs'),
    sslkey = fs.readFileSync('sslcerts/key.pem'),
    sslcert = fs.readFileSync('sslcerts/cert.pem'),
    credentials = {key: sslkey, cert: sslcert};

var app = express();

var httpServer = http.createServer(app);

httpServer.listen(1900);
process.TIMER = false;
module.exports = app;
console.log('Server running');


