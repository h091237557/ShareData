debugger;
var mongoose = require('mongoose');
var config = require('../test-config');
var chai = require('chai');
var expect = chai.expect;

var app = require('../../../index');
var request = require('supertest')(app);



describe('Integration: data-controller.js -- Create Data ', () => {
  before(() => {
    config.connect((err) => {
      if (err) {
        console.log(err.message);
      }
    });
  });

  after(() => {
    config.close((msg) => {
      console.log(msg);
    });
  });


  it('should create success and return status 200', (done) => {
    let input = {
      data: [{
        "id": "1",
        "author": "mark"
      }],
      describe: "Test"
    };

    request
      .post('/datas')
      .send(input)
      .expect(200)
      .end((err, res) => {
        done();
      })
  });
});
