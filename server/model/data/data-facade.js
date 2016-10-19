//var dataSchema = require('./data-schema');

class DataModel {
  constructor(Schema) {
    this.Schema = Schema;
  }

  create(input) {
    const schema = new this.Schema(input);
    let promise = new Promise((resolve, reject) => {
      schema.save((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
          );
        }
      });
    });
    return promise;
  }

  find(query) {
    var promise = new Promise((resolve, reject) => {
      this.Schema.find(query, (err, data) => {
        resolve(data);
      });
    })
    return promise;
  }

  remove(id) {
    var promise = new Promise((resolve, reject) => {
      this.Schema.findByIdAndRemove(id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    return promise;
  }
}

module.exports = DataModel;
