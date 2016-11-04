const DataService = require('./data-service');
const DataApiService = require('./dataApi-service');
var DataSchema = require('./data-schema');
var DataDetailSchema = require('./dataDetail-schema');

var dataService = new DataService(DataSchema, DataDetailSchema);
var dataApiService = new DataApiService(DataDetailSchema);

class DataController {
  constructor(dataService, dataApiService) {
    this.dataService = dataService;
    this.dataApiService = dataApiService;
  }

  apiGetData(req, res, next) {
    try {
      var result = this.dataApiService.get(dataKey);
      result.then((datas) => {
        return res.status(200).json(datas);
      }).catch(e) {
        return res.status(500).end();
      }
    } catch (e) {
      next(e);
    }

  };

  find(req, res, next) {}

  create(req, res, next) {
    let input = req.body;
    try {
      var result = this.dataService.create(input);
      result.then((data) => {
        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(404).end();
        }
      }).catch(err => next(err));
    } catch (e) {
      next(e);
    };

  }
}

module.exports = new DataController(dataService, dataApiService);
