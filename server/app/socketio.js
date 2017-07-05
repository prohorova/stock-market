
module.exports = function(io) {
  io.on('connection', function(socket) {
    require('./controllers/stocksRealTimeController')(io, socket);
  })
};
