const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require("./src/routes/user");
const mail = require('./src/services/mail');

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// set route
app.use('/', userRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  mail.start();
});
