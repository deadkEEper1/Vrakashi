define([],function() {
	var UserModel = Backbone.Model.extend({
		urlRoot: '/user',
		idAttribute: '_id'
	})

	return UserModel
})