var _ = require('underscore');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var manager = require('../manager');
var app = manager.app;

var verb = 'post';
var uri = '/start';

chai.use(chaiHttp);

describe([verb.toUpperCase(), uri].join(' '), function() {

	before(manager.onServerReady);
	before(function() {
		app.tournament.password = 'start-test';
	});
	beforeEach(function() {
		app.tournament.started = false;
	});

	it('missing password', function(done) {

		chai.request(manager.app)[verb](uri).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(400);
			expect(app.tournament.started).to.equal(false);
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
			expect(app.tournament.started).to.equal(false);
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
			expect(app.tournament.started).to.equal(true);
			done();
		});
	});
});
