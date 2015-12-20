define([
		'text!templates/PostTemplate.html',
		'../models/SessionCheck',
		'../models/PostModel'
		],


	function(PostTemplate, SessionCheck, PostModel) {

		var PostView = Backbone.View.extend({

			el: '#content',

			template: _.template(PostTemplate),

			events: {

				'click #deletePost' : 'deletePost',
				'click #deleteMyPost': 'deleteMyPost'
			},

			initialize: function(){
				var self = this;
				console.log('PostTemplate inited');

				var session = new SessionCheck()
					session.fetch({

						success: function(res, user){
							if(user.admin){
								$('.adminBtn').show()
							}

							if(null != self.model.author && self.model.author._id == user._id){
								$('#deleteMyPost').show()
							}
						}
					})
			},


			render: function(){
				this.$el.html(this.template(this.model))

			},

			deletePost : function(){
				console.log('Delete this post')
				var id = this.model._id
				var post = new PostModel({_id: id})
					post.destroy({
						success: function(){
							alert('Post wass deleted successfully')

							Backbone.history.fragment = '';
							Backbone.history.navigate('#posts', {trigger: true})
						},

						error: function(){
							alert('Something is wrong')
						}
					})

			},


			deleteMyPost : function(){
				console.log('Delete My post')

				var id = this.model._id
				var post = new PostModel({_id: id})
					post.destroy({
						success: function(){
							alert('Post wass deleted successfully')

							Backbone.history.fragment = '';
							Backbone.history.navigate('#posts', {trigger: true})
						},

						error: function(){
							alert('Something is wrong')
						}
					})

			}


		})

		return PostView

	})