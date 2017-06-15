# ShareData

This project could shared data to everyone , you can send data and this project could create restful api . Not only to get Data from uri , but also you can change data by restful api . 

* Backend : `node` + `express` + `mongodb` + `docker`。
* BackendTest : `mocha` + `sinon`。
* Frontend : `Angular2` + `typescript` + `webpack` + `scss` 。
* CssStucture : `BEM`。
* FrontendTest : `karma`。

![alt tag](https://github.com/h091237557/ShareData/blob/master/img/img1.png)

## Create Data and Share Data

Now , we shared data to this project.

![alt tag](https://github.com/h091237557/ShareData/blob/master/img/img6.png)

and then , we can view that you have shared data.

![alt tag](https://github.com/h091237557/ShareData/blob/master/img/img5.png)

and you can use this uri . to get you shared all data.

```
http://127.0.0.1:3000/api/mark/58a57f22dbfda0001e1281df-datas
```

all data.

```
[
    {
        "交易日期": "106.02.16",
        "作物代號": "11",
        "作物名稱": "椰子",
        "市場代號": "104",
        "市場名稱": "台北二",
        "上價": "14.5",
        "中價": "11.8",
        "下價": "9.4",
        "平均價": "11.9",
        "交易量": "1240",
        "_id_": 1
    },
    {
        "交易日期": "106.02.16",
        "作物代號": "22",
        "作物名稱": "棗子",
        "市場代號": "104",
        "市場名稱": "台北二",
        "上價": "126.6",
        "中價": "81.3",
        "下價": "52.5",
        "平均價": "84.6",
        "交易量": "6647",
        "_id_": 2
    },
    {
        "交易日期": "106.02.16",
        "作物代號": "31",
        "作物名稱": "釋迦",
        "市場代號": "104",
        "市場名稱": "台北二",
        "上價": "231.4",
        "中價": "180.2",
        "下價": "113.5",
        "平均價": "177.1",
        "交易量": "257",
        "_id_": 3
    }
]
```

Particular ~ you can use below uri to get data by `_id_` , `_id_` is default key, you can select key youself when create data.

```
http://127.0.0.1:3000/api/mark/58a57f22dbfda0001e1281df-datas/1
```

you got data.

```
    {
        "交易日期": "106.02.16",
        "作物代號": "11",
        "作物名稱": "椰子",
        "市場代號": "104",
        "市場名稱": "台北二",
        "上價": "14.5",
        "中價": "11.8",
        "下價": "9.4",
        "平均價": "11.9",
        "交易量": "1240",
        "_id_": 1
    }
```
