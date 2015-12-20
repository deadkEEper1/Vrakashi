define([
		'text!templates/AccountTemplate.html',
		'../models/UserModel',
		'../collections/Posts',
		'../models/PostModel',
		'text!templates/PostsListTemplate.html',

		],


	function(AccountTemplate, UserModel,Posts, PostModel, PostsListTemplate) {
		var AccountView = Backbone.View.extend({

			el: '#content',

			template: _.template(AccountTemplate),
			myPostsTemplate: _.template(PostsListTemplate),

			events: {
				'click #update': 'update',
				'click #delete': 'delete',
				'click #addPost': 'addPost',
				'click #deletePost': 'deletePost',

				'click #cancelUptading': 'cancelUptading',
				'click #saveChanges'	: 'saveChanges'
			},

			initialize: function(){
				var that = this;
				var newPost = new Posts()
					newPost.fetch({
						async: false,
						url: '/posts/' + this.model._id,

						success: function(res, posts){
							that.posts = posts
						}
					})
				



			},

			findUser : function(id){
				console.log(id)

				var user = new UserModel({_id: id})
					user.fetch()
			},

			render: function(){
				this.$el.html(this.template(this.model))
				if(this.posts.length != 0){
					$('#posts_list').html(this.myPostsTemplate(this.posts))
				}
			},

			update: function(){
				console.log('Uptade profile')
				$('#edit').show()
			},	

			cancelUptading: function(){
				$('#edit').hide()
			},

			saveChanges: function(){

				var newName = $('#newName').val() 
				var newEmail = $('#newEmail').val() 

				var user = new UserModel({_id: this.model._id})
					user.save({
						name: newName,
						email: newEmail
					},
					{
						success:function(res, model){
							alert('Your information was changed and saved')

                		    Backbone.history.fragment = '';
							Backbone.history.navigate('#myaccount', {trigger: true})

						},


						error: function(res, obj){
							alert(obj.responseText)
						}
					})
			},



			delete: function(){
				console.log('Delete profile')
				var id = this.model._id	
				console.log(id)
				var user = new UserModel({_id: id});
					user.destroy({
						success: function(res, obj){
							alert(obj.message)

							Backbone.history.navigate('#', {trigger: true})

						},

						error: function(res, err){
							console.log(res, err)
						}
					})
				
			},	

			addPost: function(){
				console.log('Add post')
				Backbone.history.fragment = '';
				Backbone.history.navigate('#newpost', {trigger: true})

			},

			deletePost: function(){
				console.log('Delete post')
				console.log(this)
			}
		})

		return AccountView

	})