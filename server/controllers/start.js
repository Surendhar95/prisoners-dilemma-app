module.exports = function(app) {

	app.post('/start', function(req, res, next) {

		if (req.body.password !== app.tournament.password) {
			var error = new Error('Incorrect password');
			error.status = 400;
			return next(error);
		}

		try {
			app.tournament.start();
		} catch (error) {
			return next(error);
		}

		res.status(200).end();
	});
};
