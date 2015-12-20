define([],function() {
	var PostModel = Backbone.Model.extend({
		urlRoot: '/post',
		idAttribute: '_id'
	})

	return PostModel
})