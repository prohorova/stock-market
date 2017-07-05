var stocksController = require('./controllers/stocksController');

module.exports = function(app) {

  app.get('/stocks', stocksController.listStocks);

  app.post('/stockData', stocksController.getStockData);

  app.get('/stocks/add', stocksController.addStock);

  app.delete('/stocks/remove/:index', stocksController.removeStock);

};
