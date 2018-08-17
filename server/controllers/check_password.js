module.exports = function(app) {

	app.post('/check-password', function(req, res, next) {
		const { password } = req.body
		if (! (password && password === app.tournament.master_password) )
			res.status(402).json({error: 'Password entered is incorrect'})
		else
			res.status(200).end();
	});
};
