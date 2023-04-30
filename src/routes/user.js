const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// get index page
router.get('/', (request, response) => {
	response.render("index");
});

// post data
router.post("/", userController.postUser);

// show message
router.get("/confirm", (req, res) => {
	res.render("confirm", {
		message: req.query.message,
		message_type: req.query.message_type,
	});
});

module.exports = router;