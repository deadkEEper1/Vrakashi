var express = require ('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');
var cookie_parser = require('cookie-parser');
var morgan = require('morgan');

var crypto = require('crypto');

var session = require('express-session');
var routes = require('./routes');
var app = express();


mongoose.connect('localhost:/hope');
var db = mongoose.connection;
db.on('open', function() {
	console.log('Hope date base opened')});


app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(body_parser({urlencoded : true}));
app.use(cookie_parser());
app.use(session(
	{secret: 'ssshhhhh',
	saveUnitialized: true}
	)

);

app.use(routes);

app.listen(3030, function() {
	console.log('Server started on 3030')
});