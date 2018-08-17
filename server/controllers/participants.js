module.exports = function(app) {

	app.get('/participants', function(req, res, next) {

		res.status(200).json({
			participants: app.tournament.participants
		}).end();``
	});
};
