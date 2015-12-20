var express = require('express')
var userRouter = express.Router()
var User = require('../mongoModels/UserMongo')
var crypto = require('crypto')


userRouter.route('/')
	.post(function(req, res) {

		var password = req.body.password
		var shaSum = crypto.createHash('sha256');
			shaSum.update(password);
			password = shaSum.digest('hex')

			console.log(password)

		var data = {
				name: req.body.name,
				email: req.body.email,
				password: password
		}
		var newUser = new User(data)

			newUser.save(function(err, user){
				if(err){
					console.log(err)
					res.status(400).send(err)					
				}else{
					req.session._id = user._id
					console.log('session0 ', req.session.user)
					res.status(200).send(user)
				}


			})
	})


userRouter.route('/:id')

	.get(function(req, res){
		var id = req.params.id

		User.findById(id, function(err, user){
			if(user == null){
				res.status(404).send( 'No such user')
			}
			else{
				res.status(200).send(user)
			}
		
		})
	})



	.put(function(req, res){

		var id = req.params.id
		console.log(req.body)
		console.log('Put request for user with id ' + id)

		User.update({_id: id}, req.body, function(err, user){
			if(err){
				console.log(err)
				res.status(403).send('User with such email is already exist')
			}else{
				res.status(200).send(user)

			}

		})
		


	})

	.delete(function(req, res){
		console.log('Delete request from users with id: '+ req.params.id)

		var id = req.params.id
		
		User.findByIdAndRemove(id, function(err, user){
			if(err){
				console.log(err)
				res.send(err)
			}

			res.status(200).send({message: "User was deleted successfully"})

		})
	
	})


module.exports = userRouter