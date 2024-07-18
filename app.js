const dotenv = require('dotenv');
dotenv.config({ path: './variables.env' });
var http = require('http');
var app = require('./server')
var server = http.createServer(app)
const PORT = process.env.PORT || 80
server.listen(PORT, console.log(`app is running on port ${PORT}`));