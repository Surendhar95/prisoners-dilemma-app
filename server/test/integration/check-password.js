var _ = require('underscore');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var manager = require('../manager');
var app = manager.app;

var verb = 'post';
var uri = '/check-password';

chai.use(chaiHttp);

describe([verb.toUpperCase(), uri].join(' '), function() {

	before(manager.onServerReady);
	before(function() {
		app.tournament.password = 'check-password-test';
	});

	it('missing password', function(done) {

		chai.request(manager.app)[verb](uri).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(400);
			done();
		});
	});

	it('incorrect password', function(done) {

		var postData = {
			password: 'incorrect',
		};

		chai.request(manager.app)[verb](uri).type('json').send(postData).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(400);
			done();
		});
	});

	it('correct password', function(done) {

		var postData = {
			password: app.tournament.password,
		};

		chai.request(manager.app)[verb](uri).type('json').send(postData).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(200);
			done();
		});
	});
});
