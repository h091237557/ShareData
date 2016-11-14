const DataService = require('./data-service');
const DataApiService = require('./dataApi-service');
var DataSchema = require('./data-schema');
var DataDetailSchema = require('./dataDetail-schema');

var dataService = new DataService(DataSchema, DataDetailSchema);
var dataApiService = new DataApiService(DataDetailSchema);

class DataApiController {
  constructor(dataService, dataApiService) {
    this.dataService = dataService;
    this.dataApiService = dataApiService;
  }

  apiGetData(req, res, next) {
    try {
			var dataKeyString = req.params.datasKey; 
			var dataKey = dataKeyString.split('-')[0];
			var author = req.params.author;
      var result = this.dataApiService.get(dataKey);
      result.then((datas) => {
        if (datas) {
          return res.status(200).json(datas);
        } else {
          return res.status(500).end();
        }
      })
    } catch (e) {
      next(e);
    }

  };

}

module.exports = new DataApiController(dataService, dataApiService);
