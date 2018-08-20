var _ = require('underscore');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var manager = require('../manager');
var app = manager.app;

var verb = 'get';
var uri = '/participants';

chai.use(chaiHttp);

describe([verb.toUpperCase(), uri].join(' '), function() {

	before(manager.onServerReady);
	afterEach(function() {
		app.tournament.participants = [];
	});

	it('no participants', function(done) {

		chai.request(manager.app)[verb](uri).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(200);
			expect(response.body).to.be.an('array');
			expect(response.body).to.have.length(0)
			done();
		});
	});

	it('with some participants', function(done) {

		app.tournament.addParticipant({ alias: 'test-testerson' });
		app.tournament.addParticipant({ alias: 'test-testerson2' });
		chai.request(manager.app)[verb](uri).end(function(error, response) {
			expect(error).to.be.null;
			expect(response).to.have.status(200);
			expect(response.body).to.be.an('array');
			expect(response.body).to.have.length(2)
			done();
		});
	});
});
