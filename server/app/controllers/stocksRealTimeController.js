module.exports = function(io, socket) {

  socket.on('addStock', function(stock) {
    io.emit('addStock', stock);
  });

  socket.on('removeStock', function(symbol) {
    io.emit('removeStock', symbol);
  })
};
