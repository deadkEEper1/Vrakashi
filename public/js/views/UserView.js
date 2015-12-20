define([
	'text!templates/UserTemplate.html',
	'../models/SessionCheck',
	'../models/UserModel',
	'../collections/Posts',
	'text!templates/PostsListTemplate.html',
	],
	function(UserTemplate, SessionCheck, UserModel, Posts, PostsListTemplate) {

		var UserView = Backbone.View.extend({
			el: '#content',

			events:{
				'click #deleteThisUser' : 'deleteThisUser'
			},	

			template: _.template(UserTemplate),
			PostsTemplate: _.template(PostsListTemplate),

			initialize: function(){
				var that = this;
				console.log('UserView inited')
				var session = new SessionCheck()
					session.fetch({
						success: function(res, model){
							if(model.admin){
								$('.adminBtn').show()
							}
						}
					})



				var newPost = new Posts()
					newPost.fetch({
						async: false,
						url: '/posts/' + this.model._id,

						success: function(res, posts){
							that.posts = posts
						}
					})

					console.log(this.posts)
								
			},

			render: function(){
				this.$el.html(this.template(this.model))
				if(this.posts.length != 0){
					$('#posts_list').html(this.PostsTemplate(this.posts))
				}
			},


			deleteThisUser: function(){
				console.log(this.model)
				var user = new UserModel({_id: this.model._id})
					user.destroy({
						success: function(){
							alert('You just deleted this user')
							Backbone.history.fragment = ''
							Backbone.history.navigate('#users', {trigger:true})							
						}
					})
			}
		})

		return UserView
	})