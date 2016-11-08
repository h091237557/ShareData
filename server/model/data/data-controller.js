const DataService = require('./data-service');
var DataSchema = require('./data-schema');
var DataDetailSchema = require('./dataDetail-schema');

var dataService = new DataService(DataSchema, DataDetailSchema);

class DataController {
  constructor(dataService) {
    this.dataService = dataService;
  }

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

module.exports = new DataController(dataService);
