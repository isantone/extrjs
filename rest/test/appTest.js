const assert = require('chai').assert;
const app = require('../app');

const chai = require('chai');
const chaiHttp = require('chai-http');
//const server = require('../server');
const should = chai.should();

const users = require('../data/users');
const catalog = require('../data/catalog');
const products = require('../data/products');

const host = 'http://localhost:3000/api';

chai.use(chaiHttp);

describe('App', function() {
  after(() => {
    //process.exit();
  });

  it('it should GET users', (done) => {
    chai.request(host)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(users.length);
        res.body.should.be.eql(users);

        done();
      });
  });

  it('it should GET catalog', (done) => {
    chai.request(host)
      .get('/categories')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(catalog.length);
        res.body.should.be.eql(catalog);

        done();
      });
  });

  it('it should GET catalog', (done) => {
    chai.request(host)
      .get('/categories')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(catalog.length);
        res.body.should.be.eql(catalog);

        done();
      });
  });

  it('it should GET first product', (done) => {
    chai.request(host)
      .get('/products/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.eql(products[0]);

        done();
      });
  });
});