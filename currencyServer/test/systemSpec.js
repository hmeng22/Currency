process.env.IS_TESTING = true;
var server = require('../app');

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var expect = chai.expect;

var fakeRatesData = require('../utils/fakeData').fakeRatesData;
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

describe('system Spec', () => {

  describe('# RatesData', () => {

    it('POST /v1/ratesdata', (done) => {

      var rd = fakeRatesData();

      chai.request(server).post('/v1/ratesdata').set('token', token.access_token).send(rd).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });
  });

  describe('# Currency', () => {
    var currencies = [
      {
        "name": "Test",
        "code": "TEST",
        "codenumber": "0000"
      }
    ];
    var codes = ["TEST"];

    it('POST /v1/currencies', (done) => {
      chai.request(server).post('/v1/currencies').set('token', token.access_token).send({'currencies': currencies}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('DELETE /v1/currencies', (done) => {
      chai.request(server).delete('/v1/currencies').set('token', token.access_token).send({'codes': codes}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('GET /v1/currencies', (done) => {
      chai.request(server).get('/v1/currencies').set('token', token.access_token).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('currencies');

        done();
      });
    });
  });

  describe('# Institution', () => {
    var institutions = [
      {
        "country": "TEST",
        "name": "TEST",
        "alias": "TEST",
        "swift": "TEST",
        "basecurrencycodes": ["TEST"],
        "foreigncurrenycodes": ["TEST"],
        "ratehistory": null
      }
    ];
    var institution_swifts = ["TEST"];

    it('POST /v1/institutions', (done) => {
      chai.request(server).post('/v1/institutions').set('token', token.access_token).send({'institutions': institutions}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('DELETE /v1/institutions', (done) => {
      chai.request(server).delete('/v1/institutions').set('token', token.access_token).send({'institution_swifts': institution_swifts}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('GET /v1/institutions', (done) => {
      chai.request(server).get('/v1/institutions').set('token', token.access_token).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('institutions');

        done();
      });
    });
  });

  describe('# RateSheet', () => {
    var institution_swift = "PBOCCNBJ";
    var ratesheets = [
      {
        "institutionSWIFT": "PBOCCNBJ",
        "date": "2017-06-09",
        "rates": []
      }
    ];

    it('POST /v1/ratesheets', (done) => {
      chai.request(server).post('/v1/ratesheets').set('token', token.access_token).send({'ratesheets': ratesheets, 'institution_swift': institution_swift}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('DELETE /v1/ratesheets', (done) => {
      chai.request(server).delete('/v1/ratesheets').set('token', token.access_token).send({'institution_swift': institution_swift, 'rate_date': '2017-06-09'}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('GET /v1/ratesheets', (done) => {
      chai.request(server).get('/v1/ratesheets').set('token', token.access_token).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('ratesheets');

        console.log(res.body.ratesheets);

        done();
      });
    });
  });

  describe('#Rate ', () => {
    var rates = [
      {
        "institutionSWIFT": "PBOCCNBJ",
        "base": "CNY",
        "target": "USD",
        "buy": 1.0,
        "sell": 2.0,
        "cashbuy": 3.0,
        "cashsell": 4.0,
        "centralparityrate": 5.0,
        "date": "2017-06-09",
        "time": "12:12:12"
      }
    ];
    var institution_swift = "PBOCCNBJ";
    var rate_date = "2017-06-09";
    var rate_time = "12:12:12";

    it('POST /v1/rates', (done) => {
      chai.request(server).post('/v1/rates').set('token', token.access_token).send({'rates': rates, 'institution_swift': institution_swift, 'rate_date': rate_date}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('DELETE /v1/rates', (done) => {
      chai.request(server).delete('/v1/rates').set('token', token.access_token).send({'institution_swift': institution_swift, 'rate_date': rate_date, 'rate_time': rate_time}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);

        done();
      });
    });

    it('GET /v1/rates', (done) => {
      chai.request(server).get('/v1/rates').set('token', token.access_token).send({'institution_swift': institution_swift, 'rate_date': rate_date}).end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('Object');
        expect(res.body).to.have.property('success', true);
        expect(res.body).to.have.property('rates');

        done();
      });
    });
  });

});
