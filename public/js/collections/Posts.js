define([
	'../models/PostModel'
	],function(PostModel) {
	var Posts = Backbone.Model.extend({
		model: PostModel,
		url: '/posts',
		idAttribute: 'author'
	})

	return Posts
})