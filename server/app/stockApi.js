var yahooFinance = require('yahoo-finance');
var _ = require('lodash');

exports.getHistorical = function(symbols, from, to, callback) {
  yahooFinance.historical({
    symbols: symbols,
    from: from,
    to: to,
    period: 'd'
  }, function (err, result) {
    if (err) return callback(err);

    var data = [];
    _.each(result, function(quotes, symbol) {
      var values = _.map(quotes, function(quote) {
        return {date: new Date(quote.date).getTime(), value: quote.adjClose};
      }).reverse();
      data.push({key: symbol, values: values});
    });

    return callback(err, data);
  });
};

exports.getStockData = function(symbol, callback) {
  yahooFinance.quote({
    symbol: symbol,
    modules: ['price']
  }, function (err, data) {
    if (err) return callback({
      message: "Can't add this stock"
    });
    var stockInfo = {symbol: data.price.symbol, name: data.price.shortName};
    return callback(null, stockInfo);
  });

};
