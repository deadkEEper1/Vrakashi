var express = require('express')
var usersRouter = express.Router()
var User = require('../mongoModels/UserMongo')


usersRouter.route('/')
	.get(function(req, res) {

		User.find({}, function(err, users){
			res.send(users)
		})
	})





module.exports = usersRouter