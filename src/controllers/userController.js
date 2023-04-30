const user = require('../models/user');
const { pendingUsers } = require('../globalVariables')

/**
 * Controller to handle posting user data
 * @param {*} req request
 * @param {*} res response
 */
exports.postUser = async (req, res) => {
	const username = req.body.username;
	const wish = req.body.wish;

	// check user
	result = await user.checkUser(username, wish);

	if (result.user) {
		// add to list to wait for sending email
		pendingUsers.push(result.user);
	}

	res.redirect(
		"/confirm?" + new URLSearchParams(
			{
				message: result.message,
				message_type: result.user ? "success" : "error",
			}));
}