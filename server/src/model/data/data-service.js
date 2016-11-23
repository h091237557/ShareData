var sizeOf = require('../../lib/lib-sizeCal');
var validator = require('../../lib/lib-validator');
const config = require('../../../config');

class DataModel {

  constructor(Schema, DataDetailSchema) {
    this.Schema = Schema;
    this.DataDetailSchema = DataDetailSchema;
  }

  /*
   * input.data :
   * => Is user want create restful api data
   *
   * input.describe :
   * => Is user want create data's describe
   */
  create(input) {
    let asyncFucs = [];

    var saveDataResult = this.saveData(input)

    return new Promise((resolve, reject) => {
      saveDataResult.then((data) => {
        console.time("!!!Create Data timer");

        let dataId = data._id.toString();
        var asyncDatas = this.splitData(dataId, input),
          asyncDataLength = asyncDatas.length;

        asyncFucs.push(this.bulkSaveDataDetail(asyncDatas));

        Promise.all(asyncFucs).then(datadetails => {
          console.timeEnd("!!!Create Data timer");
          resolve(data);
        });

      }).catch((err) => {
        reject(err);
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

	/**
 * input.describe
 * input.author
 * input.data
 */
  saveData(input) {

    validator.config = {
      describe: 'isNonEmpty',
      author: 'isNonEmpty',
      data: 'isArrayAndHaveData'
    }

    var validResult = validator.validate(input);
    if (!validResult) {
      return Promise.reject({
        "status": false,
        "msg": "valid error"
      });
    }

    let inputData = {
      describe: input.describe,
      author: input.author,
      count: input.data.length,
      size: sizeOf(input.data)
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

  find(query, limitCount) {
    let count = limitCount || 10000;
    return new Promise((resolve, reject) => {
      this.Schema.find(query, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }).limit(count);
    });
  }

  remove(id) {

    if (!id) {
      return Promise({
        status: false,
        msg: "valid error"
      })
    }

    var promise = new Promise((resolve, reject) => {
      console.time("!!!Remove Data timer");
      var removeDataPromise = this.removeDataByDataId(id);
      var removeDataDetailPromise = this.removeDataDetailsByDataId(id);
      Promise.all([removeDataPromise, removeDataDetailPromise]).then(data => {
        console.timeEnd("!!!Remove Data timer");
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

	if(!id){
		return Promise.reject({
			status:false,
			msg:"valid error"
		})
	}

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
    return new Promise((resolve, reject) => {
      this.DataDetailSchema.findOneAndUpdate(query, {
        $set: {
          "data": newData
        }
      }, {
        "new": true
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }

  /*取得所有Datas Schema中所有的資料
 * 建立者
 * 資料描述
 * 大小
 * 數量
 * 修改日期
 */
  getAllData(limitCount) {
    let count = limitCount || 10;
    return new Promise((resolve, reject) => {
      let findPromise = this.find({}, count);
      findPromise.then((datas) => {
        resolve(datas);
      }).catch((err) => {
        reject(err);
      });
    });
  };


	/*
 * 取得View Details 所需要的資料
 * 建立者
 * 建立日期
 * 修改日期
 * 資料描述
 * 大小
 * 數量
 * Url
 */
	getDataById(id){
		return new Promise((resolve,reject) => {
			let findPromise = this.find({_id:id});
			findPromise.then((data) => {
				if(data){
					var data = data[0]._doc;
					var keyId = data._id.toString();
					var url = config.server.domain +':' + config.server.port + '/api/' + data.author + '/' + keyId +'-datas'
					resolve({
 						"author":data.author,
						"createDate" : data.date,
						"updateDate" : data.date,
						"count" : data.count,
						"size" :  sizeOf(data.size),
						"describe" : data.describe,
						"url" : url 
					})
				}else {
					reject(null);
				}
			}).catch((err) =>{
				reject({"status" : false,"msg" : err});
			});
		});
	}
}
module.exports = DataModel;
