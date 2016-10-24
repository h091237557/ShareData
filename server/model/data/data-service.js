class DataModel {

  constructor(Schema, DataDetailSchema) {
    this.maxSize = 1000;
    this.Schema = Schema;
    this.DataDetailSchema = DataDetailSchema;
  }

  create(input) {
    let data = input.data,
      dataLength = data.length,
      asyncSize = Math.ceil(dataLength / this.maxSize),
      asyncFucs = [];

    var saveDataResult = this.saveData(input, () => {
      console.log("Save Data Success")
    });

    return new Promise((resolve, reject) => {
      saveDataResult.then((data) => {
        let dataId = data._id.toString();
        var asyncDatas = this.splitData(dataId, input, asyncSize),
          asyncDataLength = asyncDatas.length;

        asyncFucs.push(this.bulkSaveDataDetail(asyncDatas));

        Promise.all(asyncFucs).then(msgs => {
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

  //update(id, newData) {
  //var promise = new Promise((resolve, reject) => {
  //this.Schema.findOneAndUpdate(query, newData, {
  //upsert: true
  //}, (err, data) => {
  //if (err) {
  //reject(err);
  //} else {
  //resolve(data);
  //}
  //})
  //})
  //return promise;
  //}
}
module.exports = DataModel;
