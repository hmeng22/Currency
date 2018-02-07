process.env.IS_TESTING = true;
var server = require('../app');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;

var token = null;

before((done) => {
  var test_user = {
    'username': 'test_user' + Date.now(),
    'email': Date.now() + '@test.test',
    'password': 'test_user_password'
  }

  chai.request(server).post('/signup').send(test_user).end((err, res) => {
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('Object');
    expect(res.body).to.have.property('success', true);

    chai.request(server).post('/signin').send(test_user).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      expect(res.body).to.have.property('success', true);
      expect(res.body).to.have.property('token');

      token = res.body.token;

      done();
    });
  });
});

describe('services Spec', () => {
  describe('# Configuration', () => {
    it('POST /v1/configuration', (done) => {
      done();
    });
    it('GET /v1/configuration', (done) => {
      done();
    });
  });

  describe('# SyncSubscribedRates', () => {
    it('POST /v1/syncsubscribedrates', (done) => {
      var ics = [
        {
          'date': Date.now(),
          'institution_swift': 'PBOCCNBJ',
          'currency_code': 'CNY'
        }, {
          'date': Date.now(),
          'institution_swift': 'PBOCCNBJ',
          'currency_code': 'USD'
        }
      ];

      chai.request(server).post('/v1/syncsubscribedrates').set('token', token.access_token).send({'ics': ics}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('iscs');

        done();
      });
    });
  });

  describe('# IsCsRates', () => {
    it('GET /v1/iscsrates', (done) => {
      var iscs = [
        {
          'institution_swift': 'PBOCCNBJ',
          'currency_code': 'CNY'
        }, {
          'institution_swift': 'PBOCCNBJ',
          'currency_code': 'USD'
        }
      ];

      chai.request(server).get('/v1/iscsrates').set('token', token.access_token).send({'iscs': iscs}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('iscsrates');

        done();
      });
    });
  });

  describe('# RateHistory', () => {
    it('GET /v1/ratehistory', (done) => {
      var ictdd = {
        'institution_swift': 'PBOCCNBJ',
        'currency_code': 'CNY',
        'type': '',
        'fromdate': Date.now(),
        'todate': Date.now()
      };

      chai.request(server).get('/v1/ratehistory').set('token', token.access_token).send({'ictdd': ictdd}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('ratehistory');

        done();
      });
    });
  });

});
