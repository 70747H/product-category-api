const request = require('supertest');
const mocha = require('mocha');
const app = require('../app');

const { describe } = mocha;
const { it } = mocha;

describe('Attempt Login', () => {
  it('login successful', done => {
    request(app)
      .post('/authentication/administrator/login')
      .send('email=administrator@justclean.com')
      .send('password=123456')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('login wrong password', done => {
    request(app)
      .post('/authentication/administrator/login')
      .send('email=administrator@justclean.com')
      .send('password=123458')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('login wrong email', done => {
    request(app)
      .post('/authentication/administrator/login')
      .send('email=administrator@justclean.com')
      .send('password=123458')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });
});
