module.exports = function(app) {

	app.post('/check-password', function(req, res, next) {

		if (req.body.password !== app.tournament.password) {
			var error = new Error('Incorrect password');
			error.status = 400;
			return next(error);
		}

		res.status(200).end();
	});
};
