class DataApiModel {

  constructor(DataDetailSchema) {
    this.DataDetailSchema = DataDetailSchema;
  }

  get(dataKey) {
    var query = {
      "dataId": dataKey
    };
    return new Promise((resolve, reject) => {
      this.DataDetailSchema.find(query, (err, datas) => {
        if (err) {
          reject(err);
        } else {
					let result = [],
							datasLength = datas.length || 0;	
					
					for (var i=0;i<datasLength;i++){
						result.push(datas[i].data);
					}
          resolve(result);
        }
      })
    });
  }

}
module.exports = DataApiModel;
