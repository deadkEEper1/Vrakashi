define([
	'../models/UserModel'
	],function(UserModel) {
	var Users = Backbone.Model.extend({
		model: UserModel,
		url: '/users'
	})

	return Users
})