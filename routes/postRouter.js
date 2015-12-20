var express = require('express')
var postRouter = express.Router()
var User = require('../mongoModels/UserMongo')
var Post = require('../mongoModels/PostMongo')


postRouter.route('/')
	.get(function(req, res) {
		console.log('Post Route get')		
		res.end()
	})

	.post(function(req, res){
		console.log('Post Route post')
		console.log(req.body)

		var newPost = new Post(req.body)
			newPost.save()

 

	})


postRouter.route('/:id')
	.get(function(req, res){
		var id = req.params.id;
		Post.findById(id)
			.populate('author')
			.exec(function(err, post){
				if(!err || post != null){
					res.status(200).send(post)
				}
			})
	})

	.delete(function(req, res){
		var id = req.params.id;
		Post.findByIdAndRemove(id, function(err, post){
			if(err){
				console.log(err)
			}else{
				console.log('Post deleted succesfully.')
				res.status(200).send(post)
			}
		})
	})




module.exports = postRouter