var stockApi = require('./../stockApi');
var stocks = require('../stocks');

exports.getStockData = function(req, res) {
  var symbols = req.body.symbols,
    from = req.body.from,
    to = req.body.to;
  stockApi.getHistorical(symbols, from, to, function(err, quotes) {
    if (err) res.status(500).send(err);
    res.send(quotes);
  })
};

exports.listStocks = function(req, res) {
  res.send(stocks);
};

exports.removeStock = function(req, res) {
  var index = req.params.index;
  if (!index) return res.status(400).send({message: 'No stock symbol provided'});
  stocks.splice(index, 1);
  return res.send({index: index});
};

exports.addStock = function(req, res) {
  var symbol = req.query.symbol;
  if (!symbol) return res.status(400).send({message: 'No stock symbol provided'});
  stockApi.getStockData(symbol, function(err, data) {
    if (err) return res.status(500).send(err);
    stocks.push(data);
    return res.send(data);
  })

};
