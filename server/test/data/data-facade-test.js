//import chai from 'chai';
//import { dataFacade } from '../../model/data/data-facade.js';
//import { mockData } from './mock-data.js';
//import { mockDatas } from './mock-datas.js';
debugger;
var chai = require('chai');
var dataFacade = require('../../model/data/data-facade.js');
var mockData = require('./mock-data.js');
var mockDatas = require('./mock-datas.js');

chai.should();

describe('data', function() {
  it('should be invaild if name is empty', function(done) {
    console.log(mockData);
    console.log(mockDatas);
    var f = () => 5;
    let acturl = 1;
    let expect = 1;
    acturl.should.equal(expect);
    done();
  });
});
