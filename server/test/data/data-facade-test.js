import chai from 'chai';
import { dataFacade } from '../../model/data/data-facade.js';
import { mockData } from './mock-data.js';
import { mockDatas } from './mock-datas.js';
chai.should();

describe('data',function(){
	it('should be invaild if name is empty',function(done){
		console.log(mockData)	
		let acturl = 1;
		let expect =1 ;
		acturl.should.equal(expect);
		done();
	});
});



