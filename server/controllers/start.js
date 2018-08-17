module.exports = function(app) {

	app.post('/start', function(req, res, next) {
		const { password } = req.body
		if (! (password && password === app.tournament.master_password) )
			res.status(402).end();
		else
			res.status(200).end();
	});
};
