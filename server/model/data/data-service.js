var async = require("async");

class DataModel {
  const maxSize = 1000,
    constructor(Schema) {
      this.Schema = Schema;
    }

  create(input) {
    let bulk = Schema.collection.initializeOrderedBulkOp(),
      data = input.data,
      dataLength = data.length,
      asyncSize = Math.ceil(dataLength / maxSize),
      asyncFucs = [];

    var asyncData = splitData(input, asyncSize);
    for (var i = 0; asyncSize; i++) {
      asyncFuc.push(bulk(asyncData[i], () => {
        console.log(i + ' :bulk save success')
      }));
    }

    var result = new Promise((reolve, reject) => {
      async.parallel(asyncFuc, (err, results) => {
				if(err){
					reject(err);
				}else{
					resolve(results);
				}
      });
    });
  }

  splitData(input, size) {
    let result = [];

    for (var i = 0; i < size; i++) {
      if (size == 1) {
        result.push(input);
      } else {
        let obj = {
          data: input.data.slice(i * 1000, (i + 1) * 1000),
          describe: input.describe,
          author: input.author
        };
        result.push(obj);
      }
    }
    return result;
  }

  bulkSave(input, callback) {
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

  update(id, newData) {
    var promise = new Promise((resolve, reject) => {
      this.Schema.findOneAndUpdate(query, newData, {
        upsert: true
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
    return promise;
  }
}

module.exports = DataModel;
