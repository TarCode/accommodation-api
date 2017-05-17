//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../dist/index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Rooms', () => {
/*
  * Test the /GET route
  */
  describe('/GET rooms', () => {
      it('it should GET all the rooms', (done) => {
        chai.request(app)
            .get('/rooms')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
