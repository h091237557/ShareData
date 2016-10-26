class DataModel {

  constructor(Schema, DataDetailSchema) {
    this.Schema = Schema;
    this.DataDetailSchema = DataDetailSchema;
  }

  create(input) {
    let data = input.data,
      dataLength = data.length,
      asyncFucs = [];

    var saveDataResult = this.saveData(input, () => {
      console.log("Save Data Success")
    });

    return new Promise((resolve, reject) => {
      saveDataResult.then((data) => {
        var start = new Date().getTime();
        var end = 0;

        let dataId = data._id.toString();
        var asyncDatas = this.splitData(dataId, input),
          asyncDataLength = asyncDatas.length;

        asyncFucs.push(this.bulkSaveDataDetail(asyncDatas));

        Promise.all(asyncFucs).then(msgs => {
          end = new Date().getTime();
          console.log((end - start) / 1000 + "sec");
          resolve(data);
        });

      }).catch((err) => {
        console.log(err);
      });
    });
  }

  splitData(dataId, input) {
    let result = [],
      dataLength = input.data.length,
      maxSize = this.maxSize || 10000,
      size = Math.ceil(dataLength / maxSize);

    //data: input.data.slice(i * 1000, (i + 1) * 1000),
    for (var i = 0; i < dataLength; i++) {
      let obj = {
        data: input.data[i],
        dataId: dataId,
        isFinal: false || i == (size - 1)
      };
      result.push(obj);
    }
    return result;
  }

  saveData(data, callback) {
    var inputData = {
      describe: data.describe,
      author: data.author
    }
    const schema = new this.Schema(inputData);
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

  bulkSaveDataDetail(datas, callback) {
    let promise = new Promise((resolve, reject) => {
      this.DataDetailSchema.collection.insert(datas, (err, datas) => {
        if (err) {
          reject(err);
        } else {
          resolve(datas);
        }
      });
    });
    return promise;
  }

  find(query) {
    return new Promise((resolve, reject) => {
      this.Schema.find(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  remove(id) {
    var promise = new Promise((resolve, reject) => {
      var start = new Date().getTime();
      var end = 0;
      var removeDataPromise = this.removeDataByDataId(id);
      var removeDataDetailPromise = this.removeDataDetailsByDataId(id);
      Promise.all([removeDataPromise, removeDataDetailPromise]).then(data => {
        end = new Date().getTime();
        console.log((end - start) / 1000 + "sec");
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  removeDataByDataId(id) {
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

  removeDataDetailsByDataId(id) {
    return new Promise((resolve, reject) => {
      this.DataDetailSchema.collection.remove({
        dataId: id
      }, (err, msg) => {
        if (err) {
          reject(err);
        } else {
          resolve(msg);
        }
      });
    });
  }

  updateDataDetail(query, newData) {
    var promise = new Promise((resolve, reject) => {
      this.DataDetailSchema.findOneAndUpdate(query,{$set:{"data" : newData}} , {
        "new" : true
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
