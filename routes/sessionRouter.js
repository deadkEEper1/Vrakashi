var express = require('express')
var sessionRouter = express.Router()
var User = require('../mongoModels/UserMongo')
var crypto = require('crypto')



sessionRouter.route('/')

	.get(function(req, res){
		// console.log(req.session._id)
		var id = req.session._id
		User.findById(id, function(err, user){
			if(null !== user){
				res.status(200).send(user)
			}else{
				res.status(401).send()			
			}
		})
	})

	.post(function(req, res){
		var password = req.body.pass
		var shaSum = crypto.createHash('sha256');
			shaSum.update(password);
			password = shaSum.digest('hex')

		User.findOne({email: req.body.email, password: password}, function(err, user){
			if(user == null){
				res.status(400).send('Invalid email or password')
			}else{

				 req.session._id = user._id
				 res.status(200).send(user)
			}
		})
	})

	.delete(function(req, res){
		req.session.destroy(function(){
			res.sendStatus(401)
		})
	})



module.exports = sessionRouter