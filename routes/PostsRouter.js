var express = require('express')
var usersRouter = express.Router()
var Post = require('../mongoModels/PostMongo')


usersRouter.route('/')
	.get(function(req, res) {
		console.log(req.params)
		console.log(req.body)
		Post.find({})
			.populate('author')
			.exec(function(err, posts){
				if(err){
					res.send()
				}else{
					res.status(200).send(posts)
				}
			})

	})

usersRouter.route('/:author')
	.get(function(req, res){
		var authorId = req.params.author
		Post.find({author: authorId}, function(err, posts){
			if(null != posts){
			res.status(200).send(posts)
		}else{
			res.status(404).end()
		}
		})
	})






module.exports = usersRouter