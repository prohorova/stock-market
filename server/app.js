process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var compress = require('compression');
var cors = require('cors');
var socketio = require('socket.io');

var port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(compress());
} else {
  app.use(morgan('dev'));
}

require('./app/router.js')(app);
require('./app/socketio')(io);

app.get('/favicon.ico', function(req, res) {
  res.status(204).send();
});

app.use(express.static('./dist'));

app.get('/*', function(req, res) {
  res.sendFile('./dist/index.html');
});

server.listen(port, function() {
  console.log('Server listening on port ' + port);
});
